# Eportfolio-retro

A retro-styled personal portfolio site with a terminal-inspired aesthetic, dark/light mode, and subtle animations.

**Live site:** [gurehmat.github.io/Eportfolio-retro](https://gurehmat.github.io/Eportfolio-retro/)

---

## Project structure

```
Eportfolio-retro/
├── index.html      # Single-page portfolio — hero, work, resume, about, modals
├── about.html      # About — bio, capabilities, childhood photo toggle (legacy)
├── work.html       # Work — project cards (legacy)
├── resume.html     # Resume PDF embed (legacy)
├── css/
│   └── styles.css  # All styles (themes, layout, components)
├── js/
│   └── main.js     # Theme toggle, scroll reveal, typewriter, modals, nav spy
├── assets/         # Images, resume PDF, icons
└── README.md
```

---

## Pages

| Page    | Route        | Description |
|---------|--------------|-------------|
| **Home**    | `index.html` | Hero with avatar & terminal, work grid, resume, about, project modals |
| **About**   | `about.html` | Childhood photo (click to toggle pixelated ↔ normal), capabilities, tools |
| **Work**    | `work.html` | Project cards with thumbnails, stack, and links |
| **Resume**  | `resume.html` | Embedded resume PDF |

---

## Features

- **Dark / light mode** — Toggle in the top bar; choice is saved in `localStorage` and defaults to system preference.
- **Micro-animations** — Hover lift on buttons and cards, gentle float on avatar/childhood photo, scroll-triggered reveals.
- **Typewriter** (Home) — Terminal username types in on load (respects `prefers-reduced-motion`).
- **Project cursor** (Work) — Blinking cursor in each project “prompt” bar.
- **Image toggle** (About) — Click the childhood photo to switch between pixelated and normal versions.
---

## Tech stack

- **HTML** — Semantic markup, no framework.
- **CSS** — Single file (`css/styles.css`): CSS variables for theming, responsive breakpoints, reduced-motion support.
- **JavaScript** — Vanilla JS in `js/main.js`; no build step.

---

## Run locally

Use any static file server. Examples:

- **VS Code:** Install the “Live Server” extension → right‑click `index.html` → **Open with Live Server**.
- **CLI:** From the project root, run `npx serve .` or `python -m http.server 8000`, then open `http://localhost:8000` (or the port shown).

You can also open `index.html` directly in the browser; all current features work without a server.

---

## Customization

| What to change | Where |
|----------------|--------|
| **Colors, spacing, typography** | `css/styles.css` (`:root` and `[data-theme="dark"]` for dark mode) |
| **Theme toggle, scroll reveal, typewriter, modals** | `js/main.js` |
| **Images and resume** | `assets/` (update paths in HTML if you rename files) |
| **Nav links and social icons** | Top bar in each HTML file (`index.html`, `about.html`, `work.html`, `resume.html`) |
