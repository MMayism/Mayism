document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  // Mobile menu
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Manual email contact form
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const project = String(data.get("project") || "").trim();
      const message = String(data.get("message") || "").trim();

      const subject = encodeURIComponent(
        `MAYISM Portfolio Inquiry — ${project}`
      );

      const body = encodeURIComponent(
        `Hello MAYISM,\n\n${message}\n\n` +
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
