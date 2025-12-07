const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.midleware");

router.get('/', authMiddleware, adminMiddleware, bookingController.getAllBookings); // solo admin puede listar todos
router.get('/:id', authMiddleware, bookingController.getBookingById); // usuario normal puede ver su booking
router.post('/', authMiddleware, bookingController.createBooking); // cualquiera logueado puede crear
router.put('/:id', authMiddleware, bookingController.updateBookingDateTime); // propietario o admin (opcional)

router.delete('/:id', authMiddleware, adminMiddleware, bookingController.deleteBooking); // solo admin puede borrar

module.exports = router;
