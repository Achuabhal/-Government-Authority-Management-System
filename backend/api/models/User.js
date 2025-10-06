const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role: { type: String, default: "admin" }  // Add this line
});

module.exports = mongoose.model("User", UserSchema);
