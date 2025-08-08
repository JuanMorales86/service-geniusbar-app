export function initTwakTo() {
  // Eliminar cualquier instancia existente del widget Tawk.to del DOM
  var tawkContainer = document.querySelector('.tawk-wrapper');
  if (tawkContainer) {
    tawkContainer.remove();
  }

   // Reinicializar el objeto Tawk_API
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

// Crear y añadir el script de Tawk.to al DOM
var s1=document.createElement("script"),
s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6890dcd6f0318c19234332d4/1j1qtta25';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);

}