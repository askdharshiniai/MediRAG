const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  dateOfBirth: String,
  bloodGroup: String,
  medicalHistory: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] }
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
