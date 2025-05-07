const express = require('express');
const router = express.Router();
const {
  addBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getBookingsByEmail, // Add this
  getByID
} = require('../Controllers/bookingController');

const bookingModel = require("../Model/Booking");

router.post('/', addBooking);
router.get('/', getAllBookings);
router.get('/:id', getByID);
router.get('/email/:email', getBookingsByEmail); // Add this route
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);


module.exports = router;