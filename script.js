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
