import React from "react"; 

const cl = console.log.bind(console);

const ParallaxServices = ({services}) => {
    const [hoveredIndex, setIsHoveredIndex] = React.useState(-1)
    const sectionRefs = React.useRef([]);
    const backgroundsRefs = React.useRef([]);

   
    React.useEffect(() => {
        const handleScroll = () => {
            // const scrollPosition = window.scrollY;
            sectionRefs.current.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const baseOffset = rect.top - window.innerHeight / 2;
                const factor = 0.1 + (0.05 * Math.min(index, 4));// Limita el crecimiento del factor
                const offset = baseOffset * factor;

                if (backgroundsRefs.current[index]){
                    backgroundsRefs.current[index].style.transform = `translateY(${-offset * 1.5}px)`
                }

                section.style.transform = `translateY(${offset * 0.5}px)`;

                const opacity = Math.min(1,(window.innerHeight - rect.top) / (window.innerHeight / 2));
                section.querySelector('.content').style.opacity = opacity
            })
        }
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return (
        <div className="parallax-container ">
            {services.map((service, index) => (
                <section
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="parallax-section relative min-h-screen flex items-center justify-center overflow-hidden group"
                onMouseEnter={() => setIsHoveredIndex(index)}
                onMouseLeave={() => setIsHoveredIndex(-1)}
                >
                    <div 
                    ref = {(el) => (backgroundsRefs.current[index] = el)}
                    className={"absolute  inset-0 bg-contain bg-top bg-no-repeat rounded-xl "}
                    style={{backgroundImage: ` url(${service.image})`,
                    backgroundPosition: 'center -50px', backgroundSize: 'contain',    
                }}>
                    </div>
                        <div className="content relative z-10 text-white text-center p-8 bg-black bg-opacity-50 rounded-lg transition-opacity duration-700">
                            <h2 className="text-4xl font-bold ">{service.title}</h2>
                            <p className="text-xl p-12 font-semibold">{service.description}</p>
                        </div>
                </section>
            ))}

        </div>
    )
}

export default ParallaxServices;