const express = require('express');
const router = express.Router();
const {
  addBooking,
  getAllBookings,
  getByID,
  getBookingsByEmail,
  updateBooking,
  adminupdateBooking,
  deleteBooking
} = require('../Controllers/bookingController');

// CREATE
router.post('/', addBooking);

// READ
router.get('/', getAllBookings);
router.get('/email/:email', getBookingsByEmail); // Query by email
router.get('/:id', getByID); // Query by booking ID

// UPDATE
router.put('/:id', updateBooking); // User-level update
router.put('/admin/:id', adminupdateBooking); // Admin-level update

// DELETE
router.delete('/:id', deleteBooking);

module.exports = router;