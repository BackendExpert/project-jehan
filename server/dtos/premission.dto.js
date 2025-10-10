// create Permissions
exports.CreatePremissionDTO = (roleid, permission) => ({ roleid, permission })
exports.CreatePremissionResponseDTO = (message = "Permission created successfully") => ({ success: true, message })

// get all Permissions
exports.GetAllPermissionsResponseDTO = (result, message = "All Permissions retrieved successfully") => ({ success: true, result, message })

// Error
exports.ErrorResponseDTO = (message = "Something went wrong") => ({ success: false, message })