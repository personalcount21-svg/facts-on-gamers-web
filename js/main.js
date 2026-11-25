document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  const menuToggle = document.getElementById("menuToggle");
  const navDrawer = document.getElementById("navDrawer");

  if (menuToggle && navDrawer) {
    const closeMenu = () => {
      menuToggle.classList.remove("is-open");
      navDrawer.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = navDrawer.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!navDrawer.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  const lightbox = document.getElementById("brandLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const zoomTriggers = document.querySelectorAll(".brand-zoom-trigger");

  if (lightbox && lightboxImg && zoomTriggers.length > 0) {
    const openLightbox = (trigger) => {
      const img = trigger.querySelector("img");
      if (!img) return;
      lightboxImg.src = img.getAttribute("src");
      lightboxImg.alt = img.getAttribute("alt") || "";
      if (lightboxTitle) lightboxTitle.textContent = trigger.getAttribute("data-title") || "";
      if (lightboxDesc) lightboxDesc.textContent = trigger.getAttribute("data-desc") || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    };

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
    };

    zoomTriggers.forEach((btn) => {
      btn.addEventListener("click", () => openLightbox(btn));
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }
});