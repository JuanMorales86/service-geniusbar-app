/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_BgmmEVtV.mjs';
import { $ as $$Layout } from '../chunks/Layout_BHzrqhtq.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import React from 'react';
/* empty css                                              */
export { renderers } from '../renderers.mjs';

console.log.bind(console);
const ParallaxServices = ({ services }) => {
  const [hoveredIndex, setIsHoveredIndex] = React.useState(-1);
  const sectionRefs = React.useRef([]);
  const backgroundsRefs = React.useRef([]);
  React.useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const baseOffset = rect.top - window.innerHeight / 2;
        const factor = 0.1 + 0.05 * Math.min(index, 4);
        const offset = baseOffset * factor;
        if (backgroundsRefs.current[index]) {
          backgroundsRefs.current[index].style.transform = `translateY(${-offset * 1.5}px)`;
        }
        section.style.transform = `translateY(${offset * 0.5}px)`;
        const opacity = Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight / 2));
        section.querySelector(".content").style.opacity = opacity;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "parallax-container ", children: services.map((service, index) => /* @__PURE__ */ jsxs(
    "section",
    {
      ref: (el) => sectionRefs.current[index] = el,
      className: "parallax-section relative min-h-screen flex items-center justify-center overflow-hidden group",
      onMouseEnter: () => setIsHoveredIndex(index),
      onMouseLeave: () => setIsHoveredIndex(-1),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: (el) => backgroundsRefs.current[index] = el,
            className: "absolute  inset-0 bg-contain bg-top bg-no-repeat rounded-xl ",
            style: {
              backgroundImage: ` url(${service.image})`,
              backgroundPosition: "center -50px",
              backgroundSize: "contain"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "content relative z-10 text-white text-center p-8 bg-black bg-opacity-50 rounded-lg transition-opacity duration-700", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold ", children: service.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xl p-12 font-semibold", children: service.description })
        ] })
      ]
    },
    index
  )) });
};

const $$Servicedescription = createComponent(($$result, $$props, $$slots) => {
  const detailServices = [
    {
      title: "Cambio de Pantallas",
      description: "Nuestro servicio de cambio de pantallas se enfoca en el reemplazo de pantallas da\xF1adas o rotas para restaurar la funcionalidad y la est\xE9tica del dispositivo.",
      image: "https://i.imgur.com/maICruG.png"
    },
    {
      title: "Cambio de Baterias",
      description: "Con nuestro servicio de cambio de baterias, podr\xE1s sustituir las bater\xEDas agotadas o falladas en tu equipo celular, tablet o pc portatil, lo que aumenta su duraci\xF3n de vida y su desempe\xF1o.",
      image: "https://i.imgur.com/RGIN6yq.png"
    },
    {
      title: "Cambio de Carcazas",
      description: "Nuestro servicio de cambio de carcasa completa te permite reemplazar la carcasa da\xF1ada o deteriorada de tu celular y darle un aspecto nuevo y fresco.",
      image: "https://i.imgur.com/oU5Yi8f.png"
    },
    {
      title: "Cambio de Pines de Carga",
      description: "Si el puerto de carga de tu celular est\xE1 defectuoso, nuestro servicio de cambio de pines de carga te permitir\xE1 reemplazar los soldadura que est\xE1n fallando para restaurar la funcionalidad del dispositivo.",
      image: "https://i.imgur.com/Rzly3iL.png"
    },
    {
      title: "Reparacion con Microsoldaduras",
      description: "Nuestra oferta de reparaci\xF3n con microsoldaduras se enfoca en la reparaci\xF3n de placas, ICs de carga y ICs de t\xE1ctiles utilizando t\xE9cnicas de micro soldadura especializadas. Esto incluye la reparaci\xF3n de placas da\xF1adas o rotas, los problemas de conexi\xF3n de los ICs y los problemas relacionados con los pines de carga, entre otras.",
      image: "https://i.imgur.com/GpHQn3C.png"
    },
    {
      title: "Reparaciones Multimarcas",
      description: "Nuestra oferta de reparaciones multimarcas se enfoca en la reparaci\xF3n de diferentes marcas de celulares, incluidos iPhone, Android y BlackBerry. Con nuestro servicio podr\xE1s restaurar el funcionamiento de tu dispositivo y asegurarte de que pueda ser utilizado nuevamente sin problemas.",
      image: "https://i.imgur.com/mAxgfP1.png"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Servicios Detalles \u{1F4F1} GeniusBar", "data-astro-cid-l4easj7h": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ParallaxServices", ParallaxServices, { "services": detailServices, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/parallaxServices", "client:component-export": "default", "data-astro-cid-l4easj7h": true })} ` })} `;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicedescription.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicedescription.astro";
const $$url = "/servicedescription";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
   __proto__: null,
   default: $$Servicedescription,
   file: $$file,
   url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
