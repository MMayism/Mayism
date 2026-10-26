
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector(".lightbox-close");

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImg.src = "";
  }

  document.querySelectorAll(".art-image img, .hero-art-frame img").forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", event => {
      event.preventDefault();
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || "MAYISM artwork";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    });
  });

  closeButton?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });

  const contactForm = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "Other project");
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`MAYISM inquiry: ${project}`);
    const body = encodeURIComponent(
      `Hello MAYISM,\n\n${message}\n\nProject type: ${project}\nName: ${name}\nReply email: ${email}`
    );

    if (status) {
      status.textContent = "Opening your email app. Please review the message and press Send there.";
    }
    window.location.href = `mailto:Mmayism005@gmail.com?subject=${subject}&body=${body}`;
  });
});
