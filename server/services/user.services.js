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

    static async getallroledata(){
        const getroledata = await Role.find()

        return GetallRolesResponseDTO(getroledata)
    }

    static async getoneuser(userid){
        const getuser = await User.findById(userid)

        return GetOneUeserRolesResponseDTO(getuser)
    }
}

module.exports = UserService