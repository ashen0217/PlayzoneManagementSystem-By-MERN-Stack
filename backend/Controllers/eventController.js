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
  console.log("=== ADD EVENT CONTROLLER CALLED ===");
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);
  
  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("Empty request body");
    return res.status(400).json({ 
      message: "Request body is empty" 
    });
  }
  
  const { Date: eventDate, Venue, Time, Participants, description } = req.body;
  
  // Log each field for debugging
  console.log("Extracted fields:", { 
    eventDate: eventDate, 
    Venue: Venue, 
    Time: Time, 
    Participants: Participants, 
    description: description 
  });
  
  // Validate required fields
  if (!eventDate || !Venue || !Time || !Participants || !description) {
    console.log("Missing required fields:", { eventDate, Venue, Time, Participants, description });
    return res.status(400).json({ 
      message: "Missing required fields", 
      missingFields: {
        Date: !eventDate,
        Venue: !Venue,
        Time: !Time,
        Participants: !Participants,
        description: !description
      }
    });
  }

  try {
    console.log("Creating new event with data:", { eventDate, Venue, Time, Participants, description });
    
    // Parse Participants as a number
    const participantsNumber = Number(Participants);
    if (isNaN(participantsNumber)) {
      return res.status(400).json({ 
        message: "Participants must be a number", 
        receivedParticipants: Participants
      });
    }
    
    // Create a new event with the provided data
    const newEvent = new Event({
      Date: eventDate, // Use the date string directly, Mongoose will handle the conversion
      Venue,
      Time,
      Participants: participantsNumber,
      description,
    });

    console.log("Event object created:", newEvent);
    
    // Save the event to the database
    const savedEvent = await newEvent.save();
    console.log("Event saved successfully:", savedEvent);
    
    return res.status(201).json({ message: "Event added", newEvent: savedEvent });
  } catch (err) {
    console.error("Error adding event:", err);
    console.error("Error stack:", err.stack);
    
    // Check for specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to add event", 
      error: err.message,
      errorType: err.name
    });
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
