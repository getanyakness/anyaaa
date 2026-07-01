# Anja Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Exception for this plan:** per explicit user instruction, the actual coding for every task below is to be written by Codex (via the `codex` CLI runtime), not by a Claude subagent. Each task is scoped so it can be handed to Codex as a self-contained prompt; the orchestrating agent reviews Codex's diff against the task's steps and verification before moving to the next task.

**Goal:** Build a static, dependency-free one-page portfolio site (`index.html`, `style.css`, `script.js`, `images/`) for Anja Kurija, deployable as-is on GitHub Pages from `main`.

**Architecture:** Plain HTML/CSS/JS, no build step. `script.js` holds a single work-items data array, renders the grid, wires up category filtering, a lightbox, and an HR/EN language toggle backed by a text dictionary. `style.css` implements the dark/futuristic theme and all animation via CSS transitions + `IntersectionObserver`.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (ES6+). No frameworks, no npm packages, no build tooling.

## Global Constraints

- No dependencies, no build step — must run by opening `index.html` directly or via GitHub Pages static hosting. (spec: Stack)
- Default language on load is Croatian (`hr`); toggle switches to English (`en`); choice persisted via `localStorage`. (spec: Language toggle)
- Image artwork itself is never translated or edited — only surrounding site text. (spec: Language toggle)
- Categories are exactly: All/Sve, Logos/Logotipi, Posters & Flyers/Posteri i Fleri, Social Media/Društvene mreže. (spec: Work grid)
- Contact email is `kurja@gmail.com` (mailto link); Instagram handle is `designanyaftp`. (spec: Footer/contact)
- About section bio must contain the literal placeholder text `[Anja: napiši kratki opis o sebi ovde / write a short bio about yourself here]` — do not write bio copy in her voice. (spec: About)
- Source files in `podaci/` are never modified or deleted — only copied into `images/` under new names. (spec: Stack)

---

### Task 1: Image assets — copy and rename into `images/`

**Files:**
- Create: `images/` (directory, 19 files copied from `podaci/`)

**Interfaces:**
- Produces: the exact filenames below, which Task 3's data array references directly.

- [ ] **Step 1: Create the images directory and copy files with new names**

```bash
mkdir -p images
cp "podaci/logo.png" "images/logo-jejk.png"
cp "podaci/logo scandicar as.jpg" "images/logo-scandicar.jpg"
cp "podaci/nebeska kafana logo.png" "images/logo-nebeska-kafana.png"
cp "podaci/elitee modelss siva.jpg" "images/logo-elitee-modelss-grey.jpg"
cp "podaci/elitee modeless crna.jpg" "images/logo-elitee-modelss-black.jpg"
cp "podaci/poster 1.jpg" "images/poster-harmonika-live.jpg"
cp "podaci/cene.jpg" "images/poster-fatboys-cenovnik.jpg"
cp "podaci/elitee modeless bela.jpg" "images/poster-elite-english-cenovnik.jpg"
cp "podaci/rad 3.webp" "images/poster-elite-english-payment.webp"
cp "podaci/trening reklama.webp" "images/poster-trening-reklama.webp"
cp "podaci/trening before after.webp" "images/poster-trening-before-after.webp"
cp "podaci/thumbnail miki.jpg" "images/social-thumbnail-chill-livestream.jpg"
cp "podaci/thumbnail miki 2.jpg" "images/social-thumbnail-led-trake.jpg"
cp "podaci/edit slike.png" "images/social-photo-edit-1.png"
cp "podaci/IMG_6519.jpg" "images/social-photo-edit-2-before.jpg"
cp "podaci/IMG_E6519.jpg" "images/social-photo-edit-2-after.jpg"
cp "podaci/IMG_6524.jpg" "images/social-photo-edit-3-before.jpg"
cp "podaci/IMG_E6524.jpg" "images/social-photo-edit-3-after.jpg"
```

- [ ] **Step 2: Verify all 18 files are present**

Run: `ls images/ | wc -l`
Expected: `18`

Run: `ls images/`
Expected: the 18 filenames listed in Step 1's `cp` destinations, nothing else.

- [ ] **Step 3: Commit**

```bash
git add images/
git commit -m "Add renamed portfolio image assets"
```

