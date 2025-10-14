const AdminService = require("../services/admin.service");

const { 
    CreatePremissionDTO, 
    ErrorResponseDTO
} = require("../dtos/premission.dto");

const {
    GetOneActivityDTO,
    ActErrorResponseDTO
} = require('../dtos/activities.dto')

const AdminController = {
    createPremission: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const {
                permisson
            } = req.body

            const roleId = req.params.id

            const roleData = CreatePremissionDTO(roleId, permisson)
            console.log(permisson, roleId)

            const result = AdminService.CreatePermission(
                roleData.roleid,
                roleData.permission,
                token,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    getallPermissions: async(req, res) => {
        try{
            const result = AdminService.GetAllPermissions()
            res.status(200).json(result)
        }
        catch(err){
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },
    
    getallactivities: async(req, res) => {
        try{
            const result = await AdminService.getallactivities()
            res.status(200).json(result)
        }
        catch(err){
            return res.status(400).json(ActErrorResponseDTO(err.message));
        }
    },

    getoneactivity: async(req, res) => {
        try{
            const actid = req.params.id

            const actidto = GetOneActivityDTO(actid)

            const result = await AdminService.getoneactivity(
                actidto.activiteId
            )

            res.status(200).json(result)
        }
        catch(err){
            return res.status(400).json(ActErrorResponseDTO(err.message));            
        }
    }
};

module.exports = AdminController;   