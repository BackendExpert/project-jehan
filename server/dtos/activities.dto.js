// dto for get all user activies
exports.GetallactivitiesResponseDTO = (result, message="Get all activities Success") => ({ result, message })

// get noe activity
exports.GetOneActivityDTO = (activiteId) => ({ activiteId })
exports.GetOneActivityRolesResponseDTO = (result, message="One Activity Fetched Success") => ({ result, message })

// error dto
exports.ActErrorResponseDTO = (message = "Something went wrong") => ({ success: false, message })