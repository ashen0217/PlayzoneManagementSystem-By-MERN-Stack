const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  generateReport,
} = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getBookings);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/report', generateReport);

module.exports = router;