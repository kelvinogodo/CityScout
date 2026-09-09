# CityScout Realtors

A full-stack real estate website for **CityScout Realtors**, a property agency operating in Abakaliki, Ebonyi State, Nigeria. Visitors can browse and filter property listings and read agency blog posts, while a password-protected admin dashboard lets staff manage all listings and posts without touching code.

Live domain: [cityscoutrealtors.com](https://cityscoutrealtors.com)

## Features

### Public site
- Landing page with hero/search section and featured properties
- Property listings with client-side filtering by location, price, or description ([pages/index.js](pages/index.js))
- Individual property detail pages (`/Properties/[id]`)
- Blog with a featured post carousel and category listing (`/Blog`, `/Post/[id]`)
- About, Service, and Contact pages, with the contact form sending mail via EmailJS
- SEO metadata per page plus auto-generated `sitemap.xml` / `robots.txt` on every build ([next-sitemap.js](next-sitemap.js))

### Admin dashboard
- Simple login gate (`/Admin`) backed by a MongoDB `Admin` collection
- Overview stats (post count, property count) at `/Dashboard`
- Create, edit, and delete blog posts using a TipTap rich-text editor, with SEO title/meta/alt fields
- Create, edit, and delete property listings (price, location, description, type, and three images)
- Direct-to-Cloudinary image uploads for both posts and property photos

## Tech stack

| Layer | Tools |
|---|---|
| Framework | [Next.js 12](https://nextjs.org/) (Pages Router), React 18 |
| Database | MongoDB via [Mongoose](https://mongoosejs.com/) |
| Media storage | [Cloudinary](https://cloudinary.com/) (unsigned upload), [Multer](https://github.com/expressjs/multer) |
| Rich text | [TipTap](https://tiptap.dev/) |
| Email | [EmailJS](https://www.emailjs.com/) |
| UI/animation | Framer Motion, AOS, Swiper, SweetAlert2, React Icons |
| SEO | [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) |
| Tooling | ESLint (`eslint-config-next`), pnpm |

## Project structure

```
pages/
  index.js               # Home page — listings + blog preview
  Properties.jsx          Properties/[id]/index.jsx   # Property listing & detail
  Blog.jsx                 Post/[id]/index.jsx         # Blog listing & detail
  About.jsx  Service.jsx  Contact.jsx
  Admin.jsx               # Admin login
  Dashboard.jsx           # Admin dashboard shell
  api/
    login.js  adminLogin.js  createAdmin.js
    properties/  posts/       # REST-style CRUD endpoints
    createProperty.js  editProperty.js  deleteProperty.js
    createPost.js      editPost.js      deletePost.js
    upload.js  uploadPropertyImages.js
components/               # Shared UI (cards, header/footer, dashboard widgets, TipTap editor, etc.)
models/                   # Mongoose schemas: Property, Post, Admin
utils/connectMongo.js     # Mongo connection helper
public/                   # Static assets & property/blog images
```

## Getting started

### Prerequisites
- Node.js 16+ and [pnpm](https://pnpm.io/)
- A MongoDB connection string (e.g. from MongoDB Atlas)

### Setup

```bash
pnpm install
```

Create a `.env` file in the project root:

```env
MONGO_URI=your-mongodb-connection-string
API_URL=http://localhost:3000
```

> Cloudinary uploads use a hardcoded cloud name and unsigned upload preset in [components/Overview.jsx](components/Overview.jsx) — update these to point at your own Cloudinary account before deploying.

Run the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build   # also runs `next-sitemap` via the postbuild script
pnpm start
```

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/login`, `/api/adminLogin` | POST | Admin authentication |
| `/api/createAdmin` | POST | Create an admin account |
| `/api/properties`, `/api/properties/[id]` | GET | List / fetch a property |
| `/api/createProperty`, `/api/editProperty`, `/api/deleteProperty` | POST | Manage properties |
| `/api/posts`, `/api/posts/[id]` | GET | List / fetch a blog post |
| `/api/createPost`, `/api/editPost`, `/api/deletePost` | POST | Manage blog posts |
| `/api/upload`, `/api/uploadPropertyImages` | POST | Server-side upload handling (Multer) |

## Deployment

Deployed for production on [Vercel](https://vercel.com/). Set `MONGO_URI` and `API_URL` as environment variables in the Vercel project settings — `next-sitemap` will regenerate the sitemap on every build using the `siteUrl` configured in [next-sitemap.js](next-sitemap.js).

## License

ISC
