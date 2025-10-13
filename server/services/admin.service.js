const User = require('../models/user.model')
const Role = require('../models/role.model');
const LogActivies = require('../models/userlogs.model')

const logUserAction = require('../utils/others/logUserAction')

const jwt = require('jsonwebtoken')

const { 
    CreatePremissionResponseDTO, 
    GetAllPermissionsResponseDTO 
} = require('../dtos/premission.dto');

const {
    GetallactivitiesResponseDTO,
    GetOneActivityRolesResponseDTO
} = require('../dtos/activities.dto')

class AdminService {
    static async CreatePermission(roleid, permission, token, req) {
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

        const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];

        const getrole = await Role.findById(roleid);
        if (!getrole) throw new Error("Role not found");

        // Check which permissions are actually new
        const existspermission = getrole.permissions.some(p => p.toString() === permission.toString());
        if (existspermission) {
            throw new Error("Permission already exists for this role.");
        }

        const updatedRole = await Role.findByIdAndUpdate(
            roleid,
            { $addToSet: { permissions: permission } },
            { new: true, runValidators: true }
        );

        if (updatedRole && req) {
            const metadata = {
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                userAgent: req.headers['user-agent'],
                timestamp: new Date(),
            };
            await logUserAction(
                req,
                "new_permission_create",
                `${decoded.email} new Permission Created for ${getrole.name}`,
                metadata,
                user._id
            );
        }

        return CreatePremissionResponseDTO()
    }

    static async GetAllPermissions() {
        const getallroles = await Role.find()

        return GetAllPermissionsResponseDTO(getallroles)
    }

    // get all user Activitis
    static async getallactivities(){
        const getactivites = await LogActivies.find().populate('user')

        return GetallactivitiesResponseDTO(getactivites)
    }

    // get one actiavity

    static async getoneactivity(activityid){
        const oneactivity = await LogActivies.findById(activityid).populate('user')

        return GetOneActivityRolesResponseDTO(oneactivity)
    }
   
}

module.exports = AdminService