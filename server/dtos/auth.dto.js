exports.LoginDTO = (email, password) => ({ email, password });

exports.LoginResponseDTO = (token, user) => ({
    token,
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    },
});

exports.registaion = (username, email, password) => ({ username, password, email, role })

exports.RegistationResponseDTO = (user) => ({
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    },
    message: "Registaion Success"
}) 