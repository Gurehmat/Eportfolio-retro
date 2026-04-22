# Gurehmat Chahal - Portfolio

A retro-inspired, terminal-themed personal portfolio built to showcase projects, technical skills, and experience in a clean single-page experience.

**Live Website:** [https://gurehmat.dev](https://gurehmat.dev)  
**Alt Link:** [https://gurehmat.github.io/Eportfolio-retro/](https://gurehmat.github.io/Eportfolio-retro/)

---

## About This Project

This portfolio is designed to feel like an interactive developer terminal while staying fast, accessible, and easy to maintain.

It highlights:
- personal branding and profile summary
- selected project work with modal deep-dives
- downloadable resume and embedded resume section
- contact links (GitHub, LinkedIn, email)

---

## Features

- **Terminal-style UI** with modern, responsive layout
- **Dark/light theme toggle** persisted via `localStorage`, with system-preference fallback
- **Smooth reveal animations** and section fade-ins using `IntersectionObserver`
- **Typewriter intro effect** that respects `prefers-reduced-motion`
- **Keyboard-accessible project modals** (open, close, Escape handling, backdrop click)
- **Scroll progress bar** and active-section nav highlighting
- **Childhood photo pixel-toggle interaction** in the about section
- **SEO + social metadata** (Open Graph, Twitter cards, JSON-LD structured data)

---

## Tech Stack

- **HTML5** (semantic structure)
- **CSS3** (`css/styles.css`, custom properties, responsive breakpoints)
- **Vanilla JavaScript** (`js/main.js`, no framework or build pipeline)
- **Static hosting** (GitHub Pages + custom domain)

---

## Project Structure

```text
Eportfolio-retro/
|-- index.html            # Main single-page portfolio
|-- css/
|   `-- styles.css        # Global styling, themes, layout, effects
|-- js/
|   `-- main.js           # Interactions, theme, modals, reveal logic
|-- assets/               # Images, icons, resume PDF, media
|-- site.webmanifest      # PWA/web app metadata
|-- sitemap.xml           # Search indexing metadata
|-- robots.txt            # Crawler directives
|-- CNAME                 # Custom domain for GitHub Pages
`-- README.md
```

---

## Run Locally

No build step is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/Gurehmat/Eportfolio-retro.git
   cd Eportfolio-retro
   ```
2. Serve with any static server:
   ```bash
   npx serve .
   ```
   or
   ```bash
   python -m http.server 8000
   ```
3. Open the local URL shown in your terminal.

You can also open `index.html` directly in a browser for quick preview.

---

## Customize It

- **Profile text and sections:** edit `index.html`
- **Colors, spacing, typography, component styles:** edit `css/styles.css`
- **Theme toggle, animations, modals, nav behavior:** edit `js/main.js`
- **Images/icons/resume file:** replace files in `assets/` and update references if names change
- **Domain and deployment metadata:** update `CNAME`, `site.webmanifest`, `sitemap.xml`, `robots.txt`

---

## Accessibility Notes

- Respects reduced-motion preferences for animated effects
- Uses semantic headings/sections and descriptive alt text
- Supports keyboard interaction for project cards/modals

---

## Deployment

This site is deployed as a static site using GitHub Pages and a custom domain.

If deploying your own fork:
1. Push to your GitHub repository
2. Enable GitHub Pages in repository settings
3. (Optional) Configure custom domain via `CNAME`

---

## Contact

- **GitHub:** [https://github.com/Gurehmat](https://github.com/Gurehmat)
- **LinkedIn:** [https://www.linkedin.com/in/gurehmat-chahal-24696020b/](https://www.linkedin.com/in/gurehmat-chahal-24696020b/)
- **Email:** [mailto:gurehmat9@gmail.com](mailto:gurehmat9@gmail.com)

---

## License

This project is for personal portfolio use.  
If you want to reuse parts of it, please reach out first.
