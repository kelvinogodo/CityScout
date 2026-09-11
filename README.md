# CityScout Realtors

A full-stack real estate website for **CityScout Realtors**, a property agency operating in Abakaliki, Ebonyi State, Nigeria. Visitors can browse and filter property listings and read agency blog posts, while a Supabase-authenticated admin dashboard lets staff manage all listings and posts without touching code.

Live domain: [cityscoutrealtors.com](https://cityscoutrealtors.com)

## Features

### Public site
- Landing page with a hero carousel and featured properties/posts
- Property listings with real query-param search/filtering by location, type, and price range (`/properties?location=&type=&minPrice=&maxPrice=`)
- Slug-based property and blog post detail pages, each with per-page SEO metadata and Open Graph images
- About, Service, and Contact pages, with the contact form sending mail via EmailJS
- Native `sitemap.xml` / `robots.txt` (Next.js Metadata Routes) covering every property and post

### Admin dashboard (`/admin`)
- Supabase Auth (email + password) — accounts are provisioned directly in the Supabase dashboard; there is no public sign-up
- Overview stats (property/post counts)
- Create, edit, and delete property listings, with images uploaded to Supabase Storage
- Create, edit, and delete blog posts using a TipTap rich-text editor, with SEO title/meta/alt fields
- Every mutation runs as a Server Action that independently verifies the session server-side (not just a route-level redirect)

## Tech stack

| Layer | Tools |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack), React 19 |
| Language | TypeScript |
| Database & Auth | [Supabase](https://supabase.com/) (Postgres, Row Level Security, Auth) |
| Storage | Supabase Storage |
| Styling | Tailwind CSS, hand-rolled shadcn-style UI primitives (Radix + `class-variance-authority`) |
| Rich text | [TipTap](https://tiptap.dev/) |
| Validation | [Zod](https://zod.dev/) |
| Email | [EmailJS](https://www.emailjs.com/) |
| Testing | [Vitest](https://vitest.dev/), React Testing Library |
| CI | GitHub Actions |

## Project structure

```
src/
  app/
    (site)/               # public route group: home, properties, blog, about, service, contact
    admin/
      login/               # Supabase Auth login (Server Action)
      (dashboard)/         # sidebar-shelled admin pages: overview, properties, posts
    sitemap.ts  robots.ts   # native SEO metadata routes
  components/
    ui/                   # shadcn-style primitives (Button, Input, Textarea, Label, Toast)
    site/                 # public-site components (Header, Footer, PropertyCard, etc.)
    admin/                # admin-only components (forms, TipTap editor, sidebar, delete button)
  lib/
    data/                 # Supabase read queries (properties.ts, posts.ts)
    validations/          # Zod schemas for forms
    supabase/             # browser/server/middleware Supabase clients, auth guard, Database types
    site-config.ts        # shared site name/description/URL
  proxy.ts                # Next.js 16's middleware.ts replacement: legacy-URL redirects + admin auth gating
supabase/
  migrations/0001_init.sql # Postgres schema, RLS policies, Storage buckets
```

## Getting started

### Prerequisites
- Node.js 20.9+ and [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) project

### Setup

```bash
pnpm install
```

Create a Supabase project, then run `supabase/migrations/0001_init.sql` in its SQL Editor (Dashboard → SQL Editor → New query → paste → Run). This creates the `properties` and `posts` tables with Row Level Security plus two public Storage buckets for their images.

Create an admin account under Authentication → Users → Add user (toggle "Auto Confirm User" on) — there's no public sign-up route by design.

Create a `.env.local` file in the project root with your project's API keys (Project Settings → API Keys):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

> `SUPABASE_SECRET_KEY` bypasses Row Level Security — keep it server-side only, never prefix it with `NEXT_PUBLIC_`.

Run the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (Next.js picks the next free port if 3000 is taken — check the terminal output).

### Other scripts

```bash
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm test        # Vitest
pnpm build       # production build
```

## Deployment

Deployed for production on [Vercel](https://vercel.com/). Set the three Supabase environment variables above in the Vercel project settings.

## License

ISC
