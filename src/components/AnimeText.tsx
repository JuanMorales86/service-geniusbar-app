import { useEffect, useRef } from 'react';
//@ts-ignore - Ignoramos tipos si la versión v4 beta no tiene definiciones completas aún
import { createTimeline, stagger, splitText } from 'animejs';

interface AnimeTextProps {
  text: string;
  className?: string;
}

export default function AnimeText({ text, className = '' }: AnimeTextProps) {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Reiniciamos el contenido para asegurar que el split se haga sobre el texto limpio
    element.innerHTML = text;

    // Aplicamos splitText de animejs
    const { words, chars } = splitText(element, {
      words: { wrap: 'clip' }, // Habilita el efecto de "recorte" para que el texto aparezca desde fuera
      chars: true,
    });

    // Limpiamos timeline anterior si existe (para evitar duplicados en re-renders)
    if (timelineRef.current) timelineRef.current.pause();

    // Creamos el timeline
    const timeline = createTimeline({
      loop: false,
      defaults: { ease: 'inOut(3)', duration: 2000 }
    });
    
    timelineRef.current = timeline;

    // Configuramos la animación basada en tu ejemplo
    timeline
      .add(words, {
        y: [
            (el: HTMLElement) => {
                // Usamos dataset.line que splitText añade automáticamente
                const line = parseInt(el.dataset.line || '0', 10);
                return line % 2 ? '100%' : '-100%';
            }, 
            '0%'
        ],
      } as any, stagger(200))
      .init();

    return () => {
      if (timelineRef.current) timelineRef.current.pause();
    };
  }, [text]);

  return (
    <h3 ref={elementRef} className={className}>
      {text}
    </h3>
  );
}