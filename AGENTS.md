<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Portfolio Project Guide

## Product Intent

This is Hafis Muhammed's minimal AI-engineer portfolio. The visual language is called **Monolith Editorial**: restrained, technical, monochrome, and precise. Preserve the established composition and content unless the user explicitly requests a redesign.

The site should feel like one continuous digital system rather than a set of disconnected pages. Motion must remain subtle, reversible, scroll-controlled, and secondary to readability.

## Runtime and Dependencies

- Next.js `16.3.3`, App Router
- React and React DOM `19.2.8`
- JavaScript only; no TypeScript
- CSS Modules plus shared tokens in `app/globals.css`; no Tailwind
- GSAP `3.15.x` with ScrollTrigger
- Lenis `1.3.x`
- Geist for display typography and Inter for body copy

Available commands:

```powershell
npm run dev
npm run build
npm run start
```

Always run `npm run build` after code or styling changes.

## Next.js 16 Requirement

Before changing Next.js APIs, routing, metadata, images, fonts, server/client boundaries, or configuration, read the relevant guide under `node_modules/next/dist/docs/`. Do not rely on older Next.js conventions.

Keep static content in Server Components. Isolate browser APIs, hooks, and pointer interaction in the smallest practical Client Component with `'use client'`.

## Design System

Core tokens currently live in `app/globals.css`:

- Primary background: `#FAFAFA`
- Primary text: `#1F1F1F`
- Secondary text: `#707070`
- Border: `#E5E5E5`
- Dark sections: `#202020`
- Light-on-dark text: `#FAFAFA`
- Container maximum: `1440px`
- Desktop side margin: `clamp(64px, 6.5vw, 96px)`
- Mobile side margin: `16px`
- Navbar height: `80px`
- Mobile breakpoint: `768px`

Visual rules:

- Preserve the monochrome palette.
- Use 1px hairline borders and sharp rectangular controls.
- Avoid decorative border radii. Circles are allowed only for intentional system markers, orbit nodes, and dots.
- Display headings are bold, uppercase, tightly tracked Geist.
- Labels are small, uppercase, and letter-spaced.
- Body copy uses Inter and stays quiet relative to headings.
- Avoid gradients unless the user explicitly asks for one. Edge masks on project images are the existing exception.
- Avoid flashy effects, bright colors, glassmorphism, gaming aesthetics, and generic template styling.

## Page Composition

`app/page.js` renders this order:

1. `ScrollTransitions`
2. `Hero`
3. `RadialProjects`
4. `About`
5. `Experience`
6. `TechBlueprint`
7. `Contact`
8. `Footer`

`app/layout.js` owns the fixed `Navbar` and wraps page content with `SmoothScroll`.

## Component Responsibilities

- `components/Navbar.jsx` — fixed, transparent navigation using `mix-blend-mode: difference` so its text adapts over light and dark sections.
- `components/SmoothScroll.jsx` — the only Lenis instance and the only shared GSAP ticker integration.
- `components/ScrollTransitions.jsx` — reversible section-to-section GSAP timelines.
- `components/Hero.jsx` — hero copy, bottom scroll/location labels, and technical visual composition.
- `components/HeroTechnicalVisual.jsx` — technical SVG, terminal, orbit, grid, flow paths, nodes, pointer parallax, and hero scroll response.
- `components/RadialProjects.jsx` — pinned desktop project sequence and vertical mobile fallback.
- `components/About.jsx` — editorial biography section.
- `components/Experience.jsx` — experience rows.
- `components/TechBlueprint.jsx` — five expandable technology cards with hover on desktop and click/keyboard behavior elsewhere.
- `components/Contact.jsx` — full-viewport dark contact call-to-action.
- `components/ContactDotField.jsx` — isolated client-side pointer tracking for the Contact dot matrix.
- `components/Footer.jsx` — dark footer continuing the Contact background.
- `lib/data.js` — source of truth for projects, experience, and technology-card content.

Each section's layout and appearance belong in its matching `.module.css` file. Cross-section orchestration belongs in `ScrollTransitions.jsx`, not scattered across section stylesheets.

## Current Project Data

The portfolio intentionally contains exactly three projects:

1. Voice AI Agent
2. License Plate Recognition
3. Multi-Agent Workflows

Do not add a fourth project unless the user explicitly requests one. Titles, descriptions, technologies, GitHub links, image paths, experience entries, and technical-card content must be edited in `lib/data.js`.

Current project artwork:

- `/images/voice-ai-agent-generated.webp`
- `/images/license-plate-generated.webp`
- `/images/multi-agent-generated.webp`

Use `next/image` for project artwork and preserve accurate `alt` text and responsive `sizes`.

## Lenis and GSAP Integration

Lenis and GSAP share one animation loop:

1. `SmoothScroll.jsx` creates Lenis with `autoRaf: false`.
2. Lenis emits scroll events to `ScrollTrigger.update`.
3. `gsap.ticker` calls `lenis.raf(time * 1000)`.
4. GSAP lag smoothing is disabled because Lenis provides the smoothing.

