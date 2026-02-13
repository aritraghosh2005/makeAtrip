create or replace view booking_history_view as
select
  b.id as booking_id,
  b.user_id,
  e.title as event_title,
  e.venue,
  e.event_date,
  b.booking_status,
  r.ride_type,
  r.ride_status,
  b.created_at as booking_time
from bookings b
left join events e on b.event_id = e.id
left join rides r on r.booking_id = b.id;



create or replace view revenue_per_event_view as
select
  e.id as event_id,
  e.title,
  count(b.id) filter (where b.booking_status = 'confirmed') as confirmed_bookings,
  sum(e.price) filter (where b.booking_status = 'confirmed') as revenue
from events e
left join bookings b on b.event_id = e.id
group by e.id, e.title;
