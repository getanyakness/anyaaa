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

const instagramPosts = [
  { title: "Poster za dan zaljubljenih", url: "https://www.instagram.com/reel/DUD4hx6Ald7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { title: "Poster za godišnju žurku", url: "https://www.instagram.com/reel/DScEDhjALoK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { title: "Video za party nove godine", url: "https://www.instagram.com/reel/DQkLpdyAIbb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { title: "Poster za prvi nastup", url: "https://www.instagram.com/p/DFEK_Z1CO8w/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { title: "Cover za pjesmu", url: "https://www.instagram.com/p/C6FJObMI86r/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { title: "Thumbnail za video", url: "https://www.instagram.com/p/C7CbcdpNznm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { title: "Thumbnail za live", url: "https://www.instagram.com/p/C5er-8GISwH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { title: "Reklama za story", url: "https://www.instagram.com/p/C580uUhIScY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
];

function renderInstagramPosts() {
  const container = document.getElementById("instagram-embeds");
  instagramPosts.forEach((post) => {
    const card = document.createElement("a");
    card.className = "instagram-post-card";
    card.href = post.url;
    card.target = "_blank";
    card.rel = "noopener";
    card.textContent = post.title;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderInstagramPosts);

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
  "about.bio": {
    hr: "Pozdrav! Ja sam Anja Kurija iz Vukovara i bavim se grafičkim dizajnom, fotografijom te obradom fotografija i videa. Izrađujem logotipe, postere, reklame i thumbnailove, a u radu koristim Adobe Photoshop, Adobe Premiere Pro i Adobe Lightroom. Kreativnost, pažnja prema detaljima i prilagodba željama klijenata temelj su mog rada. Volim isticati boje i stvarati vizuale koji privlače pažnju i ostavljaju snažan dojam. Neprestano istražujem nove tehnike i ideje kako bih svaki projekt doveo do najbolje moguće izvedbe i stvorio radove na koje mogu biti ponosna.",
    en: "Hi! I'm Anja Kurija from Vukovar, Croatia, and I specialize in graphic design, photography, and photo and video editing. I create logos, posters, advertisements, and thumbnails using Adobe Photoshop, Adobe Premiere Pro, and Adobe Lightroom. Creativity, attention to detail, and adapting to each client's vision are at the core of my work. I enjoy using bold colors to create eye-catching visuals that leave a lasting impression. I'm always exploring new techniques and ideas to ensure every project reaches its full potential and reflects the highest quality.",
  },
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

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" }
  );
  document.querySelectorAll("#work, #instagram, #about, #contact").forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
});
