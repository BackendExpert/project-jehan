const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const AdminController = require('../contorllers/admin.controller');

const router = express.Router();

// create new permission
router.post('/:id', auth, checkPermission(['permission:create']), AdminController.createPremission)

// get all permission
router.get('/', auth, checkPermission(['permission:getall']), AdminController.getallPermissions)


// get all activitis
router.get('/all-activities', auth, checkPermission(['activity:getall']), AdminController.getallactivities)

// get one activity
router.get('/one-activity/:id', auth, checkPermission(['activity:getone']), AdminController.getoneactivity)


module.exports = router;