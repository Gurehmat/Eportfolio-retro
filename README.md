## Eportfolio-retro

Retro-styled personal portfolio site.

- **Live site**: `https://gurehmat.github.io/Eportfolio-retro/`

### Pages

- **Home** (`index.html`): hero + explore section + tech stack
- **About** (`about.html`): childhood photo toggle (pixelated ↔ normal) + capabilities/tools
- **Work** (`work.html`): project cards
- **Journal** (`journal.html`): learning journal entries

### Features

- **Dark mode**: toggle in the top bar (persists via `localStorage`, defaults to system preference)
- **Micro-animations**: hover states, subtle ambient motion, scroll reveals
- **Typewriter prompt** (Home): terminal username types in on load
- **Project header cursor** (Work): blinking cursor in each project “prompt”
- **Image toggle** (About): click the childhood photo to switch versions

### Tech

This is a static site built with:

- **HTML + CSS** (single stylesheet: `css/styles.css`)
- **Vanilla JS** (shared script: `js/main.js`)

### Run locally

Any static server works. For example (VS Code):

- Install “Live Server”
- Right click `index.html` → **Open with Live Server**

Or open `index.html` directly in your browser (some features like fetch would require a server, but this site is static).

### Customize

- **Styles**: `css/styles.css`
- **Interactions (dark mode, reveals, typewriter)**: `js/main.js`
- **Images**: `images/`
- **Social links / icons**: top bar in each HTML page