Critical constraints:

- Never create a second Lenis instance.
- Never add a second persistent RAF loop.
- Never use CSS scroll-driven animations.
- All scroll-controlled motion must use GSAP ScrollTrigger.
- Always use `scrub: true`, never numeric scrub, because Lenis already handles smoothing.
- Never call `requestAnimationFrame` from a ScrollTrigger callback.
- `ContactDotField.jsx` may schedule a single native-scroll RAF solely to recalculate cursor coordinates after layout movement; it is not an animation loop and must stay cancellable.
- Clean up tickers, event listeners, GSAP contexts, timelines, ScrollTriggers, media queries, and pending RAF callbacks on unmount.

## Section Transition Choreography

Desktop directions are intentional:

- Hero → Work: Work enters from the right.
- Project 01 → 02: incoming content comes from the lower-right.
- Project 02 → 03: incoming content comes from the left.
- Projects → About: About enters from below.
- About → Experience: Experience enters from the right.
- Experience → Technical Blueprint: Blueprint enters from the lower-left.
- Technical Blueprint → Contact: Contact uses a restrained zoom plus opposing title/button vertical movement.

Transition rules:

- Old and new content temporarily coexist.
- Do not use `display`, `visibility`, or instant swaps for active desktop transitions.
- Use transform and opacity only where possible.
- Keep movement controlled; technical parallax usually stays within 2–15px.
- Scrolling backward must reverse every timeline cleanly.
- Do not add aggressive snap behavior.

## Radial Projects

Desktop:

- `RadialProjects.jsx` pins only the project viewport.
- Scroll progress drives orbit rotation, active node, counter, content, and image transitions from one synchronized timeline.
- Direct DOM writes are used for per-frame orbit positioning; do not introduce React state updates on scroll.
- Project info and image layers use opacity and transform. Do not restore `visibility` toggles.
- The project image must emerge from its corresponding orbit-node origin.

Mobile and reduced motion:

- At `768px` and below, use the vertical card layout.
- With `prefers-reduced-motion: reduce`, show all three projects vertically and disable pinning/rotation.

## Contact and Footer

- Contact must fill at least one viewport: `100vh` with `100svh` enhancement.
- Contact and Footer form one continuous `#202020` field. Do not restore a white footer.
- Contact content zooms subtly into place through the shared ScrollTrigger timeline.
- The decorative background is an ordered dot matrix only—no random dots, crosses, streaks, stars, or colorful particles.
- The base grid and hover grid must share the same parent movement and identical `background-size`/position. Hover may brighten existing dots but must never create a second dot beside them.
- Cursor coordinates must stay correct while Lenis scrolls under a stationary mouse.
- Keep the area behind the headline and CTA visually quiet.
- On touch devices, do not require hover.
- In reduced-motion mode, stop the dot-grid drift and complex scroll motion.

## Navbar and Development Indicator

- The Navbar stays fixed and transparent; do not add an opaque strip or bottom divider unless requested.
- Its difference blending is intentional for automatic light/dark text contrast.
- Do not re-add the floating circular `N` control that was removed from `Hero.jsx`.
- The circular `N` that can appear at the bottom-left during `next dev` is Next.js development UI, not part of the production website.

## Accessibility

- Preserve semantic section headings and `aria-labelledby` relationships.
- Decorative visuals must use `aria-hidden="true"` or an appropriate non-interactive role.
- Interactive project layers must keep `inert` and `aria-hidden` synchronized with the active project.
- External links use `target="_blank"` with `rel="noopener noreferrer"`.
- Maintain visible keyboard focus styles.
- Tech Blueprint cards must remain operable by click and keyboard; hover is an enhancement only.
- Respect `prefers-reduced-motion: reduce` everywhere.

## Performance

- Prefer transforms and opacity; do not animate layout properties such as top, left, width, or height.
- Avoid React state updates on scroll or pointer frames.
- Use direct DOM style updates or GSAP quick setters for high-frequency visual interaction.
- Keep pointer displacement subtle and avoid expensive filters over full-screen layers.
- Preserve `overflow-x: hidden` and verify that transforms do not introduce horizontal overflow.
- Do not duplicate animation ownership: a property should have one controlling system for a given interaction.

## Verification Checklist

After a change, verify as applicable:

- `npm run build` succeeds.
- Desktop scroll down and back up remain reversible.
- Slow, fast, and stopped-midway scrolling do not jump or flicker.
- The pinned carousel enters, advances through exactly three projects, and releases correctly.
- Resize does not leave stale ScrollTrigger measurements.
- Mobile has no horizontal overflow and does not require hover.
- Reduced-motion mode exposes all content immediately.
- Navbar remains legible over both backgrounds.
- Contact fills the screen, Footer stays dark, and hover dots do not duplicate.
- GitHub, LinkedIn, email, and project links are valid.
