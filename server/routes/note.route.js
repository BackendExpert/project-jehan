const express = require('express');
const auth = require('../middlewares/authMiddleware')
const checkPermission = require('../middlewares/checkPermission')
const upload = require('../middlewares/uploadMiddleware');
const NoteController = require('../contorllers/note.controller');

const router = express.Router();

router.post('/', auth, checkPermission(['note:create']), upload.single('notefile'), NoteController.createNote)

router.put(':id', auth, checkPermission(['note:update']), upload.single('notefile'), NoteController.updateNote)

router.delete(':id', auth, checkPermission(['note:delete']), NoteController.deleteNote)



module.exports = router;