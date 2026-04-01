# Confidence

Personal brand website for Confidence Molade, built with Next.js, React, TypeScript, and Sanity.

The site includes:

- a custom homepage with editorial sections and motion-heavy storytelling
- a pillars experience with a desktop cover flow and mobile card stack
- a blog powered by local fallback content and optional Sanity content
- a contact form API route backed by Nodemailer/SMTP
- an embedded Sanity Studio at `/studio`

## Stack

- Next.js 16
- React 19
- TypeScript
- Sanity + `next-sanity`
- Nodemailer
- GSAP
- `@ashishgogula/coverflow`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env.local
```

3. Fill in the values in `.env.local`.

4. Start the development server:

```bash
npm run dev
```

5. Open `http://localhost:3000`

## Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a build.

```bash
npm run brand:check
```

Runs the local brand system check script.

```bash
npm run brand:verify
```

Runs the brand check and then builds the app.

## Environment Variables

The project expects the following values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your-google-app-password
CONTACT_FROM_EMAIL=yourgmail@gmail.com
CONTACT_TO_EMAIL=achodoconfidence@gmail.com
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-01
NEXT_PUBLIC_SANITY_STUDIO_URL=/studio
```

Notes:

- `SMTP_*` and `CONTACT_*` power the contact form API route at `app/api/contact/route.ts`.
- the Sanity variables are optional if you only want to use the local fallback blog content
- if Sanity is configured, published posts are fetched through `sanity/lib/client.ts`

## Content Model

Blog content is designed to work in two modes:

1. Local fallback content from `lib/blog.ts`
2. Published Sanity content from `sanity/lib/queries.ts`

This makes the app usable even when Sanity credentials are not present.

## Project Structure

```text
app/
  api/contact/route.ts        Contact form API
  blog/                       Blog index and post routes
  pillars/                    Pillar pages and data
  studio/                     Embedded Sanity Studio
  home-page-client.tsx        Homepage client experience
components/
  site-navbar.tsx
  site-footer.tsx
  ui/
lib/
  blog.ts                     Blog data + fetch helpers
  utils.ts
sanity/
  lib/                        Client + queries
  schemaTypes/                Sanity schema definitions
public/
  about/
  brand/
  pillars/
  works/
```

## Homepage Notes

The homepage is assembled in `app/home-page-client.tsx`.

Important sections include:

- hero
- about
- seven pillars
- philosophy
- works
- blog preview
- contact CTA/footer

Most of the visual system lives in:

- `app/globals.css`
- `app/hero.module.css`

## Contact Form

The contact form route:

- validates input on the server
- maps inquiry purposes to friendly labels
- sends email through Nodemailer using the configured SMTP credentials
- falls back to a user-facing error message if email delivery is not configured

See `app/api/contact/route.ts`.

## Sanity Studio

The embedded studio route lives at:

- `/studio`

Schema files are in:

- `sanity/schemaTypes/index.ts`
- `sanity/schemaTypes/postType.ts`

## Deployment Notes

Before deploying:

1. make sure `.env.local` values are set in your hosting environment
2. run `npm run brand:verify`
3. confirm SMTP credentials are valid if the contact form should be live
4. confirm Sanity project ID, dataset, and API version are correct if Studio/blog sync is expected

## Status

This repository is an actively edited marketing site and content platform, so layout, imagery, and homepage storytelling sections may change frequently.
