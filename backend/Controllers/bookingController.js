const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { userId, packageId, packageName, date, timeSlot } = req.body;
    const booking = new Booking({ userId, packageId, packageName, date, timeSlot });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};

exports.generateReport = async (req, res) => {
  try {
    const { startDate, endDate, packageId } = req.query;
    const query = {};
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (packageId) query.packageId = packageId;
    const bookings = await Booking.find(query);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
};