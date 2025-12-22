export function initHolographicMode() {
  document.addEventListener("astro:page-load", () => {
    const cards = document.querySelectorAll(".holographic-card");

    cards.forEach((card) => {
      const glare = card.querySelector(".holographic-glare");
      const maxRotation = 9; // Grados máximos de rotación
      const imageContainer = card.querySelector(".card-image-container");
      let imageCycleInterval;
      let currentImageIndex = 0;

      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        // Detectar si es evento táctil o de ratón
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const { width, height } = rect;

        // Calcular rotación
        const rotateY = (x / width - 0.5) * 2 * maxRotation;
        const rotateX = (0.5 - y / height) * 2 * maxRotation;

        // Aplicar transformación 3D a la tarjeta
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

        // Mover el brillo
        if (glare) {
          glare.style.setProperty("--mouse-x", `${x}px`);
          glare.style.setProperty("--mouse-y", `${y}px`);
          glare.style.opacity = "1"; // Forzar visibilidad en móviles
        }
      };

      const handleEnter = () => {
        if (glare) glare.style.opacity = "1";

        if (!imageContainer) return;
        const images = imageContainer.querySelectorAll("img");
        if (images.length <= 1) return;

        clearInterval(imageCycleInterval);
        imageCycleInterval = setInterval(() => {
          images[currentImageIndex].classList.add("opacity-0");
          currentImageIndex = (currentImageIndex + 1) % images.length;
          images[currentImageIndex].classList.remove("opacity-0");
        }, 1100); // Cambia de imagen cada 800ms
      };

      const handleLeave = () => {
        if (glare) glare.style.opacity = ""; // Volver al comportamiento CSS

        // Resetear la transformación al salir
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";

        // Detener el ciclo de imágenes y resetear
        clearInterval(imageCycleInterval);
        if (!imageContainer) return;
        const images = imageContainer.querySelectorAll("img");
        if (images.length > 1) {
          images[currentImageIndex].classList.add("opacity-0");
          currentImageIndex = 0;
          images[currentImageIndex].classList.remove("opacity-0");
        }
      };

      // Eventos de Mouse (Desktop)
      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      // Eventos Táctiles (Móvil)
      // passive: true mejora el rendimiento del scroll mientras se toca la tarjeta
      card.addEventListener("touchmove", handleMove, { passive: true });
      card.addEventListener("touchstart", handleEnter, { passive: true });
      card.addEventListener("touchend", handleLeave);
      card.addEventListener("touchcancel", handleLeave);
    });
  });
}
