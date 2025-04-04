import React from "react";

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

    
    // Solución extremadamente básica: solo mostrar la imagen
    return (
        <div className="relative">
            <img
                src={src}
                alt={alt}
                className={className}
                width={width}
                height={height}
                loading="lazy"
            />
        </div>
    );
}