---

### Task 2: HTML skeleton

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: element IDs/classes that Tasks 3–6 attach behavior and styles to:
  - `<nav>` with `id="site-nav"`, containing anchor links with `href="#work"`, `href="#instagram"`, `href="#about"`, `href="#contact"`, and a button `id="lang-toggle"`
  - `<section id="hero">`
  - `<section id="work">` containing a tab bar `<div id="filter-tabs">` and a grid container `<div id="work-grid">` (empty — populated by `script.js`)
  - `<section id="instagram">` containing `<div id="instagram-links">` (empty — populated by `script.js`)
  - `<section id="about">` containing `<p id="bio-text">`
  - `<footer id="contact">`
  - Every translatable text node wrapped in a tag carrying `data-i18n="<key>"` (keys defined in Task 6)
  - `<script src="script.js" defer></script>` at the end of `<body>`
  - `<link rel="stylesheet" href="style.css">` in `<head>`

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Anja Kurija — Portfolio</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<nav id="site-nav">
  <span class="nav-name">Anja Kurija</span>
  <div class="nav-links">
    <a href="#work" data-i18n="nav.work">Radovi</a>
    <a href="#instagram" data-i18n="nav.instagram">Instagram</a>
    <a href="#about" data-i18n="nav.about">O meni</a>
    <a href="#contact" data-i18n="nav.contact">Kontakt</a>
  </div>
  <button id="lang-toggle" type="button">EN</button>
</nav>

<section id="hero">
  <h1>Anja Kurija</h1>
  <p data-i18n="hero.tagline">Studentica dizajna</p>
  <a href="#work" class="scroll-cue" aria-label="Scroll to work">&#8595;</a>
</section>

<section id="work">
  <h2 data-i18n="work.heading">Radovi</h2>
  <div id="filter-tabs">
    <button class="filter-tab active" data-category="all" data-i18n="filter.all">Sve</button>
    <button class="filter-tab" data-category="logos" data-i18n="filter.logos">Logotipi</button>
    <button class="filter-tab" data-category="posters" data-i18n="filter.posters">Posteri i Fleri</button>
    <button class="filter-tab" data-category="social" data-i18n="filter.social">Društvene mreže</button>
  </div>
  <div id="work-grid"></div>
</section>

<section id="instagram">
  <h2 data-i18n="instagram.heading">Instagram</h2>
  <p>
    <a href="https://www.instagram.com/designanyaftp" target="_blank" rel="noopener">@designanyaftp</a>
  </p>
  <div id="instagram-links"></div>
</section>

<section id="about">
  <h2 data-i18n="about.heading">O meni</h2>
  <p id="bio-text">[Anja: napiši kratki opis o sebi ovde / write a short bio about yourself here]</p>
</section>

<footer id="contact">
  <a href="mailto:kurja@gmail.com">kurja@gmail.com</a>
  <a href="https://www.instagram.com/designanyaftp" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
  <p class="copyright">&copy; 2026 Anja Kurija</p>
</footer>

<script src="script.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verify structure**

Run: `grep -c 'id="work-grid"\|id="filter-tabs"\|id="instagram-links"\|id="bio-text"\|id="lang-toggle"' index.html`
Expected: `5`

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add HTML skeleton for portfolio page"
```

---

### Task 3: Work data + grid rendering + category filter

**Files:**
- Create: `script.js`

**Interfaces:**
- Consumes: `#work-grid` and `.filter-tab` elements from Task 2.
- Produces: `workItems` array (each item: `{ src, alt, category }`, `category` one of `"logos" | "posters" | "social"`), `renderWorkGrid(items)` function, click-delegated filter handling. Task 4 (lightbox) attaches a click listener to `#work-grid` that reads `event.target.dataset.src` and `event.target.alt`. Task 6 (i18n) is appended to the same file without touching this section.

- [ ] **Step 1: Write the data array and render/filter logic in `script.js`**

