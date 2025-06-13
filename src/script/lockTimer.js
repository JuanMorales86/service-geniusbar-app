export function initLockTimer() {
  const timerElement = document.getElementById("lockTimer");
  if (timerElement) {
    let timeLeft = parseInt(timerElement.dataset.remainingTime);//En segundos
    const username = timerElement.dataset.username;

    const updateMessage = () => {
      timerElement.textContent = `Cuenta bloqueada. Por favor, intente nuevamente en ${timeLeft} segundos.`;
    };

    const timer = setInterval(() => {
      timeLeft--;
      updateMessage();

      if (timeLeft <= 0) {
        clearInterval(timer);
        fetch('/api/resetAttempts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username })
        })
        window.location.href = "/signin";
      }
    }, 1000);
  }
}
