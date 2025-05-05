const Complaint = require("../Model/ComplaintFed");

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { name, email, complain, feedback, ratings } = req.body;

    if (!name || !email || !complain || !feedback || !ratings) {
      return res.status(400).json({ error: "All fields are required" });
    }

      const complaint = new Complaint({ name, email, complain, feedback, ratings });
    await complaint.save();

    res.status(201).json({ message: "Complaint/Feedback submitted successfully", complaint });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint/Feedback not found" });
    }
    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a complaint by ID
const updateComplaint = async (req, res) => {
  try {
    const { name, email, complain, feedback, ratings } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { name, email, complain, feedback, ratings },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint/Feedback not found" });
    }

    res.status(200).json({ message: "Complaint/Feedback updated", complaint });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a complaint by ID
const deleteComplaint = async (req, res) => {
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

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
};

