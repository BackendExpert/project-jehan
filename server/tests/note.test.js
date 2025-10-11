const request = require("supertest");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const app = require("../app");

const User = require("../models/user.model");
const Note = require("../models/note.model")
const Role = require("../models/role.model")


let token
let user
let noteid

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // 1 clear before test data
    // note deleteing Role data (already have)
    await User.deleteMany({})
    await Note.deleteMany({})

    // get studnet role
    const stdrole = await Role.findOne({ name: "student" })

    // create Student 
    user = await User.create({
        username: "testuser",
        email: "testuser@example.com",
        password: "hashedpassword123",
        role: stdrole._id,
        isActive: true,
        isEmailVerified: true,
    })

    // create JWT token becuse to access note route need token becuse auth middleware checks the token before route works
    token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: stdrole.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
})

afterAll(async () => {
    await Note.deleteMany({ student: user._id });
    await User.deleteOne({ email: user.email });
    await mongoose.connection.close()
})


describe("Note API test", () => {

    // test case for create note
    test("create note and return message", async () => {
        const res = await request(app)
            .post("/api/note")
            .set("Authorization", `Bearer ${token}`)
            .field("title", "Integration Note")
            .field("content", "This is a note created during testing.")
            .attach("notefile", Buffer.from("dummy content"), "test.txt");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBeDefined();

        const note = await Note.findOne({ title: "Integration Note" });
        expect(note).not.toBeNull();
        expect(note.student.toString()).toBe(user._id.toString());

        noteid = note._id;
    })

    // test case for update note
    test("Update note and return message", async () => {
        const res = await request(app)
            .put(`/api/note/${noteid}`)
            .set("Authorization", `Bearer ${token}`)
            .field("title", "Updated Note Title")
            .field("content", "Updated content here.");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        // after update display note updated title
        const updatedNote = await Note.findById(noteid);
        expect(updatedNote.title).toBe("Updated Note Title");
    })
})


