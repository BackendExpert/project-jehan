exports.GetAllUserResponseDTO = (result, message="All Users Fetched Success") => ({ result, message })

exports.GetallRolesResponseDTO = (result, message="All Role Fetched Success") => ({ result, message })

exports.GetOneUserDTO = (userid) => ({ userid })
exports.GetOneUeserRolesResponseDTO = (result, message="One User Fetched Success") => ({ result, message })


exports.UpdateUserRoleDTO = (token, userid, roleid) => ({ token, userid, roleid})
exports.UpdateUserResponseDTO = (message="Update user role successufully") => ({ success: true, message })
