const Booking = require('../Model/Booking');

// GET all bookings
const getAllBookings = async (req, res) => {
  try {
    // Retrieve all bookings and sort by date (newest first)
    const bookings = await Booking.find().sort({ date: -1 });
    
    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }
    
    return res.status(200).json({ 
      success: true,
      count: bookings.length,
      message: "Bookings fetched successfully", 
      bookings 
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server error while fetching bookings", 
      error: err.message 
    });
  }
};

// POST create new booking
const addBooking = async (req, res) => {
  try {
    const { username, email, packageType, date, timeSlot, message } = req.body;
    
    // Validate required fields
    if (!username || !email || !packageType || !date || !timeSlot) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields", 
        missingFields: {
          username: !username,
          email: !email,
          packageType: !packageType,
          date: !date,
          timeSlot: !timeSlot
        }
      });
    }

    // Create a new booking with the provided data
    const newBooking = new Booking({
      username,
      email,
      packageType,
      date,
      timeSlot,
      message: message || 'Pending' // Default to 'Pending' if not provided
    });
    
    // Save the booking to the database
    const savedBooking = await newBooking.save();
    
    return res.status(201).json({ 
      success: true,
      message: "Booking added successfully", 
      booking: savedBooking 
    });
  } catch (err) {
    console.error("Error adding booking:", err);
    
    // Check for specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: "Validation error", 
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: "Failed to add booking", 
      error: err.message
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