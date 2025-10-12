const express = require('express');
const AuthController = require('../contorllers/auth.controller');

const router = express.Router();

// registaion
router.post('/registation', AuthController.registaion)

// verify email
router.post('/verify-email', AuthController.verifyEmail)

// login
router.post('/login', AuthController.login)

// forgetpassword
router.post('/forget-password', AuthController.forgetPassword)

// verify-otp
router.post('/verify-opt', AuthController.verifyotp)

// update password
router.post('/update-password', AuthController.updatePassword)

module.exports = router;