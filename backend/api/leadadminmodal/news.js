const mongoose = require('mongoose');

const NewsItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true }
});

const leadAdminNewsSchema = new mongoose.Schema({
  newsItems: [NewsItemSchema]  // array of news items
});

module.exports = mongoose.model('leadAdminNews', leadAdminNewsSchema);