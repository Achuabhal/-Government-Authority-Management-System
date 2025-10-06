const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const gallerySchema = new mongoose.Schema({
  galleryImages: [galleryImageSchema]   // array field named galleryImages
});

module.exports = mongoose.model('Gallery', gallerySchema);
