const express = require('express');
const router2 = express.Router();

//insert model
const Payments = require("../Model/payModel.js");
//insert user controller
const PayController = require("../Controllers/payControl.js");


router2.get("/",PayController.getAllPayments);
//router2.post("/",PayController.addPayment);
/*router.get("/:id",payController.getByID);
router.put("/:id",payController.updateResource);
router.delete("/:id",payController.deleteResource)*/