create view public.booking_history_view as
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
from
  bookings b
  left join events e on b.event_id = e.id
  left join rides r on r.booking_id = b.id;


create table public.bookings (
  id uuid not null default gen_random_uuid (),
  user_id uuid null,
  event_id uuid null,
  booking_status text null,
  created_at timestamp without time zone null default now(),
  constraint bookings_pkey primary key (id),
  constraint bookings_event_id_fkey foreign KEY (event_id) references events (id),
  constraint bookings_user_id_fkey foreign KEY (user_id) references users_profile (id)
) TABLESPACE pg_default;

create table public.events (
  id uuid not null default gen_random_uuid (),
  title text null,
  description text null,
  venue text null,
  event_date timestamp without time zone null,
  price numeric null,
  created_at timestamp without time zone null default now(),
  constraint events_pkey primary key (id)
) TABLESPACE pg_default;

create table public.rides (
  id uuid not null default gen_random_uuid (),
  booking_id uuid null,
  ride_type text null,
  pickup_location text null,
  drop_location text null,
  ride_status text null,
  constraint rides_pkey primary key (id),
  constraint rides_booking_id_fkey foreign KEY (booking_id) references bookings (id)
) TABLESPACE pg_default;

create table public.users_profile (
  id uuid not null,
  name text null,
  phone text null,
  created_at timestamp without time zone null default now(),
  constraint users_profile_pkey primary key (id),
  constraint users_profile_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;