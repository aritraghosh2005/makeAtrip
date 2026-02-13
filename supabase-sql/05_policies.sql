

alter table if exists users_profile enable row level security;
alter table if exists bookings enable row level security;
alter table if exists rides enable row level security;
alter table if exists events enable row level security;



drop policy if exists "Users can view own profile" on users_profile;
create policy "Users can view own profile"
on users_profile
for select
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on users_profile;
create policy "Users can update own profile"
on users_profile
for update
using (auth.uid() = id);



drop policy if exists "Users can view own bookings" on bookings;
create policy "Users can view own bookings"
on bookings
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own bookings" on bookings;
create policy "Users can insert own bookings"
on bookings
for insert
with check (auth.uid() = user_id);



drop policy if exists "Users can view own rides" on rides;
create policy "Users can view own rides"
on rides
for select
using (
  exists (
    select 1 from bookings
    where bookings.id = rides.booking_id
    and bookings.user_id = auth.uid()
  )
);



drop policy if exists "Anyone can view events" on events;
create policy "Anyone can view events"
on events
for select
using (true);



drop policy if exists "Service role full access bookings" on bookings;
create policy "Service role full access bookings"
on bookings
for all
using (auth.role() = 'service_role');

drop policy if exists "Service role full access rides" on rides;
create policy "Service role full access rides"
on rides
for all
using (auth.role() = 'service_role');
