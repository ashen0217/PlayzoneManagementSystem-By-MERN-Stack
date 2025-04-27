const express = require("express");
const router = express.Router();

//insert model
const Payments = require("../Model/payModel");

//insert user controller
const payController = require("../Controllers/payController");

router.get("/",payController.getAllPayments);
router.post("/",payController.addPayment);
router.get("/:id",payController.getByID);
router.put("/:id",payController.updatePayment);
router.delete("/:id",payController.deletePayment);

//export 
module.exports = router;