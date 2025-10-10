const User = require('../models/user.model')
const Role = require('../models/role.model');
const { CreatePremissionResponseDTO } = require('../dtos/premission.dto');

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
        const existingPermissions = getrole.permissions.map(p => p.toString());
        const newPermissions = permissionsArray.filter(p => !existingPermissions.includes(p));

        if (newPermissions.length === 0) {
            // Nothing new to add
            return {
                success: false,
                error: "No new permissions were added."
            };
        }

        // Add only the new permissions
        const permissionCreate = await Role.findByIdAndUpdate(
            roleid,
            { $addToSet: { permissions: { $each: newPermissions } } },
            { new: true, runValidators: true }
        );

        if (permissionCreate && req) {
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
}

module.exports = AdminService