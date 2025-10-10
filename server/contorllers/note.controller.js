const { CreateNoteDTO, ErrorResponseDTO } = require("../dtos/note.dto");
const NoteService = require("../services/note.services");

const NoteController = {
    createNote: async (req, res) => {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).json(ErrorResponseDTO("Access denied. No token provided."));
            }

            const {
                title,
                content,
            } = req.body

            const uploadfile = req.file ? req.file.filename : undefined;

            const notedata = CreateNoteDTO(title, content, uploadfile)

            const result = await NoteService.CreateNote(
                notedata.title,
                notedata.content,
                notedata.uploadfile,
                token,
                req
            )

            res.status(200).json(result)

        }
        catch (err) {
            return res.status(400).json(ErrorResponseDTO(err.message));
        }
    }
};

module.exports = NoteController;