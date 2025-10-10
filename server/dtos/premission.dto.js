// create Permissions
exports.CreatePremissionDTO = (name, permission) => ({ name, permission })
exports.CreatePremissionResponseDTO = (message = "Permission created successfully") => ({ success: true, message })

// delete Permissions
exports.DeletePremissionDTO = (permissionid) => ({permissionid})
exports.DeletePremissionResponseDTO = (message = "Permission Deleted successfully") => ({ success: true, message })

// get all Permissions
exports.GetAllPermissionsResponseDTO = (result, message = "All Permissions retrieved successfully") => ({ success: true, result, message })

// Error
exports.ErrorResponseDTO = (message = "Something went wrong") => ({ success: false, message })