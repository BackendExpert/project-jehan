const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const UserOTP = require("../models/userotp.mode")
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
    await UserOTP.deleteMany({ email: testEmail });
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
                password: "Password123!"
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

    test("Verify Email with Correct OTP", async () => {
        // Wait for OTP to be created in DB (max 5 seconds)
        let otpEntry;
        for (let i = 0; i < 25; i++) { // 25*200ms = 5s
            otpEntry = await UserOTP.findOne({ email: testEmail });
            if (otpEntry) break;
            await new Promise(r => setTimeout(r, 200)); // wait 200ms
        }

        expect(otpEntry).not.toBeNull(); // sanity check

        const res = await request(app)
            .post("/api/auth/verify-email")
            .send({
                email: testEmail,
                otp: otpEntry.otp
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        const updatedUser = await User.findOne({ email: testEmail });
        expect(updatedUser.isEmailVerified).toBe(true);
    });

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