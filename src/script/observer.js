//Funcion que agrega interactividad a la secciones se hacen visibles, escalan y desaparecen segun el scroll


export function observers() {
    const observer = new IntersectionObserver((entries) => {//Creamos un nuevo Intersection Observer.
		//codigo calback del observer
        entries.forEach(entry => { //Para cada entrada (elemento observado):
          const element = entry.target;
          const visiblePct = entry.intersectionRatio * 100;//Calculamos el porcentaje visible multiplicando intersectionRatio por 100.
    
          if (entry.isIntersecting) { //Si el elemento está intersectando (visible):
            // Calcula el progreso de la animación basado en qué tan visible está el elemento
            const progress = Math.min(visiblePct / 20, 1);//Calculamos el progreso dividiendo el porcentaje visible por 40 (limitado a 1). //sensibilidad
            element.style.opacity = progress;//Ajustamos la opacidad directamente basándonos en este progreso.
            element.style.transform = `scale(${0.8 + (0.2 * progress)})`;//	Ajustamos la escala desde 0.5 hasta 1 basándonos en el progreso. //rango mas pequeno
          } else {
            // Resetea la animación cuando el elemento está completamente fuera de vista
            element.style.opacity = 0;//Si no está intersectando, reseteamos a los valores iniciales.
            element.style.transform = 'scale(0.8)';
          }
        });
		  //fin codigo callback
      }, {
        threshold: Array.from({length: 101}, (_, i) => i / 100),//crea un array de 41 valores entre 0 y 1, representando cada 2.5% de visibilidad.
        //Esto crea thresholds para cada 2.5% de visibilidad, desde 0% hasta 100%
        rootMargin: '100px 0px -100px 0px' //100px arriba y -100px abajo


      });
    
    document.querySelectorAll('.section').forEach(el => {//Seleccionamos todos los elementos con la clase section.
        observer.observe(el)//Aplicamos el observer a cada uno de estos elementos. 
    })
}

//Funcion que agrega interactividad a la clase imageClass, sectionId y la animacion en taildwind que entre como parametro y le agrega un efecto bounce al div

export function observerBounce(imageClass, sectionId, animationClass) {
	const observerBounce = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const imagen = entry.target.querySelector(`.${imageClass}`)//Observer para la imagen principal de
		if(imagen){
      if (entry.isIntersecting){
				imagen.classList.add(animationClass);
			}else{
				imagen.classList.remove(animationClass);
			}
    }
		});
	}, { threshold: 0.1 });

	const section = document.querySelector(`#${sectionId}`);
	if (section) { observerBounce.observe(section);}
}


export function ObserveImages() {// Funcion Sin Uso no me funciono
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
      const element = entry.target;
      const imageUrl = element.dataset.src;

      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          const blurImage = element.querySelector('.blur-image');
          const mainImage = element.querySelector('.main-image');

          if (blurImage) blurImage.style.opacity = 0;
          if (mainImage) mainImage.style.opacity  = 1;
        };
      }
      observer.unobserve(element);
    }
    });
  }, {threshold: 0.1});

  return observer;
}

/*
!Resumen: Este enfoque permite una animación suave que comienza tan pronto como el elemento empieza a entrar en la vista y alcanza su estado final cuando el 40% del elemento es visible, simulando así el comportamiento de animation-range: entry 0% cover 40%. */


