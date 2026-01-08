document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSearch();
  initDestinations();
});

/* ================= NAVIGATION ================= */
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.innerHTML = navMenu.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

/* ================= SEARCH ================= */
function initSearch() {
  const searchBtn = document.querySelector(".btn-primary");
  if (!searchBtn) return;

  searchBtn.addEventListener("click", () => {
    alert("Search feature demo mode 😊");
  });
}

/* ================= DESTINATIONS ================= */
function initDestinations() {
  const grid = document.querySelector(".destination-grid");
  if (!grid) return;

  const destinations = [
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
      price: 899,
      rating: 4.8
    },
    {
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602897457-92b8ec8c44f1",
      price: 1099,
      rating: 4.9
    },
    {
      name: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
      price: 1599,
      rating: 4.7
    }
  ];

  destinations.forEach(d => {
    const card = document.createElement("div");
    card.className = "destination-card";
    card.innerHTML = `
      <img src="${d.image}" alt="${d.name}">
      <div class="destination-content">
        <h3>${d.name}</h3>
        <p>Starting from $${d.price}</p>
        <button class="btn btn-primary">Book Now</button>
      </div>
    `;
    grid.appendChild(card);
  });
}