```js
const workItems = [
  { src: "images/logo-jejk.png", alt: "JEJK logo", category: "logos" },
  { src: "images/logo-scandicar.jpg", alt: "ScandiCar AS logo", category: "logos" },
  { src: "images/logo-nebeska-kafana.png", alt: "Nebeska Kafana logo", category: "logos" },
  { src: "images/logo-elitee-modelss-grey.jpg", alt: "Elitee Modelss logo (grey)", category: "logos" },
  { src: "images/logo-elitee-modelss-black.jpg", alt: "Elitee Modelss logo (black)", category: "logos" },
  { src: "images/poster-harmonika-live.jpg", alt: "Harmonika Live event poster", category: "posters" },
  { src: "images/poster-fatboys-cenovnik.jpg", alt: "Fat Boys Detailing price list", category: "posters" },
  { src: "images/poster-elite-english-cenovnik.jpg", alt: "Elite English price list", category: "posters" },
  { src: "images/poster-elite-english-payment.webp", alt: "Elite English payment info", category: "posters" },
  { src: "images/poster-trening-reklama.webp", alt: "Gym training ad", category: "posters" },
  { src: "images/poster-trening-before-after.webp", alt: "Training before/after results", category: "posters" },
  { src: "images/social-thumbnail-chill-livestream.jpg", alt: "Chill Livestream YouTube thumbnail", category: "social" },
  { src: "images/social-thumbnail-led-trake.jpg", alt: "Ukrali smo LED trake YouTube thumbnail", category: "social" },
  { src: "images/social-photo-edit-1.png", alt: "Portrait photo edit", category: "social" },
  { src: "images/social-photo-edit-2-before.jpg", alt: "Portrait photo edit, before", category: "social" },
  { src: "images/social-photo-edit-2-after.jpg", alt: "Portrait photo edit, after", category: "social" },
  { src: "images/social-photo-edit-3-before.jpg", alt: "Portrait photo edit, before", category: "social" },
  { src: "images/social-photo-edit-3-after.jpg", alt: "Portrait photo edit, after", category: "social" },
];

function renderWorkGrid(items) {
  const grid = document.getElementById("work-grid");
  grid.innerHTML = "";
  items.forEach((item) => {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.className = "work-card";
    img.dataset.category = item.category;
    img.dataset.src = item.src;
    grid.appendChild(img);
  });
}

function applyFilter(category) {
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === category);
  });
  const filtered = category === "all"
    ? workItems
    : workItems.filter((item) => item.category === category);
  renderWorkGrid(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  renderWorkGrid(workItems);
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => applyFilter(tab.dataset.category));
  });
});
```

- [ ] **Step 2: Verify syntax**

Run: `node --check script.js`
Expected: no output, exit code 0.

- [ ] **Step 3: Verify data count matches Task 1's assets**

Run: `node -e "const s=require('fs').readFileSync('script.js','utf8'); const m=s.match(/src: \"images\//g); console.log(m.length)"`
Expected: `18`

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "Add work data, grid rendering, and category filter"
```

---

### Task 4: Lightbox

**Files:**
- Modify: `script.js` (append)
- Modify: `index.html:` add lightbox markup before `</body>`, after the `<script>` tag's preceding content (i.e. just before the `<script>` line)

**Interfaces:**
- Consumes: `.work-card` elements' `data-src` and `alt` attributes (Task 3).
- Produces: `#lightbox` overlay element with `#lightbox-img`; no new globals consumed by later tasks.

- [ ] **Step 1: Add lightbox markup to `index.html`**

Insert immediately before the `<script src="script.js" defer></script>` line:

```html
<div id="lightbox" class="hidden">
  <img id="lightbox-img" src="" alt="">
  <button id="lightbox-close" type="button" aria-label="Close">&times;</button>
</div>
```

- [ ] **Step 2: Append lightbox behavior to `script.js`**

```js
function openLightbox(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  img.alt = alt;
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  document.getElementById("lightbox").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("work-grid").addEventListener("click", (event) => {
    if (event.target.classList.contains("work-card")) {
      openLightbox(event.target.dataset.src, event.target.alt);
    }
  });
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", (event) => {
    if (event.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
});
```

- [ ] **Step 3: Verify syntax**

Run: `node --check script.js`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add index.html script.js
git commit -m "Add image lightbox for work grid"
```

---

### Task 5: Instagram links section

**Files:**
- Modify: `script.js` (append)

**Interfaces:**
- Consumes: none.
- Produces: populates `#instagram-links` (Task 2) with anchor tags; no exports consumed elsewhere.

