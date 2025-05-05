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
      required: [false, "Message is not required"],
    },
    feedback: {
      type: String,
      required: [false, "Feedback is not required"],
    },
    ratings: {
      type: Number,
      required: [false, "Ratings are not required"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;