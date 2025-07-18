import { useEffect, useRef, type ReactElement } from "react";
import {gsap} from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { FaArrowDown } from 'react-icons/fa';



gsap.registerPlugin(ScrollTrigger);

interface Service {
    title: String;
    description: string;
    image: string;
}

interface ParallaxProps {
    services: Service[];
}

const ParallaxServicesGSAP = ({services}: ParallaxProps): ReactElement => {
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const backgroundsRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        sectionRefs.current.forEach((section, index)  => {
            if(!section) return;

            const background = backgroundsRefs.current[index];
            const content = section.querySelector('.content');


            if (background && content) {
                // Create a timeline for each section
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=100%",
                        pin: true, //Optional Pin the element in place
                        scrub: 1, //Smooth scrubbing
                        anticipatePin: 1, //Anticipate the pin
                        snap: {
                            snapTo: 1, //Snap to the middle of the section
                            duration: { min: 0.2, max: 0.5 }, //Duration of the snap animation
                            ease: "power1.inOut",
                        },
                        // onLeave: () => console.log(`Section ${index} entered`),
                        // onEnterBack: () => console.log(`Section ${index} exited`),
                    }
                });

                // Add animations to the timeline
                tl.fromTo(background,
                    { y:0, 
                      opacity: 0, //start with 0 opacity
                    },
                    { 
                        y: -50,
                        opacity: 1, //end with 1 opacity
                        duration: 1,
                        ease: "power2.out",

                    }
                ).fromTo(content,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0 },
                    "<" // Start at the same time as the previous animation
                );
            }
        })
        return () =>{ 
            ScrollTrigger.getAll().forEach(triggeR => triggeR.kill())
        };
    }, []);
    
    return (
        <section className="parallax-services w-full">
            {services.map((service, index) => (
                <section
                key={index}
                ref={el => {sectionRefs.current[index] = el}}
                id={index === 0 ? 'first-parallax-service-item' : undefined} //OJO
                className="parallax-section relative w-screen h-screen flex items-center justify-center overflow-hidden"
                >
                   <div 
                   ref={el => {backgroundsRefs.current[index] = el}}
                   className="absolute top-0 left-0 w-full h-full"
                   style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover", /// Adjust the background size as needed
                    width: "100vw", // Adjust the width as needed
                    height: "1200px", // Adjust the height as needed
                    objectFit: "contain",
                    // transform: "translateZ(0)", //Hardware acceleration
                }}>
                </div>
                <div className="content relative z-10 text-white text-center p-8 bg-mainbrand-dark bg-opacity-50 rounded-lg max-w-4xl mx-auto">
                 <h2 className="md:text-4xl size-auto font-bold">{service.title}</h2>
                 <p className="md:text-xl text-auto p-4 font-semibold">{service.description}</p>
                 <a href="/formservice"
                 className="btn-custom-hero animate-pulse transition all duration-300 hover:animate-none hover:shadow-lg"
                 >
                    Consultas Gratuitas
                 </a>
                </div>

               
                        <div className="absolute flex-col content-center z-100 text-center">
                            {/* Pass className and other props directly */}
                            <FaArrowDown className="w-full h-10 text-white drop-shadow-lg" /> 
                            <p className="text-white text-sm mt-2">Desliza para ver más</p>
                        </div>
                 
                </section>
            ))}
        </section>
    );
}

export default ParallaxServicesGSAP;