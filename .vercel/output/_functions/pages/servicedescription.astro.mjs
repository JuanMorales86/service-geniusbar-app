/* empty css                                     */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BSg9zxmn.mjs';
import { $ as $$Layout } from '../chunks/Layout_NmlKdCw_.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';
/* empty css                                              */
export { renderers } from '../renderers.mjs';

gsap.registerPlugin(ScrollTrigger);
const ParallaxServicesGSAP = ({ services }) => {
  const sectionRefs = useRef([]);
  const backgroundsRefs = useRef([]);
  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      const background = backgroundsRefs.current[index];
      const content = section.querySelector(".content");
      if (background && content) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            //Optional Pin the element in place
            scrub: 1,
            //Smooth scrubbing
            anticipatePin: 1,
            //Anticipate the pin
            snap: {
              snapTo: 1,
              //Snap to the middle of the section
              duration: { min: 0.2, max: 0.5 },
              //Duration of the snap animation
              ease: "power1.inOut"
            }
            // onLeave: () => console.log(`Section ${index} entered`),
            // onEnterBack: () => console.log(`Section ${index} exited`),
          }
        });
        tl.fromTo(
          background,
          {
            y: 0,
            opacity: 0
            //start with 0 opacity
          },
          {
            y: -50,
            opacity: 1,
            //end with 1 opacity
            duration: 1,
            ease: "power2.out"
          }
        ).fromTo(
          content,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0 },
          "<"
          // Start at the same time as the previous animation
        );
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((triggeR) => triggeR.kill());
    };
  }, []);
  return /* @__PURE__ */ jsx("section", { className: "parallax-services w-full", children: services.map((service, index) => /* @__PURE__ */ jsxs(
    "section",
    {
      ref: (el) => {
        sectionRefs.current[index] = el;
      },
      className: "parallax-section relative w-screen h-screen flex items-center justify-center overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: (el) => {
              backgroundsRefs.current[index] = el;
            },
            className: "absolute top-0 left-0 w-full h-full",
            style: {
              backgroundImage: `url(${service.image})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              /// Adjust the background size as needed
              width: "100vw",
              // Adjust the width as needed
              height: "900px"
              // Adjust the height as needed
              // transform: "translateZ(0)", //Hardware acceleration
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "content relative z-10 text-white text-center p-8 bg-mainbrand-dark bg-opacity-50 rounded-lg max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold", children: service.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xl p-12 font-semibold", children: service.description }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/formservice",
              className: "btn-custom-hero animate-pulse transition all duration-300 hover:animate-none hover:shadow-lg",
              children: "Consultas Gratuitas"
            }
          )
        ] })
      ]
    },
    index
  )) });
};

const $$Servicedescription = createComponent(($$result, $$props, $$slots) => {
  const seoData = {
    title: "Servicios Detallados \u{1F4F1} GeniusBar",
    description: "Servicio t\xE9cnico especializado en dispositivos Apple",
    keywords: "iniciar sesi\xF3n, login Genius Bar, acceder cuenta servicio t\xE9cnico Apple, seguimiento de reparaciones, Genius Bar Argentina",
    image: "https://i.imgur.com/xYGD6SF.jpg?format=webp",
    url: "https://geniusbarservice.com/signin"
  };
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...seoData, "data-astro-cid-l4easj7h": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ParallaxServicesGSAP", ParallaxServicesGSAP, { "services": detailServices, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/parallaxServicesGSAP", "client:component-export": "default", "data-astro-cid-l4easj7h": true })} ${maybeRenderHead()}<section class="bg-sky-700 text-white py-16 mt-4" data-astro-cid-l4easj7h> <div class="container mx-auto px-6 text-center" data-astro-cid-l4easj7h> <h2 class="text-3xl font-bold mb-4" data-astro-cid-l4easj7h>¿Listo para reparar tu dispositivo?</h2> <p class="text-xl mb-8" data-astro-cid-l4easj7h>Contáctanos hoy mismo para obtener un diagnóstico gratuito</p> <a href="/formservice" class="btn-custom-hero" data-astro-cid-l4easj7h>
Solicitar Servicio
</a> </div> </section> ` })} `;
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
