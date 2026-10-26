
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';

      menuButton.setAttribute('aria-expanded', String(isOpen));
      nav.classList.toggle('is-open', isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }

  const lightbox = document.getElementById('art-lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const closeButton = lightbox?.querySelector('.lightbox-close');

  const galleryImages = document.querySelectorAll(
    '.gallery img, .hero-art img'
  );

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-active');
    lightboxImage.removeAttribute('src');
  }

  galleryImages.forEach(img => {
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', event => {
      if (!lightbox || !lightboxImage) return;

      event.preventDefault();
      lightboxImage.src = img.currentSrc || img.src;
      lightboxImage.alt = img.alt || 'MAYISM artwork enlarged';

      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-active');
    });
  });

  closeButton?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
  });
});
