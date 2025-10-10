const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const AdminController = require('../contorllers/admin.controller');

const router = express.Router();

router.post('/', auth, checkPermission(['permission:create']), AdminController.createPremission)

router.get('/', auth, checkPermission(['permission:getall']), AdminController.getallPermissions)

module.exports = router;