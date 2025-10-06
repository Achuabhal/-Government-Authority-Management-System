const mongoose = require('mongoose');

const SuperadminNewsItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }, // store URL or path
  month: { type: String, required: true },
  year: { type: Number, required: true }
});

// If you want to store multiple news items in **one document** as an array:
const SuperadminNewsSchema = new mongoose.Schema({
  newsItems: [SuperadminNewsItemSchema]   // array of news items
});

module.exports = mongoose.model('SuperAdminNews', SuperadminNewsSchema);
