import {useEffect, useRef, useState} from 'react'
import BlurImages from './BlurImages';
import AnimeText from './AnimeText';
const cl = console.log.bind(console)

interface Image {
    images: string[];
    alt: string;
    title: string;
    textColor?: string;
    bgColor?: string;
    path: string;
}

interface LightboxPorps {
    images: Image[];
}

export default function ImageLightboxSlider({images}: LightboxPorps) {
    const containerRef = useRef<HTMLDivElement>(null);
    // const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');
    const [ispaused, setPaused] = useState(false);
    const [currentImageIndexes, setCurrentImageIndexes] = useState<number []>(() => Array(images.length).fill(0));
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    //cl(selectedIndex);
    //cl(currentImageIndexes);

    // UseEffect para el scroll horizontal
    useEffect(() => {
        const container = containerRef.current;
        if (!container || images.length <= 3 || ispaused) return;

        const scrollRight = () => {
            const targetScroll = container.scrollLeft + container.clientWidth / 3;

            container.scrollTo({
                left: container.scrollLeft >= (container.scrollWidth - container.clientWidth) ?
                0 : targetScroll,
                behavior: 'smooth'
            });
        };

        // const scroll = () => {
        //     if(scrollDirection === 'right') {
        //         if(container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
        //             cl('cambio de direccion del scroll')
        //             setScrollDirection('left');
        //         } else {
        //             cl('scrolling right')
        //             container.scrollTo({
        //                 left: container.scrollLeft + container.clientWidth / 3,
        //                 behavior: 'smooth'
        //             });
        //         }
        //     } else {
        //         if (container.scrollLeft <= 0 ){
        //             cl('cambio a la derecha del scroll')
        //             setScrollDirection('right');
        //         } else {
        //             cl('scrolling left')
        //             container.scrollTo({
        //                 left: container.scrollLeft - container.clientWidth / 3,
        //                 behavior: 'smooth'
        //             });
        //         }
        //     }
        // }

        const scrollInterval = setInterval(scrollRight, 20000); //Cada 20 segundos

        return () => clearInterval(scrollInterval);
    }, [images.length, ispaused]);

    // UseEffect para cambiar las imagenes de los cards
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndexes(prevIndexes => 
                prevIndexes.map((index, cardIndex) => 
                (index + 1) % images[cardIndex].images.length
                )
            )
        }, 9000);

        return () => clearInterval(interval);
    }, [images]);

    // const openLightBox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);
    
    const nextImage = () => {
        if(selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    };

    const previousImage = () => {
        if(selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length ) % images.length);
        }
    };

    
    return (
        <div >
            {/*Slider de cards horizontal */}
            <div 
            ref={containerRef} 
            className="flex overflow-x-auto space-x-6 p-6 hover:snap-x px-7 snap-mandatory "
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            >
                {images.map((card, cardIndex) => (
                    <div
                        key={cardIndex}
                        className="flex-none w-48 lg:w-96 h-[800px] snap-start relative hover:scale-custom2 transition-all ease-in-out duration-500"
                    >
                        <div className={`rounded-xl shadow-lg overflow-hidden h-full ease-in-out ${card.bgColor || 'bg-mainbrand-light'}`}>
                            <div 
                                onClick={() => window.location.href = card.path}
                                // onClick={() => openLightBox(cardIndex)}
                                className="cursor-pointer relative h-full w-full"
                            >
                                <div className='relative w-full h-full'>
                                {card.images.map((imgSrc, imgIndex) => (

                                    <div key={imgIndex}  className={`absolute inset-0 object-cover transition-all duration-[8000ms] ease-in-out
                                        ${currentImageIndexes[cardIndex] === imgIndex ? 'opacity-100 scale-custom6' : 'opacity-0 scale-custom4'}`}>

                                        <BlurImages
                                        key={imgIndex}
                                        src={imgSrc}
                                        alt={card.alt}
                                        className='w-full object-cover h-[800px]'

                                        
                                    />
                                    </div>
                                

                             
                                ))}
                                </div>
                              <div className='absolute inset-0 flex items-center justify-center z-10'>
                                <AnimeText 
                                    text={card.title}
                                    className={`text-3xl font-bold px-4 py-2 font-apple rounded max-w-[300px] whitespace-normal break-word text-shadow-custom ${card.textColor || 'text-mainbrand-light'}`}
                                />
                              </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    
               {/* LightBox Modal  */}
            {selectedIndex !== null && (
               <div className='fixed inset-0 bg-mainbrand-dark bg-opacity-90 z-50 flex items-center justify-center'>
                <button
                onClick={closeLightbox}
                className='absolute top-4 right-4 text-mainbrand-light text-xl'
                >
                    ❌
                </button>
                <button
                onClick={previousImage}
                className='absolute left-4 text-mainbrand-light text-4xl'
                >
                    ‹
                </button>
                
                <BlurImages 
            src={images[selectedIndex].images[currentImageIndexes[selectedIndex]]} 
            alt={images[selectedIndex].alt}
            className='max-h-[90vh] max-w-[90vw] object-contain'
        />
                <button
                onClick={nextImage}
                className='absolute right-4 text-mainbrand-light text-4xl'
                >
                    ›
                </button>
                <div className='absolute bottom-2 text-mainbrand-light text-center'>
                    <h3 className='text-xl font-apple font-semibold'>{images[selectedIndex].title}</h3>
                </div>
               </div>
            )}
        </div>
    );
}