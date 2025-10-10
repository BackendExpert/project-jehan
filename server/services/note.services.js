const jwt = require('jsonwebtoken')

const logUserAction = require('../utils/others/logUserAction')

const Note = require('../models/note.model');
const User = require('../models/user.model')

const {
    CreateNoteResponseDTO,
    UpdateNoteResponseDTO,
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


    // update Note

    static async UpdateNote(noteid, title, content, uploadfile, token, req) {
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

        // check the note available in system
        const existingNote = await Note.findById(noteid)

        if (!existingNote) {
            throw new Error("Note Cannot be found in System")
        }

        // only note added user can update other cannot 
        if (existingNote.student.toString() !== user._id.toString()) {

            // if user attempt update rocde the recode it
            if (req) {
                const metadata = {
                    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                    userAgent: req.headers["user-agent"],
                    timestamp: new Date(),
                };

                await logUserAction(
                    req,
                    "attempt_update_wrong_note",
                    `${decoded.email} attempt update wrong note ${existingNote._id}, ${existingNote.title}`,
                    metadata,
                    user._id
                );
            }
            throw new Error("You are not authorized to update this note");
        }

        // Update only provided fields
        if (title !== undefined && title.trim() !== "") existingNote.title = title;
        if (content !== undefined && content.trim() !== "") existingNote.content = content;
        if (uploadfile !== undefined && uploadfile !== "") existingNote.uploadfile = uploadfile;


        const updatedNote = await existingNote.save();

        // if successful then it also recoded
        if (req) {
            const metadata = {
                ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                userAgent: req.headers["user-agent"],
                timestamp: new Date(),
            };

            await logUserAction(
                req,
                "update_note",
                `${decoded.email} updated a note`,
                metadata,
                user._id
            );
        }
        
        return UpdateNoteResponseDTO()

    }
}

module.exports = NoteService