const mongoose = require('mongoose');

const SuperAdminBannerSchema = new mongoose.Schema({
  images: {
    type: [String], // Array of image URLs
    required: true,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



const SuperAdminBanner = mongoose.model('SuperAdminBanner', SuperAdminBannerSchema);

module.exports = SuperAdminBanner;
