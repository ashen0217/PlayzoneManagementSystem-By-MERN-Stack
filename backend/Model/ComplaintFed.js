const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    complain: {
      type: String,
      required: [true, "Message is required"],
    },
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
    },
    ratings: {
      type: Number,
      required: [true, "Ratings are required"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;