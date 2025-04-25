const express = require('express');
const router = express.Router();

//controller
const eventController = require("../Controllers/eventController.js");

//insert model
const Events = require("../Model/eventModel");

// Routes for events
router.get("/", eventController.getAllEvents);
router.post("/", eventController.addEvent);
router.get("/:id", eventController.getByID);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
