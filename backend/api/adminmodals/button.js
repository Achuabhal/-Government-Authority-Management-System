const mongoose = require('mongoose');

const superAdminToggleSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
    required: true
  }
});

const superAdminToggle = mongoose.model('superAdminToggle', superAdminToggleSchema);
module.exports = superAdminToggle;