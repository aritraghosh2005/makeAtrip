const supabase = require('../config/supabase');

async function getBookingHistoryByUser(userId) {
    return await supabase
        .from('booking_history_view')
        .select('*')
        .eq('user_id', userId)
        .order('booking_time', { ascending: false });
}

module.exports = { getBookingHistoryByUser };
