<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Portfolio Project Context

## Stack
- **Framework**: Next.js 16.3 (App Router, JavaScript, no TypeScript, no Tailwind)
- **Smooth Scroll**: Lenis (`lenis` package) — initialized in `components/SmoothScroll.jsx`
- **Animations**: GSAP + ScrollTrigger — used for the radial project carousel pinning
- **Fonts**: Geist (display/headlines), Inter (body) via Google Fonts CDN
- **Styling**: CSS Modules (`.module.css` per component) + global design tokens in `app/globals.css`

## Design System: "Monolith Editorial"
- Monochrome palette: `#F9F9F9` bg, `#222222` text, `#EAEAEA` borders
- 0px border-radius everywhere (sharp corners)
- 1px hairline borders
- Typography: uppercase labels (Geist 600), tight-tracked display headings
- Container max-width: 1280px

## Architecture
- `app/layout.js` — Root layout, wraps everything in `<SmoothScroll>`, includes `<Navbar>`
- `app/page.js` — Composes all sections: Hero → RadialProjects → About → Experience → TechBlueprint → Contact → Footer
- `components/` — One `.jsx` + one `.module.css` per section
- `lib/data.js` — All content (projects, experience, technologies)
- `public/images/` — Project screenshots (project-01.webp through project-04.webp)

## Critical Integration: Lenis ↔ GSAP
Lenis and GSAP share a single RAF loop. The pattern is:
1. `SmoothScroll.jsx` initializes Lenis and hooks it to `gsap.ticker`
2. Lenis fires `scroll` events → `ScrollTrigger.update`
3. `RadialProjects.jsx` creates a ScrollTrigger with `scrub: true` (1:1 sync, no extra smoothing)
4. **Do NOT add `requestAnimationFrame` inside ScrollTrigger callbacks** — GSAP ticker already runs on RAF

## Rules
- All scroll animations must use GSAP ScrollTrigger, NOT CSS scroll-driven animations
- Do NOT use `scrub: <number>` with Lenis — use `scrub: true` for immediate sync (Lenis handles the smoothing)
- Mobile breakpoint: 768px — radial carousel falls back to vertical card layout
- Always use `'use client'` for components that access `window` or use hooks
- Project images are referenced as `/images/project-XX.webp` in `lib/data.js`

