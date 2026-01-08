const express = require("express");
const router = express.Router();
const formidable = require("formidable");

//insert model
const Payments = require("../Model/payModel");

//insert user controller
const payController = require("../Controllers/payController");

// Middleware to handle file upload with formidable
const handleFileUpload = (req, res, next) => {
    const form = formidable({
        maxFileSize: 10 * 1024 * 1024, // 10MB limit
        keepExtensions: true,
        multiples: false
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: "Error parsing form data" });
        }
        
        // Convert fields to regular objects (formidable v3 returns arrays)
        Object.keys(fields).forEach(key => {
            req.body[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        });
        
        // Add file info to request if slip exists
        if (files.slip) {
            req.file = Array.isArray(files.slip) ? files.slip[0] : files.slip;
        }
        
        next();
    });
};

router.get("/", payController.getAllPayments);
router.post("/", handleFileUpload, payController.addPayment);
router.get("/:id", payController.getByID);
router.put("/:id", handleFileUpload, payController.updatePayment);
router.delete("/:id", payController.deletePayment);

//export 
module.exports = router;