require("dotenv").config();

const connectDB = require("../src/db/db");
const mongoose = require("mongoose");

beforeAll(async () => {
  await connectDB();
}, 20000);

afterAll(async () => {
  await mongoose.disconnect();
}, 10000);
