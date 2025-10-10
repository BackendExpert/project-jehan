require("dotenv").config();
const ConnectDB = require("./config/config");
const app = require("./app"); 
const PORT = process.env.PORT || 5000;

ConnectDB()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
    });
