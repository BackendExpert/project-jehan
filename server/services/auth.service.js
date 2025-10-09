const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const User = require('../models/user.model')
const Role = require('../models/role.model')
const UserOTP = require('../models/userotp.mode')

const logUserAction = require('../utils/others/logUserAction')
const sendEmail = require('../utils/email/emailTransporter')
const tokenCreator = require('../utils/tokens/generateToken')

const {
    RegistrationResponseDTO,
    VerifyEmailResponseDTO,
    LoginResponseDTO,
    LogoutResponseDTO
} = require('../dtos/auth.dto')

const PASSWORD_SULT = 10

class AuthService {

    // --------------------------------- Registation ------------------------------------------

    static async registation(username, email, password, req) {
        // check user is already in db
        const checkuser = await User.find({ email: email })

        if (checkuser) {
            throw new Error("User Already in the System")
        }

        // hash password 
        const hashPass = await bcrypt.hash(password, PASSWORD_SULT)

        // get student role from role model

        const getstdrole = await Role.findOne({ name: 'student' })

        // store user in db

        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            role: getstdrole._id,
        })

        const resultcreateuser = await newUser.save()

        // store user action in database

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "register", `${email} registered`, metadata, checkuser._id);
        }

        // create OTP for verify email Address

        const checkotp = await UserOTP.findOne({ email });
        if (checkotp) {
            throw new Error("User already requested OTP, please wait and try again later");
        }
        function generateOTP(length = 8) {
            return crypto
                .randomBytes(length)
                .toString("base64")
                .replace(/[^a-zA-Z0-9]/g, "")
                .slice(0, length);
        }

        const otp = generateOTP();

        // send email with opt to current registation user

        await sendEmail({
            to: email,
            subject: "Welcome to Student Note Management System 🎓 | Verify Your Email",
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 25px; text-align: center;">
                            <h1 style="color: #fff; margin: 0; font-size: 26px; font-weight: 700;">Welcome to Student Note Management System</h1>
                        </div>

                        <!-- Body -->
                        <div style="padding: 35px; color: #333;">
                            <h2 style="font-size: 22px; margin-bottom: 10px; color: #1e3a8a;">Hello ${username},</h2>

                            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #374151;">
                                We’re excited to have you on board! 🎉<br/>
                                You’ve successfully registered for the <strong>Student Note Management System</strong> — a smart way to manage your academic notes and materials.
                            </p>

                            <p style="font-size: 16px; color: #374151;">
                                Before you get started, please verify your email using the One-Time Passcode (OTP) below:
                            </p>

                            <!-- OTP Box -->
                            <div style="font-size: 30px; font-weight: 700; letter-spacing: 5px; color: #1d4ed8; background: #eff6ff; padding: 18px; text-align: center; border-radius: 10px; margin: 30px 0;">
                                ${otp}
                            </div>

                            <p style="font-size: 15px; color: #6b7280;">
                                ⏳ This code is valid for <strong>10 minutes</strong>. Please don’t share it with anyone — we care about your security.
                            </p>

                            <p style="font-size: 15px; color: #6b7280;">
                                If you didn’t register for this account, simply ignore this message.
                            </p>

                            <!-- Divider -->
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"/>

                            <!-- Call to Action -->
                            <div style="text-align: center;">
                                <a href="#" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #1e40af); color: #fff; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                                    Verify My Email
                                </a>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 13px; color: #9ca3af;">
                            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Student Note Management System</p>
                            <p style="margin: 0;">University of Peradeniya | All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            `,
        });



        // hash otp and store in db 

        const hashotp = await bcrypt.hash(otp, 10);
        const createotprecode = new UserOTP({
            email,
            otp: hashotp,
            createdAt: new Date(),
        });

        const resultcreateotp = await createotprecode.save();

        if (!resultcreateotp) {
            throw new Error("Error saving OTP");
        }

        // genarate token for login user to verfiy otp and token expire after 15min

        const token = tokenCreator({ email, otp }, "15m");

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "login_success", `${checkuser.email} Login Success`, metadata, checkuser._id);
        }

        return RegistrationResponseDTO(token)

    }

    // -------------------------------------- Email Verifitcaiton -------------------------------------------

    static async verifyEmail(token, otpInput, req) {
        // get token and decoded user 
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new Error("Token expired. Please request a new one.");
            }
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const checkotprecode = await UserOTP.findOne({ email: decoded.email });
        if (!checkotprecode) throw new Error("OTP Record Not found");

        // check otp and if not correct reocde as wrong otp enterd

        const otpcheck = await bcrypt.compare(otpInput, checkotprecode.otp);
        if (!otpcheck) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "Wrong_otp", `${user.email} Adding Wrong OTP when verifing Account`, metadata, user._id);

            throw new Error("OTP does not match");
        }

        // if otp is correct then verify email and reocode 

        const updateuser = await User.findOneAndUpdate(
            { email: decoded.email },
            { $set: { isEmailVerified: true } },
            { new: true }
        );

        if (updateuser) {
            await UserOTP.findOneAndDelete({ email: decoded.email });
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(req, "account_verify", `${decoded.email} Accout Verified`, metadata, user._id);
            }
            return VerifyEmailResponseDTO()
        } else {
            throw new Error("Internal Server Error");
        }
    }

    // -------------------------------- LOGIN Service ------------------------------------------------

    static async login(email, password, req) {
        // check user is already in db if not send error

        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error("User does not exist by given Email Address")
        }

        // check password via bcrypt to user entered password is correct or not

        const checkpass = await bcrypt.compare(password, user.password)

        // if not correct then recode as not correct password

        if (!checkpass) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "wrong_password", `${user.email} login failed`, metadata, user._id);
            throw new Error("Given Password is not Match,.. check the Password")
        }

        // check user email is verified 

        if (user.isEmailVerified === false) {
            throw new Error("Your email is not Verify...")
        }

        // check user is active

        if (user.isActive === false) {
            throw new Error("Your Account is not Active...")
        }

        // get role id for send via token

        const getuserrole = await Role.findById(user.role)

        // genarete login token 

        const token = tokenCreator(
            {
                id: user._id,
                email: user.email,
                username: user.username,
                role: getuserrole.name
            },
            '1d'
        );

        // reocde as user login

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(req, "login_success", `${user.email} Login Success`, metadata, user._id);
        }

        return LoginResponseDTO(token, user)
    }

    // ------------------------------- LOGOUT --------------------------------

    static async logout(req, userId) {
        // get token and decoded user 
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new Error("Token expired. Please request a new one.");
            }
            throw new Error("Invalid token.");
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) throw new Error("User not found");

        const checkotprecode = await UserOTP.findOne({ email: decoded.email });
        if (!checkotprecode) throw new Error("OTP Record Not found");


        const metadata = {
            ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            userAgent: req.headers['user-agent'],
            timestamp: new Date(),
        };

        await logUserAction(req, "logout", `User ${user.email} logged out`, metadata, userId);

        return LogoutResponseDTO()
    }
}

module.exports = AuthService