- [ ] **Step 1: Append Instagram link rendering to `script.js`**

```js
const instagramLinks = [
  "https://www.instagram.com/reel/DUD4hx6Ald7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DScEDhjALoK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/DQkLpdyAIbb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/DFEK_Z1CO8w/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/C6FJObMI86r/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/C7CbcdpNznm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/C5er-8GISwH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/p/C580uUhIScY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
];

function renderInstagramLinks() {
  const container = document.getElementById("instagram-links");
  instagramLinks.forEach((url, index) => {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "instagram-link-card";
    a.textContent = `#${index + 1}`;
    container.appendChild(a);
  });
}

document.addEventListener("DOMContentLoaded", renderInstagramLinks);
```

Note: `linkovi.txt` lists 9 URLs but line 6 duplicates line 5 (`C6FJObMI86r` appears twice) — this list has the duplicate removed, leaving 8 unique links.

- [ ] **Step 2: Verify syntax and link count**

Run: `node --check script.js`
Expected: no output, exit code 0.

Run: `node -e "const s=require('fs').readFileSync('script.js','utf8'); const m=s.match(/instagram\.com\/(reel|p)\//g); console.log(m.length)"`
Expected: `8`

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Add Instagram links section"
```

---

### Task 6: Language toggle (HR/EN)

**Files:**
- Modify: `script.js` (append)
- Modify: `index.html:` add remaining `data-i18n` keys not already covered (`work.heading`, `filter.all`, `filter.logos`, `filter.posters`, `filter.social`, `instagram.heading`, `about.heading` — already present from Task 2; no further HTML edit needed)

**Interfaces:**
- Consumes: `#lang-toggle` button and all `[data-i18n]` elements from Task 2.
- Produces: `applyLanguage(lang)` function; persists to `localStorage.getItem("lang")`.

- [ ] **Step 1: Append the dictionary and toggle logic to `script.js`**

```js
const translations = {
  "nav.work": { hr: "Radovi", en: "Work" },
  "nav.instagram": { hr: "Instagram", en: "Instagram" },
  "nav.about": { hr: "O meni", en: "About" },
  "nav.contact": { hr: "Kontakt", en: "Contact" },
  "hero.tagline": { hr: "Studentica dizajna", en: "Design Student" },
  "work.heading": { hr: "Radovi", en: "Work" },
  "filter.all": { hr: "Sve", en: "All" },
  "filter.logos": { hr: "Logotipi", en: "Logos" },
  "filter.posters": { hr: "Posteri i Fleri", en: "Posters & Flyers" },
  "filter.social": { hr: "Društvene mreže", en: "Social Media" },
  "instagram.heading": { hr: "Instagram", en: "Instagram" },
  "about.heading": { hr: "O meni", en: "About" },
};

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[key]) {
      el.textContent = translations[key][lang];
    }
  });
  document.getElementById("lang-toggle").textContent = lang === "hr" ? "EN" : "HR";
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "hr";
  applyLanguage(savedLang);
  document.getElementById("lang-toggle").addEventListener("click", () => {
    const current = localStorage.getItem("lang") || "hr";
    applyLanguage(current === "hr" ? "en" : "hr");
  });
});
```

- [ ] **Step 2: Verify syntax and key coverage**

Run: `node --check script.js`
Expected: no output, exit code 0.

Run: `grep -o 'data-i18n="[a-z.]*"' index.html | sort -u`
Expected: 12 lines, each key matching one of the keys in the `translations` object above (`nav.work`, `nav.instagram`, `nav.about`, `nav.contact`, `hero.tagline`, `work.heading`, `filter.all`, `filter.logos`, `filter.posters`, `filter.social`, `instagram.heading`, `about.heading`).

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Add HR/EN language toggle"
```

---

### Task 7: Dark theme styling + animations

**Files:**
- Create: `style.css`

**Interfaces:**
- Consumes: all element IDs/classes from Tasks 2–6 (`#site-nav`, `#hero`, `#work`, `.filter-tab`, `#work-grid`, `.work-card`, `#instagram`, `.instagram-link-card`, `#about`, `#contact`, `#lightbox`, `#lightbox-img`, `#lightbox-close`, `.hidden`).
- Produces: nothing consumed by later tasks (final task in the visual chain).

