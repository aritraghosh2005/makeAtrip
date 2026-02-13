import { supabase } from '../lib/supabaseClient'

// GET BOOKING HISTORY VIEW
export async function getBookingHistory() {
  return await supabase
    .from('booking_history_view')
    .select('*')
    .order('booking_time', { ascending: false })
}

// OPTIONAL FILTER BY USER
export async function getBookingHistoryByUser(userId) {
  return await supabase
    .from('booking_history_view')
    .select('*')
    .eq('user_id', userId)
    .order('booking_time', { ascending: false })
}
