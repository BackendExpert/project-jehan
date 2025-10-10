const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");
require("dotenv").config();

// before all connect database and setup user

// create ueser email 

let testEmail;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    testEmail = `testuser${Date.now()}@example.com`;
});

// after all disconnect database connection

afterAll(async () => {
    await User.deleteOne({ email: testEmail });
    await mongoose.connection.close()
})

describe("Auth API Test", () => {

    // registation test case
    test("Registaion Create user and return token", async () => {
        const res = await request(app)
            .post("/api/auth/registation")
            .send({
                username: "TestUser",
                email: testEmail,
                password: "Password123!"
            });

        // manually verify user for login

        const user = await User.findOne({ email: testEmail });
        if (user && !user.isEmailVerified) {
            user.isEmailVerified = true;
            await user.save();
        }

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
    })

    // registation fail test case for existing user

    test("Registaion Faild for existing user", async () => {
        const res = await request(app)
            .post("/api/auth/registation")
            .send({
                username: "TestUser",
                email: testEmail,
                password: "Password123!"
            });

        expect(res.body.success).toBe(false)
    })

    // login test case

    test("Login works with correct email and password", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: testEmail,
                password: "Password123!"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
    })

})