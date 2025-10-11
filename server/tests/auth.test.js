const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Role = require("../models/role.model")
require("dotenv").config();

// before all connect database and setup user

// create ueser email 
let testEmail;
let getstd;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    testEmail = `testuser${Date.now()}@example.com`;

    getstd = await Role.findOne({ name: "student" })

    if (!getstd) {
        throw new Error("❌ Student role not found — please seed roles before running tests.");
    }
});

// after all disconnect database connection

afterAll(async () => {
    //comment this line if need to check "Registaion Faild for existing user"
    await User.deleteOne({ email: testEmail });
    await mongoose.connection.close()
})

describe("Auth API Test", () => {

    // use for verify email
    let userToken;

    // registation test case
    test("Registaion Create user and return token", async () => {

        const res = await request(app)
            .post("/api/auth/registation")
            .send({
                username: "TestUser",
                email: testEmail,
                password: "Password123!",
                role: getstd._id,
            });

        // manually verify user for login

        console.log("🧩 Registration Response:", res.body);

        const user = await User.findOne({ email: testEmail });
        if (user && !user.isEmailVerified) {
            user.isEmailVerified = true;
            user.isActive = true;
            await user.save();
        }

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();

        // use for verify email
        userToken = res.body.token;
    })

    // registation fail test case for existing user

    test("Registaion Faild for existing user", async () => {
        const res = await request(app)
            .post("/api/auth/registation")
            .send({
                username: "TestUser",
                email: testEmail,
                password: "Password123!",
                role: getstd._id,
            });

        if (res.body.message) {
            expect(res.body.message).toBe("Email already exists");
        }
    })


    // verify email test case
    // test("Verify Email with Correct OTP", async () => {
    //     // fetch otp from db
    //     const otpEntry = await UserOTP.findOne({ email: testEmail });
    //     const otp = otpEntry?.otp;

    //     const res = await request(app)
    //         .post("/api/auth/verify-email")
    //         .send({
    //             email: testEmail,
    //             otp
    //         });

    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.success).toBe(true);

    //     const updatedUser = await User.findOne({ email: testEmail });
    //     expect(updatedUser.isEmailVerified).toBe(true);
    // })

    // login test case

    test("Login works with correct email and password", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: testEmail,
                password: "Password123!"
            });

        console.log("🔐 Login Response:", res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
    })

})