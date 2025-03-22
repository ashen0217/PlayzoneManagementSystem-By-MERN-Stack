const express = require('express');
const router = express.Router();
//insert model
const Resource = require("../Model/resModel.js");
//insert user controller
const resController = require("../Controllers/resController.js");

router.get("/",resController.getAllResources);
router.post("/",resController.addResource);
router.get("/:id",resController.getByID);
router.put("/:id",resController.updateResource);
router.delete("/:id",resController.deleteResource);

//export 
module.exports = router;