const express = require('express');
const auth = require('../middlewares/authMiddleware')
const checkPermission = require('../middlewares/checkPermission')
const upload = require('../middlewares/uploadMiddleware');
const NoteController = require('../contorllers/note.controller');

const router = express.Router();

// create note
router.post('/', auth, checkPermission(['note:create']), upload.single('notefile'), NoteController.createNote)

// update note 
router.put('/:id', auth, checkPermission(['note:update']), upload.single('notefile'), NoteController.updateNote)

// delete note
router.delete('/:id', auth, checkPermission(['note:delete']), NoteController.deleteNote)

// get all notes
router.get('/', auth, checkPermission(['note:getall']), NoteController.getallnotes)

// get one note
router.get('/:id', auth, checkPermission(['note:getone']), NoteController.getOneNote)

// get my notes -> this is for when current login student can access only his/her notes
router.get('/my-notes', auth, checkPermission(['note:mynotes']), NoteController.getmyallnotes)

module.exports = router;