const mongoose = require('mongoose');

const leadadmingalleryImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const leadAdminGallerySchema = new mongoose.Schema({
  galleryImages: [leadadmingalleryImageSchema]   // array field named galleryImages
});

module.exports = mongoose.model('leadAdminGallery', leadAdminGallerySchema);
