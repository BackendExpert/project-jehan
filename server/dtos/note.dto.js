// Create Note
exports.CreateNoteDTO = (title, content, uploadfile) => ({ title, content, file: uploadfile });
exports.CreateNoteResponseDTO = (message = "Note created/uploaded successfully") => ({ success: true, message })

// Update Note
exports.UpdateNoteDTO = (noteid, title, content, uploadfile) => ({ noteid, title, content, uploadfile })
exports.UpdateNoteResponseDTO = (message = "Note updated successfully") => ({ success: true, message })

// Delete Note
exports.DeleteNoteDTO = (noteid) => ({ noteid })
exports.DeleteNoteResponseDTO = (message = "Note deleted successfully") => ({ success: true, message })

// Get One Note
exports.GetOneNoteDTO = (noteid) => ({ noteid })
exports.GetOneNoteResponseDTO = (result, message = "Note retrieved successfully") => ({ success: true, result, message })

// Get All Notes
exports.GetAllNoteResponseDTO = (result, message = "All notes retrieved successfully") => ({ success: true, result, message })

// Get my Notes
exports.GetMyAllNoteResponseDTO = (result, message = "My All notes retrieved successfully") => ({ success: true, result, message })


// Error
exports.ErrorResponseDTO = (message = "Something went wrong") => ({ success: false, message })
