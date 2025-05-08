const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  packageType: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  message: { 
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending' 
  },
});

module.exports = mongoose.model('Booking', bookingSchema);