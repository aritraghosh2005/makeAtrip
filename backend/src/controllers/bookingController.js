const supabase = require('../config/supabase');
const { getBookingHistoryByUser } = require('../services/userDataService');

async function getBookings(req, res, next) {
    try {
        if (!req.userId)
            return res.status(401).json({ success: false, error: 'Login required' });

        const { data, error } = await getBookingHistoryByUser(req.userId);
        if (error) return res.status(500).json({ success: false, error: error.message });

        res.json({ success: true, bookings: data });
    } catch (err) {
        next(err);
    }
}

async function createBooking(req, res, next) {
    try {
        if (!req.userId)
            return res.status(401).json({ success: false, error: 'Login required' });

        const { tourId } = req.body;
        if (!tourId)
            return res.status(400).json({ success: false, error: 'tourId is required' });

        const { data, error } = await supabase
            .from('bookings')
            .insert({ user_id: req.userId, tour_id: tourId, booking_status: 'confirmed' })
            .select()
            .single();

        if (error) return res.status(500).json({ success: false, error: error.message });

        res.status(201).json({ success: true, booking: data });
    } catch (err) {
        next(err);
    }
}

async function cancelBooking(req, res, next) {
    try {
        if (!req.userId)
            return res.status(401).json({ success: false, error: 'Login required' });

        const { data, error } = await supabase
            .from('bookings')
            .update({ booking_status: 'cancelled' })
            .eq('id', req.params.id)
            .eq('user_id', req.userId)
            .select();

        if (error) return res.status(500).json({ success: false, error: error.message });
        if (!data?.length) return res.status(404).json({ success: false, error: 'Booking not found' });

        res.json({ success: true, booking: data[0] });
    } catch (err) {
        next(err);
    }
}

module.exports = { getBookings, createBooking, cancelBooking };
