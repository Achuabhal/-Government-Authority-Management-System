const mongoose = require('mongoose');

const toggleSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
    required: true
  }
});

const Toggle = mongoose.model('Toggle', toggleSchema);
module.exports = Toggle;
