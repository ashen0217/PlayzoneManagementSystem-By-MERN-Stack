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
  console.log("=== ADD BOOKING CONTROLLER CALLED ===");
  console.log("Request body:", req.body);
  
  try {
    const { username, email, packageType, date, timeSlot, message } = req.body;
    
    console.log("Extracted booking data:", {
      username,
      email,
      packageType,
      date,
      timeSlot,
      message
    });
    
    // Validate required fields
    if (!username || !email || !packageType || !date || !timeSlot) {
      console.log("Missing required fields:", {
        username: !username,
        email: !email,
        packageType: !packageType,
        date: !date,
        timeSlot: !timeSlot
      });
      
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
    
    console.log("Created booking object:", newBooking);
    
    // Save the booking to the database
    const savedBooking = await newBooking.save();
    console.log("Saved booking:", savedBooking);
    
    return res.status(201).json({ 
      success: true,
      message: "Booking added successfully", 
      booking: savedBooking 
    });
  } catch (err) {
    console.error("Error adding booking:", err);
    console.error("Error stack:", err.stack);
    
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
  const email = req.params.id;
  console.log("Fetching booking by email:", email);

  try {
    const bookings = await Booking.find({ email: email });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this email" });
    }
    return res.status(200).json({ 
      message: "Bookings found", 
      count: bookings.length,
      bookings 
    });
  } catch (err) {
    console.error("Error fetching bookings by email:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT update booking by ID
const updateBooking = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const { 
      packageType,
      date,
      timeSlot,
      specialRequests,
      message 
    } = req.body;

    // Validate required fields
    if (!packageType || !date || !timeSlot) {
      return res.status(400).json({ 
        success: false, 
        error: 'Package type, date, and time slot are required' 
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { 
        packageType,
        date: new Date(date),
        timeSlot,
        specialRequests: specialRequests || '',
        message: message || 'Pending'
      },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({ 
      success: true, 
      data: updatedBooking,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error',
      message: error.message 
    });
  }
};
const adminupdateBooking = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { message: message },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.status(200).json({ 
      success: true, 
      data: updatedBooking,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error',
      message: error.message 
    });
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

// Add this new method for email-based search
const getBookingsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.find({ email }).sort({ date: -1 });
    
    return res.status(200).json({
      success: true,
      count: bookings.length,
      message: bookings.length ? "Bookings found" : "No bookings found for this email",
      bookings
    });
  } catch (err) {
    console.error("Error fetching bookings by email:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
      error: err.message
    });
  }
};

// Update exports at the bottom
module.exports = {
  getAllBookings,
  addBooking,
  getByID,
  getBookingsByEmail, // Add this
  updateBooking,
  deleteBooking,
  adminupdateBooking
};