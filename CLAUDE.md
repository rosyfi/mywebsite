# Rossella's Portfolio — CLAUDE.md

## What this is

Personal portfolio website for Rossella Filocomo — UX/UI Designer with a background in Business Analysis and Software Development. The site showcases her work, bio, and provides a contact channel for potential collaborators or employers.

Live at (TBD — currently in dev).

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | CSS Modules per component, global vars in `globals.css` |
| Theming | `next-themes` (light / dark, no system default) |
| Fonts | Montserrat (Google, body) · Consolas / local Consola (monospace, headings + nav) |
| Icons | Bootstrap Icons (`bi-*` class names) |
| Animation | TypeIt (hero typing effect) |
| Email | Nodemailer via Gmail SMTP (`/api/contact` route) |
| Deployment | (TBD) |

---

## Architecture

The site is a **single-page app** — one URL (`/`), all sections in-page. NavBar smooth-scrolls to section IDs. No routing between pages yet.

```
src/app/
├── layout.tsx          # Root layout: ThemeProvider, NavBar, Footer
├── page.tsx            # Entry: renders <Home /> then <About />
├── globals.css         # CSS custom properties for both themes + global resets
├── page.module.css     # Main container wrapper
│
├── content/
│   ├── Home.tsx        # Hero section (#home) — TypeIt animation, themed illustration, CTA
│   └── About.tsx       # All remaining sections in one file:
│                       #   #about  → bio card + stats bubbles
│                       #   #projects → project cards (Bugly, PackMe)
│                       #   #contact  → contact form (calls /api/contact)
│
├── components/
│   ├── NavBar.tsx      # Sticky nav, smooth scroll, hamburger (mobile), dark toggle
│   ├── Footer.tsx      # Bottom strip
│   ├── Toggle.tsx      # Light/dark switch (uses next-themes)
│   ├── ThemedImage.tsx # Switches between /public/light/*.svg and /public/dark/*.svg
│   └── useIsMobile.tsx # Hook — returns true when viewport < given breakpoint (1024px)
│
└── api/
    └── contact/
        └── route.ts    # POST handler — validates fields, sends email via nodemailer

public/
├── light/              # SVG assets for light theme (girl, logo, mail, mailLine, quotes, recruit)
├── dark/               # Same assets in dark variant
├── fonts/              # CONSOLA.woff2 (local fallback for Consolas)
└── projects/           # Project screenshots (bugly.png, …)
```

---

## Theming

CSS custom properties are defined in `globals.css` under `:root` (light) and `[data-theme="dark"]`. All components consume these vars (`--background`, `--text`, `--accent-pink`, `--accent-olive`, `--border`, `--section-bg`). `ThemedImage` swaps SVG paths based on `resolvedTheme`.

---

## Responsive behaviour

`useIsMobile(1024)` drives layout switches in `NavBar` and `Home`. Below 1024 px:
- NavBar shows a hamburger menu; Toggle moves inside the drawer.
- Home stacks the illustration above the body copy and shows the CTA button inline.

---

## Contact form

Form in `About.tsx` → `POST /api/contact` → Nodemailer (Gmail).

Required env vars (in `.env.local`, never commit):
```
GMAIL_USER=...
GMAIL_APP_PASSWORD=...
RECIPIENT_EMAIL=...
```

---

## Current state (as of 2026-05-04)

### Done
- Hero section with TypeIt animation and themed illustration
- About / bio with stats bubbles (4-in-1, 2 yrs exp, 6 AI skills, 5 languages)
- Projects section — Bugly card (screenshot + description), PackMe card (WIP placeholder)
- Contact form — functional end-to-end (email delivered via Gmail SMTP)
- Light / dark theme — full site, including SVG swaps
- Mobile responsive — hamburger nav, stacked hero layout

### Not done / next up
- Project detail pages (current "View Project →" links go to `#`)
- More projects to add as work is completed (PackMe when ready)
- Deployment + domain setup
- SEO metadata (only placeholder description in `layout.tsx`)
- Possibly: resume/CV download link, skills section

---

## Keeping this file up to date

Update the **Current state** section of this file whenever you complete something noteworthy — a new section built, a feature wired end-to-end, a page added, a bug fixed that changed the architecture, or anything that would mislead a future session if left stale. Move finished items into "Done" and add new "Not done" items as they emerge. You do not need to ask the user first; just update the file as part of wrapping up the task.

---

## Development

```bash
npm run dev     # starts Next.js on localhost:3000 with Turbopack
npm run build   # production build
npm run lint    # ESLint
```

Branches: `main` (production-ready) · `dev` (active development — default working branch).
