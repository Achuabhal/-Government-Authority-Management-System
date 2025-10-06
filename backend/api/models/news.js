const mongoose = require('mongoose');

const newsItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }, // store URL or path
  month: { type: String, required: true },
  year: { type: Number, required: true }
});

// If you want to store multiple news items in **one document** as an array:
const newsSchema = new mongoose.Schema({
  newsItems: [newsItemSchema]   // array of news items
});

module.exports = mongoose.model('News', newsSchema);
