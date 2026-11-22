# Effa's portfolio: build guide for Claude Code

This repo is Effa binte Ashfaq's personal portfolio ("a walk through the haveli"). Effa is a GRC and blue team security professional in Islamabad. She is new to web development, so explain what you do in plain words, keep commands copy-pasteable, and ask before anything destructive.

## Sources of truth (read these first)
1. `docs/portfolio-content.md` — every approved word on the site. Do not invent, reword or add copy. Missing facts stay out (never placeholders like "[YOUR TEXT]" on the live site).
2. `docs/portfolio-design-brief.md` — look, structure, rooms, usability rules. If it disagrees with the content doc, the content doc wins.
3. `reference/mockup/*.dc.html` — the approved mockups from the design canvas. `Journey.dc.html` is the full scroll page and the main reference: reuse its inline SVG scenes, layout, colours and section structure. Its placeholder text (anything in [brackets]) and any copy that conflicts with the content doc must not be used. These files use a canvas template syntax (`<x-dc>`, `{{...}}`, `<sc-for>`); treat them as visual reference and lift the SVG and CSS, do not ship the template code.
4. `docs/writeups/*.md` — the three finished writeups, Effa's own words. Do not edit their text.

## Stack
- Astro (static output), TypeScript off unless needed, no UI framework.
- Plain CSS with custom properties for the palette (mustard, mint, pine green, wildflower pink, deep ink blue, warm paper). Fonts: Cormorant Garamond (display), Karla (body), Noto Nastaliq Urdu (Urdu), self-hosted via @fontsource packages.
- Content collections: `src/content/writeups/` (Markdown with frontmatter: title, date, tag, excerpt, coverColor), and data files in `src/data/` for papers, degrees, experience, community, certifications, cves, projects (YAML or JSON).
- Markdown: render tables, images and Mermaid code blocks (render Mermaid to SVG at build time, e.g. rehype-mermaid, so no heavy JS ships). Writeup headings bold and in palette colours (h2 and h3 alternate colours).
- Tiny vanilla JS only for: sticky room bar highlight, mirror-wall hover/tap, library shelf, chinar transitions, reduce-motion button, "View as list" toggles, certificate large views.
- Deploy target: Vercel, static. Add `vercel.json` with security headers (Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors none).

## Pages
- `/` — the scroll journey: Courtyard (hero) → Study → Veranda → Corridor → Workshop → Library → Ending → rug footer.
- `/writeups/<slug>/` — one page per writeup, styled like book pages, with a back link to the Library.
- Every room has "View as list": a plain, accessible list version of that room's content.
- Sticky top bar on every page: room links, highlight for the current room, CV download one click away.

## The chinar leaf "autumn breeze" transition (Effa's favourite, make it lovely)
Updated 22 Nov 2026 at Effa's request (replaces the earlier "under 1 second, inside the threshold" rule):
- When the visitor scrolls into a threshold, a slow full-screen gust plays once: soft mist rolls across and about 16 flat SVG chinar leaves (five-lobed, mustard, rust, amber, pink, pine) blow across the whole screen in swirls and loops, then the mist clears to reveal the next room as it rises in. About 3 to 4 seconds.
- Once per threshold (IntersectionObserver), CSS transforms/opacity only, pointer-events none: it never blocks scrolling or clicks.
- Off when the visitor's device asks for reduced motion, and a "Reduce motion" button in the top bar turns it (and the room rise-in) off or on, remembered per device. Built in `src/components/Gust.astro` and `src/scripts/motion.ts`.
- Each threshold also has the patchwork strip inspired by Effa's geometric painting (see mockup).

## Hero specifics
- Name "Effa binte Ashfaq", then a small monospace line directly under it: `aka 3FFYP4CK` (her stage name).
- Then "Security Researcher & GRC Analyst", the approved intro paragraph, and the Now line.

## Quality bar
- Accessible: real links and buttons, alt text on images, decorative SVG `aria-hidden`, text contrast at least 4.5:1, keyboard and tap work for hover features.
- Works on a phone: wide scenes scroll sideways by swipe, shelf wraps, nothing overflows.
- Fast: badges and certificate images converted to WebP and sized for display; SVG optimised; Lighthouse 90+ on all four scores.
- No analytics or trackers unless Effa asks.
- No em dashes in any new UI text you write (Effa's preference).

## Assets
- `assets/badges/` and `assets/certificates/` — PNGs named by cert (see the Corridor table in the content doc). Convert to WebP into `public/` or use Astro's image pipeline.
- `assets/figures/lattice-two-keys.svg` — figure for the lattice writeup (the writeup text says .png; point it at the SVG).
- `assets/cv/Effa_binte_Ashfaq_CV.pdf` — Effa's current CV (22 Nov 2026). Every "Download CV" link points here.
- `assets/figures/mcs-postcard.svg` and `mcs-emblem.png` — the MCS postcard front and its stamp.

## Working style with Effa
- Build in small steps and show progress with `npm run dev` (http://localhost:4321) after each step.
- Commit after each working step with a clear message. Do not push or deploy until Effa says so.
- When something needs her input (a missing link, a picture), list it at the end of your message rather than guessing.

## Suggested order
1. Scaffold Astro, fonts, palette, base layout with sticky bar and rug footer.
2. Content files from the content doc; writeup collection with the three writeups.
3. Hero and Study, then Veranda, Corridor (mirror wall), Workshop, Library (shelf + covers), Ending.
4. Chinar transitions and room rise-in.
5. "View as list" versions, phone layout pass, accessibility pass.
6. Writeup pages (Mermaid, tables, colourful headings).
7. vercel.json headers, image optimisation, Lighthouse check. Then hand over to Effa for review before deploy.
