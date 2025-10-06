// otpModel.js
const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: Number, required: true },
  expireAt: { type: Date, required: true },
});

otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 }); // auto delete after expireAt

module.exports = mongoose.model("Otp", otpSchema);
