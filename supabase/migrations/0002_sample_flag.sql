-- Marks illustrative sample content so it can be shown with a "Sample" badge
-- and removed in one step (see scripts/clear-sample.mjs).
-- Run in the Supabase Dashboard: SQL Editor -> New query -> paste -> Run.

alter table public.properties
  add column if not exists is_sample boolean not null default false;

alter table public.posts
  add column if not exists is_sample boolean not null default false;
