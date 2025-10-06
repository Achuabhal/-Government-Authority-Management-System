const mongoose = require('mongoose');

const leadAdminBannerSchema = new mongoose.Schema({
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



const leadAdminBanner = mongoose.model('leadAdminBanner', leadAdminBannerSchema);

module.exports = leadAdminBanner;
