const Event = require("../Model/eventModel.js");

// GET all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if (!events.length) {
      return res.status(404).json({ message: "No events found" });
    }
    return res.status(200).json({ message: "Events fetched", events });
  } catch (err) {
    console.error("Error fetching events:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST create new event
const addEvent = async (req, res) => {
  const { eventID, Date, Venue, Time, Participants, description } = req.body;

  try {
    const newEvent = new Event({
      Date,
      Venue,
      Time,
      Participants,
      description,
    });

    await newEvent.save();
    return res.status(201).json({ message: "Event added", newEvent });
  } catch (err) {
    console.error("Error adding event:", err);
    return res.status(500).json({ message: "Failed to add event", error: err.message });
  }
};

// GET single event by ID
const getByID = async (req, res) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ message: "Event found", event });
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT update event by ID
const updateEvent = async (req, res) => {
  const id = req.params.id;
  const {Date, Venue, Time, Participants, description } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {Date, Venue, Time, Participants, description },
      { new: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ message: "Event updated", updatedEvent });
  } catch (err) {
    console.error("Error updating event:", err);
    return res.status(500).json({ message: "Failed to update event", error: err.message });
  }
};

// DELETE event by ID 
const deleteEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted", deletedEvent });
  } catch (err) {
    console.error("Error deleting event:", err);
    return res.status(500).json({ message: "Failed to delete event", error: err.message });
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  getByID,
  updateEvent,
  deleteEvent,
};
