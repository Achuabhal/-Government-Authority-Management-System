const mongoose = require('mongoose');

const adminbannerSchema = new mongoose.Schema({
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



const AdminBanner = mongoose.model('AdminBanner', adminbannerSchema);

module.exports = AdminBanner;
