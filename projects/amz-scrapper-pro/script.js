const menuButton = document.querySelector('.spectra-menu-button');
const navigation = document.querySelector('.spectra-sidebar');
const backdrop = document.querySelector('.spectra-sidebar-backdrop');
const desktopNavigation = window.matchMedia('(min-width: 1101px)');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const closeButton = lightbox?.querySelector('.lightbox-close');

const setMenuOpen = (open, returnFocus = false) => {
  if (!menuButton || !navigation) return;

  const mobileOpen = open && !desktopNavigation.matches;
  navigation.classList.toggle('open', mobileOpen);
  backdrop?.classList.toggle('open', mobileOpen);
  document.body.classList.toggle('nav-open', mobileOpen);
  menuButton.setAttribute('aria-expanded', String(mobileOpen));

  if (desktopNavigation.matches) {
    navigation.removeAttribute('aria-hidden');
    navigation.removeAttribute('inert');
  } else {
    navigation.setAttribute('aria-hidden', String(!mobileOpen));
    navigation.toggleAttribute('inert', !mobileOpen);
  }

  if (mobileOpen) {
    navigation.querySelector('a')?.focus();
  } else if (returnFocus) {
    menuButton.focus();
  }
};

// Toggle on "Contents" button click.
menuButton?.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

// Close when a navigation link inside the drawer is selected.
navigation?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  setMenuOpen(false);
});

// Close when the user clicks outside the drawer (the backdrop).
backdrop?.addEventListener('click', () => setMenuOpen(false, true));

// Close on Escape.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    setMenuOpen(false, true);
  }
});

// Reset state when crossing the desktop/mobile breakpoint.
desktopNavigation.addEventListener('change', () => setMenuOpen(false));
setMenuOpen(false);

// Lightbox: enlarge screenshots without cropping.
document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox || '';
    lightbox.showModal();
  });
});

closeButton?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
