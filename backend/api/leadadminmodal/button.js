const mongoose = require('mongoose');

const leadAdminToggleSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
    required: true
  }
});

const leadAdminToggle = mongoose.model('leadAdminToggle', leadAdminToggleSchema);
module.exports = leadAdminToggle;