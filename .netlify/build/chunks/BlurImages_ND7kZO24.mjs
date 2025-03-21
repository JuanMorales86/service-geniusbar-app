import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

function BlurImages({
  src,
  alt,
  className = "",
  width,
  height
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);
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
  return /* @__PURE__ */ jsxs("div", { ref: imageRef, className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `${className} absolute inset-0 blur-2xl scale-105 transition-opacity duration-500`,
        style: {
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isLoaded ? 0 : 1
        }
      }
    ),
    /* @__PURE__ */ jsxs("picture", { children: [
      /* @__PURE__ */ jsx("source", { srcSet: src, type: "image/webp" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: src.replace("?format=webp", ""),
          alt,
          className: `${className} transition-opacity duration-1000`,
          style: { opacity: isLoaded ? 1 : 0 },
          loading: "lazy",
          width,
          height
        }
      )
    ] })
  ] });
}

export { BlurImages as B };
