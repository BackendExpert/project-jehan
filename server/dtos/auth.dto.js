// user registation

exports.RegistrationDTO = (username, email, password) => ({
    username,
    email,
    password,
});

exports.RegistrationResponseDTO = (token, message = "Registration successful. Verification email sent.") => ({
    success: true,
    token,
    message,
});

// email Verification

exports.VerifyEmailDTO = (token, otp) => ({
    token,
    otp,
});

exports.VerifyEmailResponseDTO = (message = "Account Verification Successful") => ({
    success: true,
    message,
});


// Login

exports.LoginDTO = (email, password) => ({
    email,
    password,
});

exports.LoginResponseDTO = (token, user) => ({
    success: true,
    message: "Login Success",
    token,
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    },
});

// forget password DTO
exports.ForgetPasswordDTO = (email) => ({email})

exports.ForgetPasswordResponseDTO = (token, message = "Email Verification Success, Verification email sent.") => ({token, token})


// verify OTP
exports.VerifyOTPDTO = (token, otp) => ({ token, otp })

exports.VerifyOTPResponseDTO = (message ="OTP Verification Success") => ({ success: true, message })


// update Password
exports.UpdatePasswordDTO = (token, newpassword) => ({ token, newpassword})

exports.UpdatePasswordResponseDTO = (message = "Password Updated Successful") => ({ success: true, message })


// Logout

exports.LogoutResponseDTO = (message = "Logout successful") => ({
    success: true,
    message,
});