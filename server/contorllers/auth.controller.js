const AuthService = require("../services/auth.service");
const {
    RegistrationDTO,
    VerifyEmailDTO,
    LoginDTO,
    ForgetPasswordDTO,
    VerifyOTPDTO,
    UpdatePasswordDTO
} = require("../dtos/auth.dto");


const AuthController = {

    // registation
    registaion: async (req, res) => {
        try {
            const {
                username,
                email,
                password
            } = req.body

            const registrationData = RegistrationDTO(username, email, password);

            const result = await AuthService.registation(
                registrationData.username,
                registrationData.email,
                registrationData.password,
                req
            );
            res.status(200).json(result)
        }
        catch (err) {
            res.json({ success: false, error: err.message })
        }
    },

    // verify email
    verifyEmail: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }
            const { otp } = req.body

            const verifydata = VerifyEmailDTO(token, otp)

            const result = await AuthService.verifyEmail(
                token,
                verifydata.otp,
                req
            )
            res.status(200).json(result)
        }
        catch (err) {
            res.json({ success: false, error: err.message })
        }
    },

    // login
    login: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body

            const logindata = LoginDTO(email, password)

            const result = await AuthService.login(
                logindata.email,
                logindata.password,
                req
            )
            res.status(200).json(result)
        }
        catch (err) {
            res.json({ success: false, error: err.message })
        }
    },

    // logout
    logout: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Access denied. No token provided.",
                });
            }

            const result = await AuthService.logout(req, token);
            return res.status(200).json(result);
        } catch (err) {
            res.json({ success: false, error: err.message })
        }
    },

    // forget password
    forgetPassword: async (req, res) => {
        try {
            const { email } = req.body

            const forgetpass = ForgetPasswordDTO(email)

            const result = await AuthService.ForgetPassword(
                forgetpass.email,
                req
            )
            res.status(200).json(result)
        }
        catch (err) {
            res.json({ success: false, error: err.message })
        }
    },

    // verify otp
    verifyotp: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const { otp } = req.body

            const otpcheckdto = VerifyOTPDTO(token, otp)

            const result = await AuthService.CheckandVerifyOTP(
                otpcheckdto.token,
                otpcheckdto.otp,
                req
            )
            res.status(200).json(result)
        }
        catch (err) {
            res.json({ success: false, error: err.message })
        }
    },

    // update password
    updatePassword: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const { newpassword } = req.body

            const passwordDto = UpdatePasswordDTO(token, newpassword)


            const result = await AuthService.UpdatePassword(
                passwordDto.token,
                passwordDto.newpassword,
                req
            )
            res.status(200).json(result)

        }
        catch (err) {
            res.json({ success: false, error: err.message })
        }
    }
};

module.exports = AuthController;