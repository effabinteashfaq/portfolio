# A walk through the haveli

The portfolio of **Effa binte Ashfaq**, a GRC and blue team security professional in Islamabad.

**Live site: [effabinteashfaq.vercel.app](https://effabinteashfaq.vercel.app/)**

The site is one long scroll through a haveli. Each room holds part of the story:

| Room | What's inside |
|---|---|
| Courtyard | Who I am and what I'm doing now |
| Study | Degrees, papers and research interests |
| Veranda | Work experience and community |
| Corridor | Certifications and CVE credits on a mirror wall |
| Workshop | Skills and the tools I've built |
| Library | Writeups, bound like books |
| Beyond the Screen | Paintings, mountains and parathas |

Between rooms, a gust of chinar leaves blows across the screen. A **Reduce motion** button in the top bar turns it off, and it also stays off if your device asks for reduced motion. Every room also has a plain **View as list** version.

## Built with

- [Astro](https://astro.build/) static output, with no UI framework and very little JavaScript
- Plain CSS with custom properties, self-hosted fonts (Cormorant Garamond, Karla and a small subset of Noto Nastaliq Urdu)
- Content collections: writeups in Markdown, everything else in YAML under `src/data/`
- Mermaid diagrams rendered to SVG at build time, so no diagram library ships to the browser
- Hand-drawn inline SVG scenes, optimised with SVGO; images converted to WebP
- Hosted on Vercel

## Security and quality

As a security person, I wanted the site to practise what it preaches:

- A strict **Content Security Policy** with no inline scripts and no third-party origins, plus HSTS, `nosniff`, a strict Referrer-Policy, a locked-down Permissions-Policy, `frame-ancestors 'none'` and COOP. See [`vercel.json`](vercel.json).
- **No analytics, trackers, cookies or external requests.**
- Checked with axe-core for accessibility. Lighthouse scores 97 to 100 in every category on phone and desktop.
- Keyboard and tap friendly, text contrast of at least 4.5:1, and decorative art hidden from screen readers.

## Run it locally

You need Node 22.23.4 or newer (see `engines` in package.json).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
```

## Project layout

```
src/
  components/rooms/   one component per room
  content/writeups/   the Library's writeups (Markdown)
  data/               papers, experience, certifications, CVEs, projects (YAML)
  scenes/             the SVG scenes for each room
  scripts/motion.ts   the chinar breeze, room rise-in and Reduce motion
  plugins/            rehype plugins (table wrappers, cached Mermaid SVGs)
assets/               badges, certificates, figures and the CV
scripts/              build helpers (asset copy, Mermaid render, Urdu font subset)
```

## Licence

The **code** is MIT licensed, so you're welcome to learn from it or borrow it. The **content** (my writing, artwork, certificates, CV and personal details) is all rights reserved. See [LICENSE](LICENSE).

## Contact

[LinkedIn](https://www.linkedin.com/in/effa-binte-ashfaq) · [effabinteashfaq@gmail.com](mailto:effabinteashfaq@gmail.com)
