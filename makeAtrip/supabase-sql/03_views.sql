DROP VIEW IF EXISTS public.booking_history_view;

CREATE VIEW public.booking_history_view AS
SELECT
    b.id                              AS booking_id,
    b.user_id,
    COALESCE(t.title, e.title)        AS event_title,
    COALESCE(t.venue, e.venue)        AS venue,
    e.event_date,
    b.booking_status,
    COALESCE(t.price, e.price)        AS price,
    COALESCE(t.city_name, '')         AS city_name,
    COALESCE(t.category, '')          AS category,
    r.ride_type,
    r.ride_status,
    b.created_at                      AS booking_time
FROM bookings b
LEFT JOIN tours t  ON b.tour_id  = t.tours_id
LEFT JOIN events e ON b.event_id = e.id
LEFT JOIN rides r  ON r.booking_id = b.id;


CREATE VIEW public.revenue_per_event_view AS
SELECT
    e.id    AS event_id,
    e.title,
    COUNT(b.id) FILTER (WHERE b.booking_status = 'confirmed') AS confirmed_bookings,
    SUM(e.price) FILTER (WHERE b.booking_status = 'confirmed') AS revenue
FROM events e
LEFT JOIN bookings b ON b.event_id = e.id
GROUP BY e.id, e.title;
