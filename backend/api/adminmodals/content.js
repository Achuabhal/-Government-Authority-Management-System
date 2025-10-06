const mongoose = require('mongoose');

const admingalleryImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const AdmingallerySchema = new mongoose.Schema({
  galleryImages: [admingalleryImageSchema]   // array field named galleryImages
});

module.exports = mongoose.model('AdminGallery', AdmingallerySchema);
