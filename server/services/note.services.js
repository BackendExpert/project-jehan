const jwt = require('jsonwebtoken')

const logUserAction = require('../utils/others/logUserAction')

const Note = require('../models/note.model');
const User = require('../models/user.model')

const { 
    CreateNoteResponseDTO,
    ErrorResponseDTO
} = require('../dtos/note.dto');

// create class for noteservice
class NoteService {

    // create new note
    static async CreateNote(title, content, uploadfile, token, req) {

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

        // create note
        const newNote = new Note({
            student: user._id,
            title: title,
            content: content,
            uploadfile: uploadfile
        })

        const reusltnewNote = await newNote.save()
        
        // if note created success then add login action to userlogactions
        if (reusltnewNote) {
            if (req) {
                const metadata = {
                    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                    timestamp: new Date(),
                };
                await logUserAction(
                    req,
                    "create_attendance",
                    `${decoded.email} attendance added`,
                    metadata,
                    user._id
                );
            }
            
            // return with success 
            return CreateNoteResponseDTO()
        }
    }
}

module.exports = NoteService