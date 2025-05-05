import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/complaints/create", createComplaint);         // Create
router.get("/complaints", getAllComplaints);         // Read all
router.get("/complaints/:id", getComplaintById);     // Read one
router.put("/complaints/:id", updateComplaint);      // Update
router.delete("/complaints/:id", deleteComplaint);   // Delete

export default router;