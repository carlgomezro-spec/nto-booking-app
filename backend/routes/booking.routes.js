const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.midleware");

router.get('/', authMiddleware, adminMiddleware, bookingController.getAllBookings); // solo admin puede listar todos
router.get('/:id', authMiddleware, bookingController.getBookingById); // usuario normal puede ver su booking
// GET /api/bookings/tattoo/:id
router.get('/tattoo/:id', authMiddleware, bookingController.getBookingsByTattoo);
router.post('/', authMiddleware, bookingController.createBooking); // cualquiera logueado puede crear
router.put('/:id', authMiddleware, bookingController.updateBookingDateTime); // propietario o admin (opcional)


router.delete('/:id', authMiddleware, adminMiddleware, bookingController.deleteBooking); // solo admin puede borrar
/**
 * @openapi
 * tags:
 *   name: Bookings
 *   description: Gestión de reservas
 */

/**
 * @openapi
 * /api/bookings:
 *   get:
 *     tags: [Bookings]
 *     summary: Obtener todas las reservas (solo admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 */

/**
 * @openapi
 * /api/bookings/{id}:
 *   get:
 *     tags: [Bookings]
 *     summary: Obtener una reserva por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: No existe
 */

/**
 * @openapi
 * /api/bookings/tattoo/{id}:
 *   get:
 *     tags: [Bookings]
 *     summary: Obtener reservas hechas para un tatuaje
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de reservas para ese tatuaje
 */

/**
 * @openapi
 * /api/bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Crear reserva (usuario logueado)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tattooId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Reserva creada
 */

/**
 * @openapi
 * /api/bookings/{id}:
 *   put:
 *     tags: [Bookings]
 *     summary: Actualizar fecha/hora de reserva
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Reserva actualizada
 */

/**
 * @openapi
 * /api/bookings/{id}:
 *   delete:
 *     tags: [Bookings]
 *     summary: Eliminar una reserva (solo admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Reserva eliminada
 */

module.exports = router;
