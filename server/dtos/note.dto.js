// Create Note
exports.CreateNoteDTO = (userid, title, content, uploadfile) => ({ userid, title, content, uploadfile })
exports.CreateNoteResponseDTO = (message = "Note created/uploaded successfully") => ({ success: true, message })

// Update Note
exports.UpdateNoteDTO = (userid, noteid, title, content, uploadfile) => ({ userid, noteid, title, content, uploadfile })
exports.UpdateNoteResponseDTO = (message = "Note updated successfully") => ({ success: true, message })

// Delete Note
exports.DeleteNoteDTO = (noteid) => ({ noteid })
exports.DeleteNoteResponseDTO = (message = "Note deleted successfully") => ({ success: true, message })

// Get One Note
exports.GetOneNoteDTO = (noteid) => ({ noteid })
exports.GetOneNoteResponseDTO = (result, message = "Note retrieved successfully") => ({ success: true, result, message })

// Get All Notes
exports.GetAllNoteResponseDTO = (result, message = "All notes retrieved successfully") => ({ success: true, result, message })

// Error
exports.ErrorResponseDTO = (message = "Something went wrong") => ({ success: false, message })
