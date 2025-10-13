exports.GetAllUserResponseDTO = (result, message="All Users Fetched Success") => ({ result, message })

exports.UpdateUserRoleDTO = (token, userid, roleid) => ({ token, userid, roleid})
exports.UpdateUserResponseDTO = (message="Update user role successufully") => ({ success: true, message })
