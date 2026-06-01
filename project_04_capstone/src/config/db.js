const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log(` mongoose uri is not available`);
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.log(`MongoDB connection error`, error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
