const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
