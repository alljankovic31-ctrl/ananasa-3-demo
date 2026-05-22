-- Run this once in Supabase SQL Editor after creating an Auth user for the admin.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

grant select on table public.events to authenticated;
grant select on table public.venue_tables to authenticated;
grant select, update on table public.reservations to authenticated;
grant select, update on table public.guest_list_entries to authenticated;
grant select, update on table public.vip_inquiries to authenticated;

drop policy if exists "Admins can read reservations" on public.reservations;
create policy "Admins can read reservations"
on public.reservations
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update reservations" on public.reservations;
create policy "Admins can update reservations"
on public.reservations
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can read guest list" on public.guest_list_entries;
create policy "Admins can read guest list"
on public.guest_list_entries
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update guest list" on public.guest_list_entries;
create policy "Admins can update guest list"
on public.guest_list_entries
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can read vip inquiries" on public.vip_inquiries;
create policy "Admins can read vip inquiries"
on public.vip_inquiries
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update vip inquiries" on public.vip_inquiries;
create policy "Admins can update vip inquiries"
on public.vip_inquiries
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Replace the email below with the Auth user email that should open admin.html.
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'your-admin@email.com'
on conflict (user_id) do nothing;
