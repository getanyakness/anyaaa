# Anja Kurija — Design Portfolio Site

## Purpose

A one-page personal portfolio for Anja Kurija, a student applying to graphic
design college. Showcases existing commercial design work (logos, posters,
social media graphics) and provides a contact point. Hosted on GitHub Pages
at `getanyakness/anyaaa`.

## Stack

Plain HTML/CSS/JS. No framework, no build step, no dependencies — GitHub
Pages serves the repo root of `main` directly.

- `index.html`
- `style.css`
- `script.js`
- `images/` — renamed copies of source files from `podaci/` (originals in
  `podaci/` are left untouched)

## Content inventory

Source images live in `podaci/`. Mapping to portfolio categories:

**Logos**
- `logo.png` — JEJK (podcast)
- `logo scandicar as.jpg` — ScandiCar AS
- `nebeska kafana logo.png` — Nebeska Kafana
- `elitee modelss siva.jpg`, `elitee modeless crna.jpg` — Elitee Modelss, shown together as one project with grey/black background variants

**Posters & Flyers**
- `poster 1.jpg` — Harmonika Live event poster
- `cene.jpg` — Fat Boys Detailing price list
- `elitee modeless bela.jpg` — elite_english7 tutoring price list (file name doesn't match its content — verified by opening the file, it shows the elite_english7 CJENOVNIK card, not a logo)
- `rad 3.webp` — elite_english7 payment info card (PayPal), pairs with the item above as a 2-part set
- `trening reklama.webp` — gym training ad
- `trening before after.webp` — training before/after results graphic

**Social Media**
- `thumbnail miki.jpg` — "Chill Livestream" YouTube thumbnail
- `thumbnail miki 2.jpg` — "Ukrali smo LED trake" YouTube thumbnail
- `edit slike.png` — portrait photo edit (graffiti background)
- `IMG_6519.jpg` / `IMG_E6519.jpg` — portrait photo edit, before/after pair
- `IMG_6524.jpg` / `IMG_E6524.jpg` — portrait photo edit, before/after pair (same style as the 6519 pair)

**Not used as portfolio grid items**
- `linkovi.txt` — 9 Instagram reel/post URLs, used only in the Instagram section (see below), not rendered as images

## Page structure (single scroll page)

1. **Nav** (fixed top): wordmark/name, anchor links to Radovi/Work, Instagram,
   O meni/About, Kontakt/Contact, and a HR/EN language toggle button.

2. **Hero**: full-viewport section with Anja's name, a short tagline
   ("Studentica dizajna" / "Design Student"), a subtle CSS-only animated
   background (e.g. slow gradient shift — no JS/canvas library), and a
   scroll-down indicator.

3. **Work grid**: filter tabs — Sve/All, Logotipi/Logos, Posteri i
   Fleri/Posters & Flyers, Društvene mreže/Social Media. Vanilla JS toggles
   visibility by `data-category` attribute; active tab gets an animated
   underline. Each grid item is an image card; on hover it scales up
   slightly and shows an overlay with title + category. Clicking an item
   opens a plain-JS lightbox (full-size image overlay, closable via click
   or Esc).

4. **Instagram section**: heading linking to `instagram.com/designanyaftp`,
   plus a row of "more work" links pointing to the 9 URLs in `linkovi.txt`
   (open in new tab, `rel="noopener"`).

5. **About**: bio block containing the explicit placeholder text
   `[Anja: napiši kratki opis o sebi ovde / write a short bio about yourself here]`
   — not written in her voice, left for her to fill in.

6. **Footer/contact**: email `kurja@gmail.com` as a `mailto:` link,
   Instagram icon linking to `designanyaftp`, copyright line.

## Visual style

- Dark theme: black/dark-grey background tones, light-grey/white type, one
  accent color used sparingly for hover/active states.
- "Futuristic" feel via typography and motion rather than 3D/WebGL: sharp
  sans-serif headings, thin dividing lines, subtle glow/gradient accents.
- Motion: `IntersectionObserver`-driven scroll-reveal fade-ins on sections
  and grid items; hover-lift + shadow on work cards; animated underline on
  active filter tab; smooth-scroll for nav anchors.
- Fully responsive: grid collapses to fewer columns on narrower viewports;
  nav collapses to a simple stacked/hamburger layout on mobile.

## Language toggle

- One JS dictionary object keyed by short IDs (`nav.work`, `hero.tagline`,
  etc.), with `hr` and `en` values.
- Elements carry `data-i18n="key"`; a single function swaps `textContent`
  for all matching elements when the toggle is clicked.
- Choice persisted in `localStorage`, applied on page load (default: hr).
- Image content is not translated (filenames/text inside images stay as-is
  — translating raster artwork isn't feasible).

## Explicitly out of scope

No CMS, no build tooling, no analytics, no contact form (mailto is
sufficient), no multi-page routing, no image upload pipeline. These can be
added later if the site outgrows a single static page.

## Implementation note

Actual coding will be delegated to Codex (per user request), with review of
its output before considering the work complete.
