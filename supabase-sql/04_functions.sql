create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users_profile (id)
  values (new.id);
  return new;
end;
$$;
