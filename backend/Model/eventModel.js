const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Event Schema
const eventSchema = new Schema({
  Date: {
    type: Date,
    required: true,
    // Add a custom setter to handle string dates
    set: function(date) {
      // If it's already a Date object, return it
      if (date instanceof Date) return date;
      
      // If it's a string, try to parse it
      if (typeof date === 'string') {
        const parsedDate = new Date(date);
        // Check if the date is valid
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
      
      // If we can't parse it, return the original value
      // Mongoose will handle the validation
      return date;
    }
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
