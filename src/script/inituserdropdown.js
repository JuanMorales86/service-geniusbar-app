// Creamos dos objetos vacíos que funcionarán como contenedores para almacenar las referencias a los botones y menús desplegables.
const userMenus = {};
const userDropdowns = {};


// funcion para abrir o cerrar el dropdown
export function initUserDropdown() {
      //Esta parte busca y guarda las referencias a los elementos del DOM usando los IDs dinámicos (user-menu-desktop, user-menu-mobile, etc.)
    ['desktop', 'mobile'].forEach(variant => {
        userMenus[variant] = document.getElementById(`user-menu-${variant}`);
        userDropdowns[variant] = document.getElementById(`user-dropdown-${variant}`);
  
          //Si encontramos los elementos, creamos un manejador de eventos y lo guardamos como propiedad del elemento para poder eliminarlo después.
        if (userMenus[variant] && userDropdowns[variant]) {
            const handleClick = (e) => toggleDropdown(e, variant);
            userMenus[variant].addEventListener('click', handleClick);
            userMenus[variant].handleClick = handleClick;
        }
      
    });

    document.addEventListener('click', handleOutsideClick);
}



//Esta función verifica si el clic fue fuera del menú y lo cierra en ese caso.
function handleOutsideClick(event) {
    ['desktop', 'mobile'].forEach(variant => {
        if (userMenus[variant] && userDropdowns[variant]) {
            if (!userMenus[variant].contains(event.target) && !userDropdowns[variant].contains(event.target)) {
                closeDropdown(variant);
            }
        }
    });
}

//Alterna la visibilidad del dropdown correspondiente.
function toggleDropdown(event, variant) {
    event.stopPropagation();
    userDropdowns[variant].classList.toggle('hidden');
}

function closeDropdown(variant) {
    userDropdowns[variant]?.classList.add('hidden');
}

//Limpia todos los event listeners cuando el componente se destruye.
export function destroyUserDropdown() {
    ['desktop', 'mobile'].forEach(variant => {
        if (userMenus[variant] && userMenus[variant].handleClick) {
            userMenus[variant].removeEventListener('click', userMenus[variant].handleClick);
        }
    });
    document.removeEventListener('click', handleOutsideClick);
}

window.addEventListener('page:before-leave', () => {
    ['desktop', 'mobile'].forEach(variant => closeDropdown(variant));
    // Este código es un event listener que se activa justo antes de que el usuario abandone la página actual. Su función es:

    // Escucha el evento 'page:before-leave' que es específico de Astro
    // Cuando se activa, ejecuta una función que:
    // Itera sobre las variantes ['desktop', 'mobile']
    // Cierra todos los dropdowns abiertos
});
   // Es una medida de limpieza que asegura que los menús desplegables se cierren antes de navegar a otra página, evitando que queden abiertos si el usuario regresa usando el botón "atrás" del navegador.

