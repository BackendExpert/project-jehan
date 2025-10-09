const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const Role = require('../models/role.model')
const logUserAction = require('../utils/others/logUserAction')
const sendEmail = require('../utils/email/emailTransporter')
const tokenCreator = require('../utils/tokens/generateToken')

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
            subject: "Verify Your Email - Student Note Management System",
            html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f9fafb; padding: 30px;">
                        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.1);">

                            <!-- Header -->
                            <div style="background: linear-gradient(90deg, #1e3c72, #2a5298); padding: 20px; text-align: center;">
                                <h1 style="color: #fff; margin: 0; font-size: 24px;">Student Note Management System</h1>
                            </div>

                            <!-- Body -->
                            <div style="padding: 30px; color: #333;">
                                <h2 style="margin-bottom: 10px; font-size: 22px; color: #2c3e50;">Hello ${username},</h2>
                                <p style="font-size: 16px; margin-bottom: 20px;">
                                    Thank you for registering with the <strong>Student Note Management System</strong>. 
                                    To complete your registration, please use the one-time verification code below:
                                </p>

                                <!-- OTP Box -->
                                <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #1e3c72; background: #f0f4ff; padding: 15px; text-align: center; border-radius: 8px; margin: 25px 0;">
                                    ${otp}
                                </div>

                                <p style="font-size: 15px; color: #555; margin-bottom: 20px;">
                                    This code is valid for <strong>10 minutes</strong>. For security reasons, please do not share this code with anyone.
                                </p>

                                <p style="font-size: 15px; color: #555;">
                                    If you didn’t request this, you can safely ignore this email.
                                </p>
                            </div>

                            <!-- Footer -->
                            <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 13px; color: #888;">
                                <p style="margin: 5px 0;">© ${new Date().getFullYear()} Student Note Management System. All rights reserved.</p>
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

        return {
            success: true,
            token,
            message: "Registration successful. Verification email sent.",
        };
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
            return { success: true, message: "Account Verification Successful" };
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

        return {
            success: true,
            token,
            message: "Login Success",
        };
    }
}

module.exports = AuthService