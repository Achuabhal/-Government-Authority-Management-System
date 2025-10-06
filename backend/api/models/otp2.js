const mongoose = require("mongoose");

const otpSchemaa = new mongoose.Schema({
  email2: { type: String, required: true },
  otp: { type: Number, required: true },
  expireAt: { type: Date, required: true },
});

// use the correct variable name here
otpSchemaa.index({ expireAt: 1 }, { expireAfterSeconds: 0 }); // auto delete after expireAt

module.exports = mongoose.model("Otpp", otpSchemaa);
