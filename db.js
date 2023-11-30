const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  const url = process.env.MONGO_URL;
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Thoát ứng dụng nếu có lỗi kết nối
  }
};

module.exports = connectDB;
