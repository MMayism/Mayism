document.addEventListener("DOMContentLoaded", () => {
  // Mobile sidebar menu
  const menuButton = document.querySelector(".menu-toggle");
  const sidebarNav = document.querySelector(".sidebar-nav");

  if (menuButton && sidebarNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = sidebarNav.classList.toggle("is-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Toggle navigation"
      );
    });

    sidebarNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        sidebarNav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight the active navigation link
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    }, { rootMargin: "-25% 0px -60% 0px" });

    sections.forEach(section => observer.observe(section));
  }

  // Artwork preview
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector("img");

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
  }

  document.querySelectorAll(".art-image img, .hero-art-frame img")
    .forEach(img => {
      img.style.cursor = "zoom-in";

      img.addEventListener("click", event => {
        event.preventDefault();

        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = img.currentSrc || img.src;
        lightboxImage.alt = img.alt || "MAYISM artwork";

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
      });
    });

  lightbox?.addEventListener("click", event => {
    if (
      event.target === lightbox ||
      event.target.classList.contains("lightbox-close")
    ) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });

  // Manual email contact form
  const contactForm = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(
      `MAYISM Portfolio Inquiry - ${project}`
    );

    const body = encodeURIComponent(
      `Hello MAYISM,\n\n` +
      `I'm interested in your work!\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Project: ${project}\n\n` +
      `Message:\n${message}\n`
    );

    if (status) {
      status.textContent =
        "Opening your email app. Please review the message and press Send there.";
    }

    window.location.href =
      `mailto:Mmayism005@gmail.com?subject=${subject}&body=${body}`;
  });
});
