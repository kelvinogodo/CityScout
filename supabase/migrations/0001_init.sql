-- CityScout Realtors — initial schema
-- Run this once in the Supabase Dashboard: SQL Editor -> New query -> paste -> Run.

create extension if not exists "pgcrypto";

-- Shared trigger to keep `updated_at` current on every row update.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- properties ----------------------------------------------------------------

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  description text not null,
  location text not null,
  price numeric not null check (price >= 0),
  type text not null check (type in ('house', 'land')),
  front_view_image text not null,
  side_view_image text not null,
  back_view_image text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger properties_set_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

alter table public.properties enable row level security;

create policy "properties are publicly readable"
  on public.properties for select
  to anon, authenticated
  using (true);

create policy "authenticated users manage properties"
  on public.properties for all
  to authenticated
  using (true)
  with check (true);

-- posts -----------------------------------------------------------------------

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  image text not null,
  author text not null,
  category text not null default 'normal' check (category in ('normal', 'featured')),
  alt text not null,
  seo_title text not null,
  meta text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

create policy "posts are publicly readable"
  on public.posts for select
  to anon, authenticated
  using (true);

create policy "authenticated users manage posts"
  on public.posts for all
  to authenticated
  using (true)
  with check (true);

-- storage: property + post images -------------------------------------------

insert into storage.buckets (id, name, public)
values
  ('property-images', 'property-images', true),
  ('post-images', 'post-images', true)
on conflict (id) do nothing;

create policy "public read access to property images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'property-images');

create policy "authenticated users upload property images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-images');

create policy "authenticated users update property images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'property-images');

create policy "authenticated users delete property images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'property-images');

create policy "public read access to post images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'post-images');

create policy "authenticated users upload post images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-images');

create policy "authenticated users update post images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'post-images');

create policy "authenticated users delete post images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-images');
