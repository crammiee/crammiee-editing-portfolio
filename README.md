# Professional Video Editing Portfolio Monorepo

- apps/web: Next.js (SSG) frontend
- apps/cms: Strapi headless CMS

Responsibilities:
- Strapi is the canonical source of truth for Clients, VideoEntry, Testimonial.
- Next.js fetches published content at build time; no client-only duplication.
- Webhooks trigger rebuilds for no-code updates.

Conventions:
- Strict TypeScript, ESLint, Zod parsing at boundaries.
- SSR-safe modules; no reliance on browser APIs in shared code.
