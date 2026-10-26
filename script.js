document.addEventListener("DOMContentLoaded", () => {
  // MOBILE NAVIGATION
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px"
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  // FULL-SIZE ARTWORK VIEWER
  const lightbox = document.getElementById("art-lightbox");

  if (lightbox) {
    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    const artworkButtons = Array.from(
      document.querySelectorAll(".lightbox-trigger")
    );

    let currentIndex = 0;
    let previousFocus = null;

    function showArtwork(index) {
      if (!artworkButtons.length) return;

      // Wrap around at the beginning and end of the gallery.
      currentIndex =
        (index + artworkButtons.length) % artworkButtons.length;

      const button = artworkButtons[currentIndex];
      const image = button.querySelector("img");

      const fullImage =
        button.getAttribute("data-full") ||
        image?.getAttribute("src") ||
        "";

      const caption =
        button.getAttribute("data-caption") ||
        image?.getAttribute("alt") ||
        "MAYISM artwork";

      lightboxImage.src = fullImage;
      lightboxImage.alt = image?.alt || "MAYISM artwork";
      lightboxCaption.textContent = caption;
    }

    function openLightbox(index) {
      if (!artworkButtons.length) return;

      previousFocus = document.activeElement;

      showArtwork(index);

      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");

      closeButton?.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");

      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    }

    // Open the clicked portfolio or architecture artwork.
    artworkButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        openLightbox(index);
      });
    });

    // Make the featured hero artwork clickable too.
    const heroImage = document.querySelector(".hero-art-frame img");

    if (heroImage) {
      heroImage.addEventListener("click", () => {
        const heroSrc = heroImage.getAttribute("src");

        const matchingIndex = artworkButtons.findIndex(button => {
          return button.getAttribute("data-full") === heroSrc;
        });

        openLightbox(matchingIndex >= 0 ? matchingIndex : 0);
      });
    }

    // Close button.
    closeButton?.addEventListener("click", closeLightbox);

    // Previous and next artwork buttons.
    previousButton?.addEventListener("click", () => {
      showArtwork(currentIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
      showArtwork(currentIndex + 1);
    });

    // Close when the dark backdrop is clicked.
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard controls.
    document.addEventListener("keydown", event => {
      if (!lightbox.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showArtwork(currentIndex - 1);
      }

      if (event.key === "ArrowRight") {
        showArtwork(currentIndex + 1);
      }
    });
  }

  // CONTACT FORM
  // Opens the visitor's email app with the inquiry pre-filled.
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const formData = new FormData(form);

      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const project = String(formData.get("project") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const subject = encodeURIComponent(
        `MAYISM Portfolio Inquiry — ${project}`
      );

      const body = encodeURIComponent(
        `Hello MAYISM,\n\n` +
        `${message}\n\n` +
        `Name: ${name}\n` +
        `Reply email: ${email}\n` +
        `Project type: ${project}\n`
      );

      if (status) {
        status.textContent =
          "Opening your email app. Please review the message and press Send there.";
      }

      window.location.href =
        `mailto:Mmayism005@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
