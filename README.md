# IHS Website

Stack: Astro + React islands + Tailwind CSS + Framer Motion.

## Commands
- `npm install`
- `npm run dev`
- `npm run build`

## Folders
- `src/pages` – routes (.astro files)
- `src/layouts` – page layouts
- `src/components` – static Astro components (`ui`, `sections`)
- `src/islands` – React components (interactive, animated)
- `src/styles` – global CSS (Tailwind import)
- `src/data` – content and site data
- `src/lib`, `src/hooks`, `src/types` – helpers, hooks, types
- `public` – static files (images, fonts)

## Standards

### Typography (done)
- Font: **Figtree** only. Defined in `src/styles/typography.css`.
- Scale (desktop): H1 65/75 (500, 1px spacing, capitalize) · H2 40/50 (600) · H3 20/30 (400) · Paragraph 17/25.5 · Body 16/24 · Nav 18 · Button 14 (500, uppercase, 1px spacing).
- Mobile sizes: not set yet.
- Extra tokens: `text-lead`, `text-body-lg`, `text-nav`, `text-button`.

### Frontend design guide
- Saved in `docs/frontend-design.md`. Follow it when we start the design.

### Colors and header (done)
- Brand tokens in `src/styles/theme.css`: Mars copper `#C96F3A`, light copper `#E4A269`, deep rust `#8F4222`, ink `#000`.
- Header: `src/components/sections/Header.astro`, content in `src/data/navigation.ts`.
- Sizes (desktop): top bar 37px · main bar 101.2px (total 138.2px) · logo 240px wide · container 1200px · nav 16px, items 40px tall, 15px gap · buttons 40px tall, 50px radius.
- Logo file needed at `public/images/Logo.png`.

### Hero (done)
- `src/islands/Hero.tsx` (React + Framer Motion), content in `src/data/hero.ts`.
- Video: `public/videos/hero.mp4` (H.264, 2.6 MB), poster: `public/images/hero-poster.jpg`.
- Full screen (100svh). Entrance animation, word hover color, button hover fill + arrow, scroll parallax. Respects reduced-motion.

### What We Do (done)
- `src/islands/WhatWeDo.tsx`, content in `src/data/whatWeDo.ts`.
- Big 16:9 looping video (`public/videos/what-we-do.mp4`, 11s, 2.6 MB) with live captions.
- Timeline joined under the video. It follows the video as it plays; click a step to jump to that moment.
- Source clips are in `references/` (not used by the site).

### About Us (done)
- `src/islands/About.tsx`, content in `src/data/about.ts`. Sits 2nd on the home page (after the hero).
- Card shows a looping video (card stretches to the text height) (`public/videos/about.mp4`, 1.8 MB).

### What We Do (split layout)
- Full-width section, two halves. Left: heading + vertical timeline (64px icons). Right: 50% photo (`/images/about.jpg`, slow zoom), sticky while the timeline scrolls.
- Scrolling effect: each step's line fills as you scroll past it; the step lights up and the video chip shows the current step.
- Content lives in `src/data/whatWeDo.ts`.

### Website showcase (4th section)
- Dark, elite section: laptop + phone mockups built in CSS (no stock images). Not pinned: when the cursor is over the laptop or phone screen, the wheel (or touch swipe) moves that screenshot; at its top/bottom, or anywhere else, the page scrolls normally. A small hint tells visitors to scroll over the screens. Mouse hover tilts the devices and moves a light.
- Images: `public/images/showcase-desktop.jpg` (full-page capture of the Bhalla site, 1600px wide) and `showcase-phone.jpg`. Content in `src/data/showcase.ts`.
- Three glass feature cards with a cursor spotlight; CTA links to `/portfolio`.
- Two websites in the showcase (`sites` in `src/data/showcase.ts`): Bhalla (spine) and The Stem Cell Institute. Small arrows under the devices switch between them; the screenshot and phone page fade to the new site. Add a site by adding one more entry with its 4 images.

### Rankings (5th section)
- Uses the scroll-animation card (`src/components/ui/container-scroll-animation.tsx`, shadcn-style `ui` folder; alias `@/components/ui`).
- Content in `src/data/rankings.ts`. Save the two screenshots from the live site as `public/images/rankings/seo.png` and `overview.png` (live URLs: `/wp-content/uploads/2026/05/SEO.png` and `overview.png`).
