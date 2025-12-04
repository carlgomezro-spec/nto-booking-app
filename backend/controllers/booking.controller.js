const Booking = require('../models/booking.model');

module.exports = {
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.getAll();
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const booking = await Booking.getById(req.params.id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createBooking: async (req, res) => {
    try {
      const newBooking = await Booking.create(req.body);
      res.status(201).json(newBooking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateBooking: async (req, res) => {
    try {
      const updatedBooking = await Booking.update(req.params.id, req.body);
      if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
      res.json(updatedBooking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const deletedBooking = await Booking.delete(req.params.id);
      if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
      res.json(deletedBooking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
