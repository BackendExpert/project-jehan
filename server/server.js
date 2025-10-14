require("dotenv").config();
const ConnectDB = require("./config/config");
const app = require("./app"); 
const PORT = process.env.PORT || 5000;
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);


// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


app.set("io", io); // make io accessible in routes/controllers

io.on("connection", (socket) => {
    console.log("✅ New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});


ConnectDB()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });
