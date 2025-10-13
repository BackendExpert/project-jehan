const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const UserController = require('../contorllers/user.controller');

const router = express.Router();

router.get('/', auth, checkPermission(['user:getall']), UserController.getallusers)

module.exports = router;