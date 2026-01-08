const express = require("express");
const router = express.Router();
const formidable = require("formidable");

//insert model
const Payments = require("../Model/payModel");

//insert user controller
const payController = require("../Controllers/payController");

router.get("/",payController.getAllPayments);
router.post("/", upload.single("slip"), payController.addPayment);
router.get("/:id",payController.getByID);
router.put("/:id", upload.single("slip"), payController.updatePayment);
router.delete("/:id",payController.deletePayment);

//export 
module.exports = router;