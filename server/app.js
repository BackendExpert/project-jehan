const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
const morgan = require("morgan");
const conditionalRateLimit = require("./middlewares/conditionalRateLimit");
require("dotenv").config();

// all routes

const authRoute = require('./routes/auth.route')
const noteRoute = require('./routes/note.route')
const adminRoute = require('./routes/admin.route')

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// app.use(helmet());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // allow frontend on different port to load images
}));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("combined"));

// app.use(conditionalRateLimit);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
// eg: app.use('/api/route_name)

// auth route
app.use('/api/auth', authRoute)

// note route
app.use('/api/note', noteRoute)

// admin route
app.use('/api/admin', adminRoute)

// health check
app.get("/api", (req, res) => {
    res.send(`✅ Server running on port ${PORT}`);
});


app.get("/", (req, res) => {
    res.send(`✅ Server running on port ${PORT}`);
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;