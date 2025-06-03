import React from "react";

interface BlurImagesProps {
    src: string;
    alt: string;
    className?: string;
    fixedsize?: boolean;
}



export default function BlurImages({
    src,
    alt,
    className = '',
    fixedsize = false,
}: BlurImagesProps) {

    
    // Solución extremadamente básica: solo mostrar la imagen
    return (
        <div className="relative">
            <img
                src={src}
                alt={alt}
                className={className}
                style={fixedsize ? {width: '600px', height: '400px'} : undefined}
                loading="lazy"
            />
        </div>
    );
}