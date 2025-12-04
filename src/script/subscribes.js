export function initSubscriptionForm() {
  const form = document.getElementById("subscribe-form");
  if (!form) {
    // Si el formulario no está en la página, no hacemos nada.
    return;
  }

  const messageEl = document.getElementById("subscribe-message");
  const button = form.querySelector('button[type="submit"]');

  if (!messageEl || !button) {
    console.error("Faltan elementos del formulario de suscripción (mensaje o botón).");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    messageEl.textContent = "Enviando...";
    messageEl.className = "text-white";
    button.disabled = true;

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok || (response.redirected && response.status === 200)) {
        messageEl.textContent = "¡Gracias por suscribirte!";
        messageEl.className = "text-green-400";
        form.reset();
      } else {
        const errorData = await response.json();
        messageEl.textContent = errorData.message || "Ocurrió un error.";
        messageEl.className = "text-red-400";
      }
    } catch (error) {
      messageEl.textContent = "Error de red. Inténtalo de nuevo.";
      messageEl.className = "text-red-400";
    } finally {
      button.disabled = false;
      setTimeout(() => {
        messageEl.textContent = "";
      }, 5000);
    }
  });
}
