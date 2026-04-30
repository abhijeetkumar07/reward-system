const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rewardDB");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.log("Starting server without database... (Login and data features will be unavailable)");
  }
};

module.exports = connectDB;
