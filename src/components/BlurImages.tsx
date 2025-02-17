import { useEffect, useState, useRef } from "react";

interface BlurImagesProps {
    src: string;
    alt: string;
    className?: string;
    width?: string | "800px";
    height?: string | "600px";
}

export default function BlurImages({
    src,
    alt,
    className = '',
    width,
    height,
}: BlurImagesProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const image = entries[0];
                if (image.isIntersecting) {
                    const imageElement = new Image();
                    imageElement.src = src;
                    imageElement.onload = () => {
                        setIsLoaded(true);
                    };
                    observer.unobserve(image.target);
                }
            },
            { threshold: 0.1 }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => observer.disconnect();
    }, [src]);


    return (
        <div ref={imageRef} className="relative overflow-hidden">
            <div 
                className={`${className} absolute inset-0 blur-2xl scale-105 transition-opacity duration-500`}
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: isLoaded ? 0 : 1
                }}
            />
            <picture>
                <source srcSet={src} type="image/webp" />
            <img
                src={src.replace('?format=webp', '')}
                alt={alt}
                className={`${className} transition-opacity duration-1000`}
                style={{ opacity: isLoaded ? 1 : 0 }}
                loading="lazy"
                width={width}
                height={height}
            />
            </picture>
        </div>
    );
}