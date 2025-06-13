export function initLockTimer(){
    const timerElement = document.getElementById("lockTimer");
    const formElement = document.getElementById("signinForm");
    const submitButton = formElement.querySelector('button[type="submit"]');

    if(timerElement){
        let timeLeft = parseInt(timerElement.dataset.remainingTime);//Ya viene en segundos desde el backend
        const username = timerElement.dataset.username;

        //Deshabilitar formulario inicialmente
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Cuenta Bloqueada";
            submitButton.className = "w-full text-white bg-gray-400 cursor-not-allowed fnot-medium rounden-lg text-sm px-5 py-2.5 text-center";
        }

        const updateMessage = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            //Crear mesage mas visual
            timerElement.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <strong>Cuenta bloqueada temporalmente</strong>
          </div>
          <div class="mt-2">
            Tiempo restante: <span class="font-mono text-lg font-bold">${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>
          </div>
          <div class="w-full bg-red-200 rounded-full h-2 mt-3">
            <div class="bg-red-600 h-2 rounded-full transition-all duration-1000" 
                 style="width: ${(timeLeft / parseInt(timerElement.dataset.remainingTime)) * 100}%"></div>
          </div>
        </div>
      `;
        }

        //Actualizar mensaje incial
        updateMessage();

        const timer = setInterval(() => {
            timeLeft--;
            updateMessage();

            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimerExpired();
            }
        }, 1000);

        async function handleTimerExpired(){
             // Mostrar mensaje de éxito
      timerElement.innerHTML = `
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <strong>¡Cuenta desbloqueada!</strong>
          </div>
          <p class="mt-1">Ya puedes intentar iniciar sesión nuevamente.</p>
        </div>
      `;
        

        try {
          //Reseatear intentos en el backend
          const response = await fetch('/api/resetAttempts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
          });
          if (response.ok){
            //Rehabilitar el formulario
            if(submitButton){
              submitButton.disabled = false;
              submitButton.textContent = 'Sign In';
              submitButton.className = "w-full text-white bg-sky-esp focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800";
            }

            //Limpiar URL de parametros de error
            const url = new URL(window.location);
            url.searchParams.delete('error');
            url.searchParams.delete('remainingTime');
            url.searchParams.delete('unlockTime');
            window.history.replaceState({}, '', url);
          }
        } catch (error) {
          console.error('Error resseting attempts:', error);
          //En caso de error, mostrar mensaje pero permitir intentar
          timerElement.innerHTML += `
          <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mt-2">
            <p class="text-sm">Hubo un problema al conectar con el servidor. Puedes intentar refrescar la página.</p>
          </div>
          `;
        }
    }
  }
}

//Auto inicilizar cuando el DOM este listo
document.addEventListener('DOMContentLoaded', () => {
  initLockTimer();
});