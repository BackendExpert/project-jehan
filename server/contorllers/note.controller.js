const NoteService = require("../services/note.services");

const {
    CreateNoteDTO,
    ErrorResponseDTO,
    UpdateNoteDTO,
    DeleteNoteDTO,
    GetOneNoteDTO
} = require("../dtos/note.dto");


const NoteController = {
    createNote: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const { title, content } = req.body;

            if (!req.file) {
                return res.status(400).json(ErrorResponseDTO("File is required"));
            }

            const uploadfile = req.file.filename;
            const notedata = CreateNoteDTO(title, content, uploadfile);

            const result = await NoteService.CreateNote(
                notedata.title,
                notedata.content,
                notedata.file,
                token,
                req
            );

            res.status(200).json(result);
        } catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    updateNote: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const {
                title,
                content
            } = req.body

            const uploadfile = req.file ? req.file.filename : undefined;

            const noteid = req.params.id

            const updateNoteDate = UpdateNoteDTO(noteid, title, content, uploadfile)

            const result = await NoteService.UpdateNote(
                updateNoteDate.noteid,
                updateNoteDate.title,
                updateNoteDate.content,
                updateNoteDate.file,
                token,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    deleteNote: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }
            const noteid = req.params.id

            const delteNoteDate = DeleteNoteDTO(noteid)

            const result = await NoteService.DeleteNote(
                delteNoteDate.noteid,
                token,
                req
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    getmyallnotes: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const result = await NoteService.getmyallnotes(token)
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    getallnotes: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const result = await NoteService.getallnotes(token)
            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    },

    getOneNote: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const noteid = req.params.id

            const oneNote = GetOneNoteDTO(noteid)

            const result = await NoteService.getonenote(
                oneNote.noteid
            )

            res.status(200).json(result)
        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    }
};

module.exports = NoteController;