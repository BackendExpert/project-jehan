const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const UserController = require('../contorllers/user.controller');

const router = express.Router();

router.get('/', auth, checkPermission(['user:getall']), UserController.getallusers)

router.get('/roledata', auth, checkPermission(['user:roledata']), UserController.getallrole)

router.get('/getoneuser/:id', auth, checkPermission(['user:getone']), UserController.getoneuser)

router.put('/updateRole/:id', auth, checkPermission(['user:updaterole']), UserController.updateUserRole)

module.exports = router;