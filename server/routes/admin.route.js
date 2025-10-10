const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const AdminController = require('../contorllers/admin.controller');

const router = express.Router();

// create new permission
router.post('/:id', auth, checkPermission(['permission:create']), AdminController.createPremission)

// get all permission
router.get('/', auth, checkPermission(['permission:getall']), AdminController.getallPermissions)

module.exports = router;