- [ ] **Step 1: Write `style.css`**

```css
:root {
  --bg: #0d0d0d;
  --bg-alt: #1a1a1a;
  --text: #f2f2f2;
  --text-dim: #a3a3a3;
  --accent: #7dd3fc;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
}

#site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(6px);
  z-index: 10;
}

.nav-links { display: flex; gap: 1.5rem; }
.nav-links a { color: var(--text); text-decoration: none; }
.nav-links a:hover { color: var(--accent); }

#lang-toggle {
  background: transparent;
  border: 1px solid var(--text-dim);
  color: var(--text);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

#hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(-45deg, #0d0d0d, #1a1a1a, #101820, #0d0d0d);
  background-size: 400% 400%;
  animation: gradient-shift 18s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

#hero h1 { font-size: 3.5rem; margin: 0; }
.scroll-cue { color: var(--text-dim); font-size: 1.5rem; margin-top: 2rem; text-decoration: none; }

#work, #instagram, #about, #contact {
  padding: 5rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

#filter-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-tab {
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 1rem;
  padding: 0.5rem 0;
  cursor: pointer;
  position: relative;
}

.filter-tab.active { color: var(--text); }
.filter-tab.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
}

#work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.work-card {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  background: var(--bg-alt);
}

.work-card:hover {
  transform: scale(1.04);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

#instagram-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.instagram-link-card {
  color: var(--accent);
  border: 1px solid var(--text-dim);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  text-decoration: none;
}

#contact {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  border-top: 1px solid var(--bg-alt);
}

#contact a { color: var(--text); }
.copyright { color: var(--text-dim); font-size: 0.85rem; margin-left: auto; }

#lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

#lightbox.hidden { display: none; }

#lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 6px;
}

#lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  color: var(--text);
  font-size: 2rem;
  cursor: pointer;
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 800px) {
  #work-grid { grid-template-columns: repeat(2, 1fr); }
  #site-nav { flex-direction: column; gap: 0.75rem; align-items: flex-start; }
  .nav-links { flex-direction: column; gap: 0.5rem; }
}

@media (max-width: 500px) {
  #work-grid { grid-template-columns: 1fr; }
  #hero h1 { font-size: 2.2rem; }
}
```

- [ ] **Step 2: Add the lightbox `hidden` default and scroll-reveal wiring to `script.js`**

Append to `script.js`:

```js
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll("#work, #instagram, #about, #contact").forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
});
```

- [ ] **Step 3: Verify syntax**

Run: `node --check script.js`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add style.css script.js
git commit -m "Add dark theme styling, responsive grid, and scroll-reveal animation"
```

---

### Task 8: End-to-end browser verification

**Files:** none (verification only)

**Interfaces:** none.

- [ ] **Step 1: Serve the site locally**

Run: `python3 -m http.server 8000 --directory .` (leave running in background)

- [ ] **Step 2: Open in browser and verify manually (or via Playwright MCP tools)**

Navigate to `http://localhost:8000`. Confirm:
- Hero renders with animated gradient background and name visible
- Clicking each filter tab (Sve/Logotipi/Posteri i Fleri/Društvene mreže) shows only matching images, active tab underlined
- Clicking a work image opens the lightbox with the full image; Escape and the × button close it
- Instagram section shows 8 link cards, each opening the correct URL in a new tab
- About section shows the literal placeholder bio text
- Footer email link is `mailto:kurja@gmail.com`; Instagram footer link goes to `instagram.com/designanyaftp`
- Clicking `EN` in the nav switches all `data-i18n` text to English and the button label flips to `HR`; reloading the page keeps the chosen language (localStorage persistence)
- Resizing the viewport to mobile width (375px) collapses the grid to a single column and stacks the nav into a vertical layout

- [ ] **Step 3: Fix any discrepancies found, then stop the local server**

Run: `kill %1` (or Ctrl+C the foreground server process)

- [ ] **Step 4: Final commit if any fixes were made**

```bash
git add -A
git commit -m "Fix issues found during end-to-end browser verification"
```

(Skip this step if Step 2 found no issues.)
