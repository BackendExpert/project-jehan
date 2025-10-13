const User = require("../models/user.model");
const Role = require("../models/role.model")

const jwt = require('jsonwebtoken')

const {
    GetAllUserResponseDTO,
    GetallRolesResponseDTO,
    GetOneUeserRolesResponseDTO
} = require("../dtos/user.dto");




class UserService {
    static async getallusers(token, req) {
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

        // fetch all user data from db
        const getalluser = await User.find().populate('role')

        // user dto send data
        return GetAllUserResponseDTO(getalluser)
    }

    static async getallroledata() {
        const getroledata = await Role.find()

        return GetallRolesResponseDTO(getroledata)
    }

    static async getoneuser(userid) {
        const getuser = await User.findById(userid).populate('role')

        return GetOneUeserRolesResponseDTO(getuser)
    }

    static async updateUserRole(token, userid, roleId, req) {
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
        const requester = await User.findOne({ email: decoded.email });
        if (!requester) throw new Error("Requester user not found");

        // check user is there no not
        const userToUpdate = await User.findById(userid);
        if (!userToUpdate) throw new Error("Target user not found");

        // check role is there or not
        const role = await Role.findById(roleId);
        if (!role) throw new Error("Role not found");

        // update user role 
        userToUpdate.role = role._id;
        await userToUpdate.save();

        if (req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(
                req,
                "update_user_role",
                `${decoded.email} Update User role ${userid} - ${userToUpdate.email}`,
                metadata,
                requester._id
            );
        }
        return UpdateUserResponseDTO();
    }
}

module.exports = UserService