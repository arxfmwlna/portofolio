document.documentElement.classList.add("js");

const gallery = document.querySelector("#galeri");
const galleryStatus = document.querySelector("#galeri-status");
const galleryEmpty = document.querySelector("#galeri-kosong");
const galleryError = document.querySelector("#galeri-error");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const menuDialog = document.querySelector("#menu-mobile");
const menuToggle = document.querySelector(".menu-toggle");
let visibleItems = [];
let currentIndex = 0;
let lastGalleryTrigger = null;
let imageErrorCount = 0;

function renderGallery(filter = "semua") {
  if (!Array.isArray(window.portfolioGallery)) {
    galleryStatus.textContent = "Galeri belum tersedia.";
    galleryEmpty.hidden = false;
    galleryError.hidden = false;
    galleryError.textContent = "Data galeri tidak dapat dibaca. Periksa assets/data-galeri.js.";
    return;
  }

  const items = window.portfolioGallery.filter((item) => filter === "semua" || item.group === filter);
  visibleItems = items;
  gallery.replaceChildren();
  galleryEmpty.hidden = items.length > 0;
  galleryStatus.textContent = items.length
    ? `Menampilkan ${items.length} tangkapan layar. Pilih gambar untuk memperbesar.`
    : "Tidak ada tangkapan layar pada filter ini.";

  for (const [index, item] of items.entries()) {
    const button = document.createElement("button");
    const image = document.createElement("img");
    const caption = document.createElement("span");

    button.type = "button";
    button.className = "galeri-item";
    button.setAttribute("aria-label", `Perbesar: ${item.alt}`);
    button.dataset.index = String(index);

    image.src = item.thumb;
    image.alt = item.alt;
    image.width = item.width;
    image.height = item.height;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      button.classList.add("gagal");
      caption.textContent = `${item.caption}. Gambar tidak dapat dimuat.`;
      imageErrorCount += 1;
      galleryError.hidden = false;
      galleryError.textContent = `${imageErrorCount} tangkapan layar tidak dapat dimuat. Periksa apakah folder assets masih lengkap.`;
    }, { once: true });

    caption.className = "galeri-caption";
    caption.textContent = item.caption;
    button.append(image, caption);
    button.addEventListener("click", () => openLightbox(index, button));
    gallery.append(button);
  }
}

function openLightbox(index, trigger = null) {
  if (!visibleItems.length) return;
  currentIndex = (index + visibleItems.length) % visibleItems.length;
  lastGalleryTrigger = trigger || lastGalleryTrigger;
  const item = visibleItems[currentIndex];
  lightboxImage.classList.add("memuat");
  lightboxImage.alt = item.alt;
  lightboxImage.width = item.fullWidth;
  lightboxImage.height = item.fullHeight;
  lightboxImage.dataset.source = item.full;
  lightboxImage.onload = () => {
    if (lightboxImage.dataset.source !== item.full) return;
    lightboxImage.classList.remove("memuat");
    lightboxCaption.textContent = `${currentIndex + 1} dari ${visibleItems.length}: ${item.caption}`;
  };
  lightboxImage.onerror = () => {
    if (lightboxImage.dataset.source !== item.full) return;
    lightboxImage.classList.remove("memuat");
    lightboxCaption.textContent = "Gambar tidak dapat dimuat. Pastikan folder assets/img masih lengkap.";
  };
  lightboxCaption.textContent = "Memuat tangkapan layar...";
  lightboxImage.src = item.full;
  if (!lightbox.open) lightbox.showModal();
  lightbox.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  if (lightbox.open) lightbox.close();
}

function moveLightbox(direction) {
  openLightbox(currentIndex + direction);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("aktif", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    imageErrorCount = 0;
    galleryError.hidden = true;
    renderGallery(button.dataset.filter);
  });
});

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener("close", () => {
  lightboxImage.dataset.source = "";
  lightboxImage.removeAttribute("src");
  lastGalleryTrigger?.focus();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveLightbox(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveLightbox(1);
  }
});

const dialogTriggers = new WeakMap();
document.querySelectorAll("[data-open-dialog]").forEach((button) => {
  const dialog = document.getElementById(button.dataset.openDialog);
  button.addEventListener("click", () => {
    dialogTriggers.set(dialog, button);
    dialog.showModal();
    dialog.querySelector("[data-close-dialog]").focus();
  });
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelectorAll(".detail-dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    dialogTriggers.get(dialog)?.focus();
  });
});

menuToggle.addEventListener("click", () => {
  menuDialog.showModal();
  menuToggle.setAttribute("aria-expanded", "true");
  menuDialog.querySelector("[data-close-menu]").focus();
});

document.querySelector("[data-close-menu]").addEventListener("click", () => menuDialog.close());
menuDialog.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => menuDialog.close());
});
menuDialog.addEventListener("click", (event) => {
  if (event.target === menuDialog) menuDialog.close();
});
menuDialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    menuDialog.close();
  }
});
menuDialog.addEventListener("close", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.focus();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    lightbox.close();
  }
});

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

const navLinks = [...document.querySelectorAll(".nav-desktop a")];
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("tampak");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".muncul").forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle("aktif", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  observedSections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".muncul").forEach((element) => element.classList.add("tampak"));
}

if (Array.isArray(window.portfolioGallery) && window.portfolioGallery.length) {
  renderGallery();
} else {
  galleryStatus.textContent = "Galeri belum tersedia.";
  galleryEmpty.hidden = false;
  galleryError.hidden = false;
  galleryError.textContent = "Data galeri tidak dapat dibaca. Periksa assets/data-galeri.js.";
}
