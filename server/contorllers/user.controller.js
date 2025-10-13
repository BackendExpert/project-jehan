const UserService = require("../services/user.services");

const UserController = {
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

    getallrole: async(req, res) => {
        try{
            const result = await UserService.getallroledata()
            res.status(200).json(result)
        }
        catch(err){
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    }
};

module.exports = UserController;