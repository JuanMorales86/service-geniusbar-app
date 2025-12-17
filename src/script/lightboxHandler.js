export function initLightbox() {
  document.addEventListener("astro:page-load", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");
    const imageContainers = document.querySelectorAll(".card-image-container");

    if (!lightbox || !lightboxImage || !prevButton || !nextButton) return;

    let currentImages = [];
    let currentIndex = 0;

    const updateImage = () => {
      // Efecto de fundido
      lightboxImage.style.opacity = "0";
      setTimeout(() => {
        lightboxImage.src = currentImages[currentIndex];
        lightboxImage.style.opacity = "1";
      }, 150);
    };

    imageContainers.forEach((container) => {
      container.addEventListener("click", () => {
        const imagesAttr = container.dataset.images;
        if (!imagesAttr) return;

        currentImages = imagesAttr.split(",");
        currentIndex = 0;
        updateImage();

        // Mostrar/ocultar botones de navegación
        const showNav = currentImages.length > 1;
        prevButton.classList.toggle("hidden", !showNav);
        nextButton.classList.toggle("hidden", !showNav);

        lightbox.classList.remove("hidden");
        lightbox.classList.add("flex");
      });
    });

    prevButton.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateImage();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateImage();
    });
  });
}
