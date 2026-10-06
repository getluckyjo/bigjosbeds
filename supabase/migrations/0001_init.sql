-- Big Jo's Beds: orders and enquiries.
-- The website talks to these tables only from the server, with the service-role key.
-- Row level security is on with no policies, so the public (anon) key can read or write nothing.

create type order_status as enum ('pending_payment', 'paid', 'cancelled', 'failed', 'needs_review');

create table public.orders (
  id                 uuid primary key default gen_random_uuid(),
  reference          text not null unique,
  status_token       text not null,
  status             order_status not null default 'pending_payment',
  commerce_mode      text not null check (commerce_mode in ('sandbox', 'live')),
  item_id            text not null,
  item_name          text not null,
  finish_id          text not null,
  finish_name        text not null,
  quantity           integer not null check (quantity between 1 and 10),
  unit_price_cents   integer not null check (unit_price_cents >= 0),
  delivery_fee_cents integer not null default 0 check (delivery_fee_cents >= 0),
  total_cents        integer not null check (total_cents >= 0),
  first_name         text not null,
  last_name          text not null,
  email              text not null,
  phone              text not null,
  street             text not null,
  suburb             text not null,
  postal_code        text not null,
  city               text not null,
  notes              text,
  payfast_payment_id text,
  review_reasons     text[],
  itn_payload        jsonb,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  paid_at            timestamptz
);

create index orders_status_created_idx on public.orders (status, created_at desc);

create table public.enquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  area       text not null,
  finish     text not null check (finish in ('flax', 'charcoal', 'unsure')),
  message    text not null,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger orders_touch_updated_at before update on public.orders
for each row execute function public.touch_updated_at();

alter table public.orders enable row level security;
alter table public.enquiries enable row level security;

-- Handy view for the owner in the Supabase table editor: paid orders waiting to be made.
create view public.orders_to_make with (security_invoker = true) as
  select reference, paid_at, item_name, finish_name, quantity, total_cents / 100.0 as total_rand,
         first_name || ' ' || last_name as customer, phone, email,
         street || ', ' || suburb || ', ' || city || ' ' || postal_code as address, notes
  from public.orders
  where status = 'paid' and commerce_mode = 'live'
  order by paid_at;
