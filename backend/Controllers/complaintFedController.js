import Complaint from "../models/Complaint.js";

// Create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const complaint = new Complaint({ name, email, message });
    await complaint.save();

    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single complaint by ID
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a complaint by ID
export const updateComplaint = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { name, email, message },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint updated", complaint });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a complaint by ID
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

