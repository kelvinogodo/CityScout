-- Listing details buyers ask about, plus draft/published status.
-- Run in the Supabase Dashboard: SQL Editor -> New query -> paste -> Run.
-- Existing rows keep working: every new column is nullable or has a default.

alter table public.properties
  add column if not exists listing_status text not null default 'for_sale'
    check (listing_status in ('for_sale', 'for_rent')),
  add column if not exists bedrooms smallint check (bedrooms >= 0),
  add column if not exists bathrooms smallint check (bathrooms >= 0),
  add column if not exists land_size_sqm numeric check (land_size_sqm > 0),
  add column if not exists title_document text
    check (title_document in (
      'c_of_o', 'deed_of_assignment', 'survey_plan', 'governors_consent', 'other'
    )),
  add column if not exists price_negotiable boolean not null default false,
  add column if not exists is_published boolean not null default true;

alter table public.posts
  add column if not exists is_published boolean not null default true;

-- Public visitors only see published rows. Signed-in admins already see
-- everything through the existing "authenticated users manage ..." policies.
drop policy if exists "properties are publicly readable" on public.properties;
create policy "published properties are publicly readable"
  on public.properties for select
  to anon
  using (is_published);

drop policy if exists "posts are publicly readable" on public.posts;
create policy "published posts are publicly readable"
  on public.posts for select
  to anon
  using (is_published);
