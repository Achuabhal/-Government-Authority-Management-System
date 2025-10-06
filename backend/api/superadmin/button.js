const mongoose = require('mongoose');

const SuperadmintoggleSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
    required: true
  }
});

const SuperAdminToggle = mongoose.model('SuperAdminToggle', SuperadmintoggleSchema);
module.exports = SuperAdminToggle;