const express = require('express');
const AuthController = require('../contorllers/auth.controller');

const router = express.Router();

router.post('/registation', AuthController.registaion)
router.post('/login', AuthController.login)
router.post('/verify-email', AuthController.verifyEmail)

module.exports = router;