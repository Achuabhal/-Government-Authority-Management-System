const mongoose = require('mongoose');

const SuperAdminGalleryImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const SuperAdminGallerySchema = new mongoose.Schema({
  galleryImages: [SuperAdminGalleryImageSchema]   // array field named galleryImages
});

module.exports = mongoose.model('SuperAdminGallery', SuperAdminGallerySchema);
