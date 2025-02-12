import gsap from "gsap";

interface UserMenuElement extends HTMLElement {//interface para el elemento del menu del usuario , esto le dice a typescript que el elemento tiene que tener estas propiedades
    handleClick: (e: Event) => void; //esto le dice a typescript que el elemento tiene que tener una funcion handleClick que recibe un evento y no devuelve nada
}

//seteamos los elementos del menu del usuario y los dropdowns para guardarlos en variables, estos elementos referencian a los elementos del html
const userMenus: { [key: string]: UserMenuElement | null } = {}; //esto es un objeto que tiene como clave un string y como valor un elemento del menu del usuario o null
const userDropdowns: {[key: string]: HTMLElement | null} = {}; //esto es un objeto que tiene como clave un string y como valor un elemento del dropdown o null


//la funcion principal hace varias cosas: - toma elementos desde el DOM para las dos variantes desktop y mobile. - setea los estados iniciales GSAP (dropdowns escondidos, menus desplegados) - agrega eventos de clic a los elementos del menu del usuario para abrir/cerrar los dropdowns. - almacena estos handlers para luego limpiarlos.
export function initUserDropdownGSAP() {
    ['desktop', 'mobile'].forEach(variant => {
        userMenus[variant] = document.getElementById(`user-menu-${variant}`) as UserMenuElement; //selecciona el elemento del menu del usuario
        userDropdowns[variant] = document.getElementById(`user-dropdown-${variant}`); //selecciona el elemento del dropdown

        if (userMenus[variant] && userDropdowns[variant]) {
            //set initial state
            //Logicas de animacion de GSAP para abrir y cerrar los dropdowns
            gsap.set(userDropdowns[variant], { //setea la posicion inicial de los dropdowns
                autoAlpha: 0, // oculto
                y: -10, // mover hacia arriba
                display: 'none' // ocultar
            });

            
            const handleClick = (e: Event) => toggleDropdown(e, variant); //define la funcion que se ejecuta cuando se hace clic en el menu del usuario
            userMenus[variant]?.addEventListener('click', handleClick); //agrega el evento de clic al menu del usuario
            userMenus[variant]!.handleClick = handleClick; //asigna el manejador de eventos al menu del usuario
        }
    });

    document.addEventListener('click', handleOutsideClick);// agrega un evento de clic al documento para cerrar los dropdowns cuando se hace clic fuera del menu del usuario
}

function toggleDropdown(event: Event, variant: string) { //funcion que se ejecuta cuando se hace clic en el menu del usuario
    event.stopPropagation(); // evita que el evento se propague
    const dropdown = userDropdowns[variant]; //selecciona el dropdown

    // Logica de animacion de GSAP para abrir y cerrar los dropdowns
    if(dropdown?.style.display === 'none'){
        gsap.to(dropdown, { //animacion de GSAP para abrir el dropdown
            duration: 0.3, //duracion de la animacion
            autoAlpha: 1, //opacidad
            y: 0, //mover hacia abajo
            display: 'block', //mostrar
            ease: 'power2.out' ///tipo de animacion
        });
    } else { //si el dropdown esta abierto, se cierra
        gsap.to(dropdown, { //animacion de GSAP para cerrar el dropdown
            duration: 0.3, //duracion de la animacion
            autoAlpha: 0, //opacidad
            y: -10, //mover hacia arriba
            display: 'none', //ocultar
            ease: 'power2.in' //tipo de animacion
        });
    }
}

function handleOutsideClick(event: Event) { //funcion que se ejecuta cuando se hace clic fuera del menu del usuario
    ['desktop', 'mobile'].forEach(variant => { //recorre los dos variantes de menu
        if (userMenus[variant] && userDropdowns[variant]) { ///si el menu del usuario y el dropdown existen
            if (!userMenus[variant]?.contains(event.target as Node) &&
            !userDropdowns[variant]?.contains(event.target as Node)) { //si el evento no es un hijo del menu del usuario o del dropdown, esto evita que se cierre el dropdown cuando se hace clic en el menu del usuario
                gsap.to(userDropdowns[variant], { //animacion de GSAP para cerrar el dropdown
                    duration: 0.3, //duracion de la animacion
                    autoAlpha: 0, //opacidad
                    y: -10, //mover hacia arriba
                    display: 'none', //ocultar
                    ease: 'power2.in' //tipo de animacion
                });
            }
        }
    });
}

export function destroyUserDropdownGSAP() { //funcion que se ejecuta cuando se destruye el componente
    ['desktop', 'mobile'].forEach(variant => { //recorre los dos variantes de menu
        if(userMenus[variant]?.handleClick) { //si el menu del usuario tiene un manejador de eventos
            userMenus[variant]?.removeEventListener('click', userMenus[variant].handleClick); //elimina el manejador de eventos del menu del usuario
        }
    });
    document.removeEventListener('click', handleOutsideClick); //elimina el manejador de eventos del documento
}

// extends HTMLElement means your custom interface UserMenuElement inherits all the properties and methods of a standard HTML element (like div, button, etc.) and adds your own custom property handleClick.

// It's like saying "I want all the normal HTML element stuff, PLUS my own handleClick property". This way, when you use UserMenuElement, you get access to both:

// All standard HTML element properties (className, id, addEventListener, etc.)
// Your custom handleClick property
// This is why TypeScript now understands that userMenus[variant].handleClick is valid - because we told it our elements are not just regular HTML elements, but enhanced ones with an extra property.