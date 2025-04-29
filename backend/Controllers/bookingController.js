const Booking = require('../Model/Booking');

// GET all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }
    return res.status(200).json({ message: "Bookings fetched", bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST create new booking
const addBooking = async (req, res) => {
  console.log("=== ADD BOOKING CONTROLLER CALLED ===");
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);
  
  // Check if request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("Empty request body");
    return res.status(400).json({ 
      message: "Request body is empty" 
    });
  }
  
  const { username, email, packageType, date, timeSlot, message } = req.body;
  
  // Log each field for debugging
  console.log("Extracted fields:", { 
    username: username, 
    email: email, 
    packageType: packageType, 
    date: date, 
    timeSlot: timeSlot, 
    message: message 
  });
  
  // Validate required fields
  if (!username || !email || !packageType || !date || !timeSlot || !message) {
    console.log("Missing required fields:", { username, email, packageType, date, timeSlot, message });
    return res.status(400).json({ 
      message: "Missing required fields", 
      missingFields: {
        username: !username,
        email: !email,
        packageType: !packageType,
        date: !date,
        timeSlot: !timeSlot,
        message: !message
      }
    });
  }

  try {
    console.log("Creating new booking with data:", { username, email, packageType, date, timeSlot, message });
    
    // Parse Participants as a number
    const participantsNumber = Number(Participants);
    if (isNaN(participantsNumber)) {
      return res.status(400).json({ 
        message: "Participants must be a number", 
        receivedParticipants: Participants
      });
    }
    
    // Create a new booking with the provided data
    const newBooking = new Booking({
      username,
      email,
      packageType,
      date,
      timeSlot,
      message,
    });

    console.log("Booking object created:", newBooking);
    
    // Save the booking to the database
    const savedBooking = await newBooking.save();
    console.log("Booking saved successfully:", savedBooking);
    
    return res.status(201).json({ message: "Booking added", newBooking: savedBooking });
  } catch (err) {
    console.error("Error adding booking:", err);
    console.error("Error stack:", err.stack);
    
    // Check for specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to add booking", 
      error: err.message,
      errorType: err.name
    });
  }
};

// GET single booking by ID
const getByID = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    return res.status(200).json({ message: "Booking found", booking });
  } catch (err) {
    console.error("Error fetching booking by ID:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT update booking by ID
const updateBooking = async (req, res) => {
  const id = req.params.id;
  const {username, email, packageType, date, timeSlot, message } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {username, email, packageType, date, timeSlot, message },
      { new: true }
    );

    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
    return res.status(200).json({ message: "Booking updated", updatedBooking });
  } catch (err) {
    console.error("Error updating booking:", err);
    return res.status(500).json({ message: "Failed to update booking", error: err.message });
  }
};

// DELETE booking by ID 
const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking deleted", deletedBooking });
  } catch (err) {
    console.error("Error deleting booking:", err);
    return res.status(500).json({ message: "Failed to delete booking", error: err.message });
  }
};

module.exports = {
  getAllBookings,
  addBooking,
  getByID,
  updateBooking,
  deleteBooking,
};