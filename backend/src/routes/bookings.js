const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const authMiddleware    = require('../middleware/authMiddleware');

// All booking routes require auth
router.use(authMiddleware);

// GET  /api/bookings       — fetch user's booking history
router.get('/',    bookingController.getBookings);

// POST /api/bookings       — create a booking
router.post('/',   bookingController.createBooking);

// DELETE /api/bookings/:id — cancel a booking
router.delete('/:id', bookingController.cancelBooking);

module.exports = router;
