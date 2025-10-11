const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Note = require("../models/note.model")
require("dotenv").config();




