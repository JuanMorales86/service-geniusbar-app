

const LoadingSpinerAtom = () =>  {

    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-dark-input bg-opacity-95 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-atom text-sky-600 animate-spin-fast">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12v.01" />
  <path d="M19.071 4.929c-1.562 -1.562 -6 .337 -9.9 4.243c-3.905 3.905 -5.804 8.337 -4.242 9.9c1.562 1.561 6 -.338 9.9 -4.244c3.905 -3.905 5.804 -8.337 4.242 -9.9" />
  <path d="M4.929 4.929c-1.562 1.562 .337 6 4.243 9.9c3.905 3.905 8.337 5.804 9.9 4.242c1.561 -1.562 -.338 -6 -4.244 -9.9c-3.905 -3.905 -8.337 -5.804 -9.9 -4.242" />
</svg>
    <div>
      <span className="font-sans text-dark-text text-customtext2">Cargando...</span>
    </div>
    </div>
    )
  }
  
  export default LoadingSpinerAtom

/*
className="w-12 h-12 text-sky-600 animate-spin-slow"

fixed top-0 left-0 w-screen h-screen: Cubre toda la pantalla.
flex items-center justify-center: Centra el icono horizontal y verticalmente.
bg-gray-100 z-50: Fondo gris claro y se asegura de que esté por encima de otros elementos.
animate-spin-slow: Aplica la animación de giro lento.
origin-center 
*/