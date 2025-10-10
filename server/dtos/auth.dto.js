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

// Logout

exports.LogoutResponseDTO = (message = "Logout successful") => ({
    success: true,
    message,
});