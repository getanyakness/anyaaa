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
