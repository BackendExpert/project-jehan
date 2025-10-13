const UserService = require("../services/user.services");
const {
    GetOneUserDTO,
    ErrorResponseDTO,
    UpdateUserRoleDTO
} = require('../dtos/user.dto')

const UserController = {
    // get all users
    getallusers: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const result = await UserService.getallusers(token)
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    // get all roles 
    getallrole: async (req, res) => {
        try {
            const result = await UserService.getallroledata()
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    // get one user by user ID
    getoneuser: async (req, res) => {
        try {
            const userid = req.params.id

            const oneuserDto = GetOneUserDTO(userid)

            const result = await UserService.getoneuser(
                oneuserDto.userid
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    // update user role
    updateUserRole: async (req, res) => {
        try {

            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const { roleId } = req.body
            const userid = req.params.id

            // user dto
            const updateuserdto = UpdateUserRoleDTO(
                token,
                userid,
                roleId
            )

            const result = await UserService.updateUserRole(
                updateuserdto.token,
                updateuserdto.userid,
                updateuserdto.roleid,
                req
            )
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    }
};

module.exports = UserController;