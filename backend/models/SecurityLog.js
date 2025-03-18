const mongoose = require('mongoose');

const securityLogSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const SecurityLog = mongoose.model('SecurityLog', securityLogSchema);

module.exports = SecurityLog;