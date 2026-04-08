-- ROLLBACK: Undo the tour_id migration
-- Run this in Supabase SQL Editor if you need to revert

-- 1. Restore the original booking_history_view
DROP VIEW IF EXISTS public.booking_history_view;

CREATE VIEW public.booking_history_view AS
SELECT
  b.id as booking_id,
  b.user_id,
  e.title as event_title,
  e.venue,
  e.event_date,
  b.booking_status,
  r.ride_type,
  r.ride_status,
  b.created_at as booking_time
FROM
  bookings b
  LEFT JOIN events e ON b.event_id = e.id
  LEFT JOIN rides r ON r.booking_id = b.id;

-- 2. Remove the tour_id column added to bookings
ALTER TABLE public.bookings DROP COLUMN IF EXISTS tour_id;
