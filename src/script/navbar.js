export function initNavbar() {

  let lastScrollPosition = window.scrollY;

  window.addEventListener('scroll', function() {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
      // Desplazamiento hacia abajo
      document.body.classList.add('scroll-down');
    } else {
      // Desplazamiento hacia arriba
      document.body.classList.remove('scroll-down');
    }

    lastScrollPosition = currentScrollPosition;
  });
};