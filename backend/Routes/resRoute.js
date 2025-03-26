const express = require('express');
const router1 = express.Router();

//insert model
const Resource = require("../Model/resModel.js");

//insert user controller
const resController = require("../Controllers/resController.js");

router1.get("/",resController.getAllResources);
router1.post("/",resController.addResource);
router1.get("/:id",resController.getByID);
router1.put("/:id",resController.updateResource);
router1.delete("/:id",resController.deleteResource);

//export 
module.exports = router1;
