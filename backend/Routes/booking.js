const express = require('express');
const router = express.Router();
const {
  addBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getByID
} = require('../Controllers/bookingController');

const bookingModel = require("../Model/BookingModel");

router.post('/', addBooking);
router.get('/', getAllBookings);
router.get('/:id', getByID);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);


module.exports = router;