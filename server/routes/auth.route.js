const express = require('express');
const AuthController = require('../contorllers/auth.controller');

const router = express.Router();

router.post('/registation', AuthController.registaion)
router.post('/verify-email', AuthController.verifyEmail)
router.post('/login', AuthController.login)

module.exports = router;