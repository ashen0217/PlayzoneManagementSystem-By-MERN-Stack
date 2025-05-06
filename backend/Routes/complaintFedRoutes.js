// complaintFedRoutes.js
const express = require("express");
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  downloadComplaints,
  getFeedbacks,
} = require("../Controllers/complaintFedController");

const router = express.Router();

router.post("/complaints/create", createComplaint);
router.get("/complaints", getAllComplaints);
router.get("/complaints/download", downloadComplaints);
router.get("/complaints/:id", getComplaintById);
router.put("/complaints/:id", updateComplaint);
router.delete("/complaints/:id", deleteComplaint);
router.get("/testimonials", getFeedbacks);

module.exports = router;