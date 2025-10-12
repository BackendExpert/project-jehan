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
    test("Update note by id and return message", async () => {
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

    // test case of get my all notes
    // for this need token

    test("✅ Get my notes", async () => {
        const res = await request(app)
            .get("/api/note/my-notes")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test("Get one note by ID", async () => {
        const res = await request(app)
            .get(`/api/note/${noteid}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data._id).toBe(noteid.toString());
    });

    test("Delete existing note", async () => {
        const res = await request(app)
            .delete(`/api/note/${noteid}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        const deletedNote = await Note.findById(noteid);
        expect(deletedNote).toBeNull();
    });

    // test case for create note without token
    test("Fail to create note without token", async () => {
        const res = await request(app)
            .post("/api/note")
            .send({ title: "No Token", content: "Should fail" });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toMatch(/no token/i);
    });

    // test case for not permissions
    test("Fail with invalid permission (no note:create)", async () => {
        // create role without permissions
        const limitedRole = await Role.create({
            name: "viewer",
            permissions: ["note:getone"],
        });

        const limitedUser = await User.create({
            username: "limited",
            email: "limited@example.com",
            password: "12345",
            role: limitedRole._id,
        });

        const limitedToken = jwt.sign(
            {
                id: limitedUser._id,
                email: limitedUser.email,
                role: limitedRole.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const res = await request(app)
            .post("/api/note")
            .set("Authorization", `Bearer ${limitedToken}`)
            .field("title", "Unauthorized Note")
            .field("content", "This should fail.");

        expect(res.statusCode).toBe(403);
        expect(res.body.message).toMatch(/insufficient permissions/i);
    });

})


