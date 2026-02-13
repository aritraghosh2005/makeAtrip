import { supabase } from '../lib/supabaseClient'

// CREATE BOOKING + RIDE (RPC CALL)
export async function createBookingWithRide({
  userId,
  eventId,
  bookingStatus = 'confirmed',
  rideType,
  pickupLocation,
  dropLocation,
  rideStatus = 'scheduled'
}) {
  return await supabase.rpc('create_booking_with_ride', {
    p_user_id: userId,
    p_event_id: eventId,
    p_booking_status: bookingStatus,
    p_ride_type: rideType,
    p_pickup: pickupLocation,
    p_drop: dropLocation,
    p_ride_status: rideStatus
  })
}

// OPTIONAL: GET USER BOOKINGS DIRECTLY
export async function getBookingsByUser(userId) {
  return await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
}
