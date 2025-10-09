const AuthService = require("../services/auth.service");

const AuthController = {
    login: async (req, res) => {
        try {
            const {
                username,
                email,
                password
            } = req.body
            const result = await AuthService.registation(username, email, password, req)
            res.status(200).json(result)
        }
        catch (err) {
            res.json({ success: false, error: err.message })
        }
    },

    verifyEmail: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }
            const { otp } = req.body

            const reuslt = await AuthService.verifyEmail(token, otp, req)
        }
        catch (err) {
            res.json({ success: false, error: err.message })
        }
    }
};

module.exports = AuthController;