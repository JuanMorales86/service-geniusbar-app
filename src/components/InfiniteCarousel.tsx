

interface CarouselText {
    firstRow: string[];
    secondRow: string[];
}


interface InfiniteCarouselProps {
    texts: CarouselText;
    gradientColors?: {
        firstRow:  {
            from: string;
            to: string;
        };
        secondRow: {
            from: string;
            to: string;
        };
    };
}


const InfiniteCarousel = ({
    texts,
    gradientColors = {
        firstRow: { from: 'sky-500', to: 'purple-medium' },
        secondRow: { from: 'prueple-deeppurple', to: 'pink-rosegold' },
    }
}: InfiniteCarouselProps) => {

    return (
        <div className=" relative overflow-hidden py-8 bg-gradient-to-r from-mainbrand-dark to-gray-600 dark:from-gray-400 dark:to-mainbrand-dark rounded-lg h-full w-full place-content-center  ">
            <div className="w-[200%] inline-flex flex-nowrap">
                {/* First Row - moving rigth */}
                <div className="flex animate-scroll-right items-center whitespace-nowrap">
                    {texts.firstRow.map((text, i) => (
                    <span
                    key={i}
                    className={`mx-4 text-2xl font-apple font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-esp hover:scale-custom3 transition-all duration-300 ease-in-out hover:text-whiteFloral hover:bg-sky-300 rounded-btn hover:cursor-pointer`}
                    >
                        • {text}  
                    </span>
                    ))}
                     {texts.firstRow.map((text, i) => (
                    <span
                    key={`duplicate-${i}`}
                    className={`mx-4 text-2xl font-apple font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-esp hover:scale-custom3 transition-all duration-300 ease-in-out hover:text-whiteFloral hover:bg-sky-300 rounded-btn hover:cursor-pointer`}
                    >
                         • {text} 
                    </span>
                    ))}
                </div>
            </div>

            <div className="w-[200%] inline-flex flex-nowrap mt-8">
                {/* First Row - moving rigth */}
                <div className="flex animate-scroll-left items-center whitespace-nowrap">
                    {texts.firstRow.map((text, i) => (
                    <span
                    key={i}
                    className={`mx-4 text-2xl font-apple font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-esp hover:scale-custom3 transition-all duration-300 ease-in-out hover:text-whiteFloral hover:bg-sky-300 rounded-btn hover:cursor-pointer`}
                    >
                        • {text}  
                    </span>
                    ))}
                     {texts.firstRow.map((text, i) => (
                    <span
                    key={`duplicate-${i}`}
                    className={`mx-4 text-2xl font-apple font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-esp hover:scale-custom3 transition-all duration-300 ease-in-out hover:text-whiteFloral hover:bg-sky-300 rounded-btn hover:cursor-pointer`}
                    >
                         • {text} 
                    </span>
                    ))}
                </div>
            </div>

            

                {/* Second Row - moving left */}
                <div className="w-[200%] inline-flex flex-nowrap mt-8">
                    <div className="flex animate-scroll-right items-center whitespace-nowrap">
                        {texts.secondRow.map((text, i) => (
                        <span
                        key={i}
                        className={`mx-4 text-2xl font-apple font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-whiteFloral hover:scale-custom3 transition-all duration-300 ease-in-out hover:text-whiteFloral hover:bg-sky-300 rounded-btn hover:cursor-pointer`}
                        >
                            • {text}  
                        </span>
                        ))}

                        {texts.secondRow.map((text, i) => (
                        <span
                        key={`duplicate-${i}`}
                        className={`mx-4 text-2xl font-apple font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-whiteFloral hover:scale-custom3 transition-all duration-300 ease-in-out hover:text-whiteFloral hover:bg-sky-300 rounded-btn hover:cursor-pointer`}
                        >
                            • {text}  
                        </span>
                        ))}

                    </div>
                </div>

                 {/* Second Row - moving left */}
                 <div className="w-[200%] inline-flex flex-nowrap mt-8">
                    <div className="flex animate-scroll-left items-center whitespace-nowrap">
                        {texts.secondRow.map((text, i) => (
                        <span
                        key={i}
                        className={`mx-4 text-2xl font-apple font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-whiteFloral hover:scale-custom3 transition-all duration-300 ease-in-out hover:text-whiteFloral hover:bg-sky-300 rounded-btn hover:cursor-pointer`}
                        >
                            • {text}  
                        </span>
                        ))}

                        {texts.secondRow.map((text, i) => (
                        <span
                        key={`duplicate-${i}`}
                        className={`mx-4 text-2xl font-apple font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-whiteFloral hover:scale-custom3 transition-all duration-300 ease-in-out hover:text-whiteFloral hover:bg-sky-300 rounded-btn hover:cursor-pointer`}
                        >
                            • {text}  
                        </span>
                        ))}

                    </div>
                </div>


            
        </div>
    );
};

export default InfiniteCarousel;