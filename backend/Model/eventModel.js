const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Event Schema
const eventSchema = new Schema({
  Date: {
    type: Date,
    required: true,
  },
  Venue: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Participants: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("eventModel", eventSchema);
