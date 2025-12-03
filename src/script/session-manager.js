// src/script/session-manager.js

let inactivityTimer;
let warningTimer;
let countdownInterval;
let isSetup = false;
let modalElement = null;

const MODAL_ID = "session-warning-modal";

// --- Funciones del Modal ---

function createModal(onStayConnected) {
  if (document.getElementById(MODAL_ID)) return;

  const modalHTML = `
    <div id="${MODAL_ID}" style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.6); z-index: 1000; display: none; align-items: center; justify-content: center; font-family: system-ui, sans-serif;">
      <div style="background-color: white; color: black; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; max-width: 400px;">
        <img src="/img/ONTHEPOINTSERVICEPNG.png" alt="Logo de la empresa" width="160" height="160" style="display: block; margin: 0 auto 1rem;"/>
        <h3 style="font-size: 1.25rem; font-weight: bold; margin: 0;">Tu sesión está a punto de expirar</h3>
        <p style="margin: 1rem 0;">Por inactividad, tu sesión se cerrará en <span id="session-countdown" style="font-weight: bold;"></span> segundos.</p>
        <button id="stay-connected-btn" class="btn-custom">Seguir conectado</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  modalElement = document.getElementById(MODAL_ID);
  document
    .getElementById("stay-connected-btn")
    .addEventListener("click", onStayConnected);
}

function showWarningModal(warningTimeSeconds) {
  if (!modalElement) return;
  modalElement.style.display = "flex";

  let secondsLeft = warningTimeSeconds;
  const countdownEl = document.getElementById("session-countdown");
  countdownEl.textContent = secondsLeft;

  countdownInterval = setInterval(() => {
    secondsLeft--;
    countdownEl.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

function hideWarningModal() {
  if (modalElement) {
    modalElement.style.display = "none";
  }
  clearInterval(countdownInterval);
}

// --- Lógica del Temporizador ---

function logout(logoutUrl) {
  window.location.href = logoutUrl;
}

function resetTimer(timeoutMs, warningMs, logoutUrl) {
  // Limpiamos todos los temporizadores anteriores
  clearTimeout(inactivityTimer);
  clearTimeout(warningTimer);
  hideWarningModal();

  // Temporizador para mostrar la advertencia
  warningTimer = setTimeout(
    () => showWarningModal(warningMs / 1000),
    timeoutMs - warningMs
  );

  // Temporizador final para desloguear
  inactivityTimer = setTimeout(() => logout(logoutUrl), timeoutMs);
}

function setupInactivityDetection(timeoutMs, warningMs, logoutUrl) {
  // Si ya se configuró, no hacer nada.
  if (isSetup) return;

  const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];
  events.forEach((event) => {
    // Al detectar actividad, reiniciamos el timer con los valores correctos.
    window.addEventListener(
      event,
      () => resetTimer(timeoutMs, warningMs, logoutUrl),
      true
    );
  });

  // Creamos el modal una sola vez y le pasamos la función de reseteo
  createModal(() => resetTimer(timeoutMs, warningMs, logoutUrl));

  isSetup = true;
}

export function initSessionManager(options) {
  const { timeoutMinutes = 15, logoutUrl = "/api/signout" } = options;
  const timeoutMs = timeoutMinutes * 60 * 1000;
  const warningMs = 30000; // 30 segundos de advertencia

  // No iniciar si el timeout es menor que la advertencia
  if (timeoutMs <= warningMs) {
    console.warn(
      "[SessionManager] El tiempo de timeout debe ser mayor que el tiempo de advertencia."
    );
    return;
  }

  console.log(
    `[SessionManager] Iniciando. Timeout: ${timeoutMinutes} min. Advertencia: ${warningMs / 1000} seg.`
  );

  // Nos aseguramos de que los listeners de actividad estén configurados.
  setupInactivityDetection(timeoutMs, warningMs, logoutUrl);

  // En cada carga de página, reiniciamos el temporizador.
  resetTimer(timeoutMs, warningMs, logoutUrl);
}
