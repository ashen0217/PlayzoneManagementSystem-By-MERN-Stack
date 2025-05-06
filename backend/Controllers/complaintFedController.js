// complaintFedController.js
const Complaint = require("../Model/ComplaintFed");
const { parse } = require('json2csv');

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { name, email, complain, feedback, ratings } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const complaint = new Complaint({ 
      name, 
      email, 
      complain, 
      feedback, 
      ratings,
      status: 'Pending',
      priority: 'Medium'
    });
    
    await complaint.save();
    res.status(201).json({ message: "Complaint/Feedback submitted successfully", complaint });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all complaints with filtering
const getAllComplaints = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { complain: { $regex: search, $options: 'i' } }
      ];
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//download 
const downloadComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    const fields = [
      'name',
      'email',
      'complain',
      'feedback',
      'ratings',
      'status',
      'priority',
      'createdAt'
    ];
    const opts = { fields };

    const csv = parse(complaints, opts);

    res.header('Content-Type', 'text/csv');
    res.attachment('complaints.csv');
    res.send(csv);
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
    const { name, email, complain, feedback, ratings, status, priority } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { name, email, complain, feedback, ratings, status, priority },
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

// Get all feedbacks with ratings (sorted by highest rating)
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Complaint.find({ 
      ratings: { $exists: true, $ne: null },
      feedback: { $exists: true, $ne: "" }
    })
    .sort({ ratings: -1 }) // Sort by highest rating first
    .limit(10); // Limit to top 10
    
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  downloadComplaints,
  getFeedbacks
};