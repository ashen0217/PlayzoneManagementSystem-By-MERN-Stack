import mongoose from "mongoose";

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
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;