const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: Number },
    gender: {
      type: String,
      enum: ["nam", "nu", "khac"],
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
