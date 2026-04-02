const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Attempting MongoDB connection...");
    console.log("URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ");
  } catch (err) {
    console.error(" DB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;