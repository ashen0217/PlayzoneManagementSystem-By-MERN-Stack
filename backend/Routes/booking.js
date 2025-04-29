const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  generateReport,
} = require('../Controllers/bookingController');

const bookingModel = require("../Model/Booking");

router.post('/', createBooking);
router.get('/', getBookings);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/report', generateReport);

module.exports = router;