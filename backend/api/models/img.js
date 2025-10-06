const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
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



const Galleryy = mongoose.model('Galleryy', gallerySchema);

module.exports = Galleryy;
