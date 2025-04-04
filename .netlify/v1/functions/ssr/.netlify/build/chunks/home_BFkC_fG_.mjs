/* empty css                             */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_BN0oIdhg.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './Layout_BvMxcmfm.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';
import { B as BlurImages } from './BlurImages_6st8Dbtr.mjs';

const cl = console.log.bind(console);
function ImageLightboxSlider({ images }) {
  const containerRef = useRef(null);
  const [ispaused, setPaused] = useState(false);
  const [currentImageIndexes, setCurrentImageIndexes] = useState(() => Array(images.length).fill(0));
  const [selectedIndex, setSelectedIndex] = useState(null);
  cl(selectedIndex);
  cl(currentImageIndexes);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || images.length <= 3 || ispaused) return;
    const scrollRight = () => {
      const targetScroll = container.scrollLeft + container.clientWidth / 3;
      container.scrollTo({
        left: container.scrollLeft >= container.scrollWidth - container.clientWidth ? 0 : targetScroll,
        behavior: "smooth"
      });
    };
    const scrollInterval = setInterval(scrollRight, 2e4);
    return () => clearInterval(scrollInterval);
  }, [images.length, ispaused]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(
        (prevIndexes) => prevIndexes.map(
          (index, cardIndex) => (index + 1) % images[cardIndex].images.length
        )
      );
    }, 9e3);
    return () => clearInterval(interval);
  }, [images]);
  const closeLightbox = () => setSelectedIndex(null);
  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };
  const previousImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: containerRef,
        className: "flex overflow-x-auto space-x-6 p-6 hover:snap-x px-7 snap-mandatory ",
        onMouseEnter: () => setPaused(true),
        onMouseLeave: () => setPaused(false),
        children: images.map((card, cardIndex) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex-none w-48 lg:w-96 h-[800px] snap-start relative hover:scale-custom2 transition-all ease-in-out duration-500",
            children: /* @__PURE__ */ jsx("div", { className: `rounded-xl shadow-lg overflow-hidden h-full ease-in-out ${card.bgColor || "bg-mainbrand-light"}`, children: /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => window.location.href = card.path,
                className: "cursor-pointer relative h-full w-full",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: card.images.map((imgSrc, imgIndex) => /* @__PURE__ */ jsx("div", { className: `absolute inset-0 object-cover transition-all duration-[8000ms] ease-in-out
                                        ${currentImageIndexes[cardIndex] === imgIndex ? "opacity-100 scale-custom6" : "opacity-0 scale-custom4"}`, children: /* @__PURE__ */ jsx(
                    BlurImages,
                    {
                      src: imgSrc,
                      alt: card.alt,
                      className: "w-full object-cover h-[800px]"
                    },
                    imgIndex
                  ) }, imgIndex)) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("h3", { className: `text-3xl font-bold px-4 py-2 font-apple rounded max-w-[300px] whitespace-normal break-word text-shadow-custom ${card.textColor || "text-mainbrand-light"}`, children: card.title }) })
                ]
              }
            ) })
          },
          cardIndex
        ))
      }
    ),
    selectedIndex !== null && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-mainbrand-dark bg-opacity-90 z-50 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: closeLightbox,
          className: "absolute top-4 right-4 text-mainbrand-light text-xl",
          children: "❌"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: previousImage,
          className: "absolute left-4 text-mainbrand-light text-4xl",
          children: "‹"
        }
      ),
      /* @__PURE__ */ jsx(
        BlurImages,
        {
          src: images[selectedIndex].images[currentImageIndexes[selectedIndex]],
          alt: images[selectedIndex].alt,
          className: "max-h-[90vh] max-w-[90vw] object-contain"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: nextImage,
          className: "absolute right-4 text-mainbrand-light text-4xl",
          children: "›"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 text-mainbrand-light text-center", children: /* @__PURE__ */ jsx("h3", { className: "text-xl font-apple font-semibold", children: images[selectedIndex].title }) })
    ] })
  ] });
}

const $$Home = createComponent(($$result, $$props, $$slots) => {
  const galleryImages = [
    {
      images: [
        "https://i.imgur.com/C30dsYG.jpg",
        "https://i.imgur.com/nQhGJpy.jpg",
        "https://i.imgur.com/EdFTahl.jpg",
        "https://i.imgur.com/EFSbcxd.jpg"
      ],
      alt: "Servicios Apple",
      title: "IPhone",
      textColor: "text-mainbrand-light",
      path: "/serviceiphone"
    },
    {
      images: [
        "https://i.imgur.com/yE7tFt8.jpg",
        "https://i.imgur.com/wSRSkzR.jpg",
        "https://i.imgur.com/FnuAXMM.jpg",
        "https://i.imgur.com/FLzR2BJ.jpg"
      ],
      alt: "Servicios Apple",
      title: "MacBook",
      textColor: "text-mainbrand-light",
      path: "/servicemac"
    },
    {
      images: [
        "https://i.imgur.com/glr1Ad7.jpg",
        "https://i.imgur.com/c14BzUo.jpg",
        "https://i.imgur.com/Wwni3iI.jpg",
        "https://i.imgur.com/wdMXHy1.jpg"
      ],
      alt: "Servicios Apple",
      title: "iMac",
      textColor: "text-mainbrand-light",
      path: "/serviceimac"
    },
    {
      images: [
        "https://i.imgur.com/F9Gq85J.png",
        "https://i.imgur.com/GqmOdfP.jpg",
        "https://i.imgur.com/6n4kXao.jpg",
        "https://i.imgur.com/UiOhCVk.jpg"
      ],
      alt: "Servicios Apple",
      title: "Placas",
      textColor: "text-mainbrand-light",
      bgColor: "bg-mainbrand-dark",
      path: "/serviceplacas"
    },
    {
      images: [
        "https://i.imgur.com/Fp85sfh.jpg",
        "https://i.imgur.com/L3KfcrY.jpg",
        "https://i.imgur.com/2c8wjmb.jpg",
        "https://i.imgur.com/C6Nxi7K.jpg"
      ],
      alt: "Servicios Apple",
      title: "iPads",
      path: "/serviceipad"
    },
    {
      images: [
        "https://i.imgur.com/2wXcn2t.jpg",
        "https://i.imgur.com/JRYItAL.jpg",
        "https://i.imgur.com/XRT8a93.jpg",
        "https://i.imgur.com/rm3Q1tU.jpg"
      ],
      alt: "Servicios Apple",
      title: "Apple Watch",
      textColor: "text-mainbrand-light",
      path: "/serviceapplewatch"
    },
    {
      images: [
        "https://i.imgur.com/JBXETLS.jpg",
        "https://i.imgur.com/P9nXzbB.jpg",
        "https://i.imgur.com/Jr3EApO.jpg",
        "https://i.imgur.com/vVLdrf8.jpg",
        "https://i.imgur.com/5Dh5t2L.jpg"
      ],
      alt: "Servicios Apple",
      title: "MagSafe",
      textColor: "text-mainbrand-light",
      path: "/servicemagsafe"
    },
    {
      images: [
        "https://i.imgur.com/dPf5FtL.jpg",
        "https://i.imgur.com/rQ7P7QH.png",
        "https://i.imgur.com/vVAnm8B.jpg",
        "https://i.imgur.com/7zq5NGl.jpg"
      ],
      alt: "Servicios Apple",
      title: "Consultas",
      textColor: "text-sky-700",
      path: "/serviceconsultas"
    }
  ];
  const ourServiceImages = [
    { image: "https://imgur.com/C30dsYG.jpg", title: "Celulares y Tablets", description: "Arreglamos pantallas, bater\xEDas, botones y m\xE1s para Marcas Apple." },
    { image: "https://imgur.com/zkNNKcN.jpg", title: "Computadoras", description: "Mantenimiento y reparaci\xF3n de MacBooks y iMacs." },
    { image: "https://imgur.com/BBitngx.jpg", title: "Placas", description: "Soluciones de soldaduras para todas las marcas y modelos." }
  ];
  const plusServices = [
    { image: "https://i.imgur.com/zX9OKvw.png", title: "MacBooks & iPhones", description: "Alta experiencia en recuperaciones rapidas de equipos mojados y fallas por cortos circuitos" }
  ];
  const whySelectUsdata = [
    { title: "T\xE9cnicos Expertos", description: "Nuestro equipo est\xE1 altamente capacitado y certificado." },
    { title: "Reparaciones R\xE1pidas", description: "La mayor\xEDa de las reparaciones se completan en el mismo d\xEDa." },
    { title: "Garant\xEDa de Calidad", description: "Ofrecemos una garant\xEDa de 90 d\xEDas en todas nuestras reparaciones." },
    { title: "Precios Justos", description: "Ofrecemos precios competitivos y accesibles." }
  ];
  const userTestimony = [
    { valoration: "Excelente servicio. Repararon mi celular en menos de 2 horas. Muy recomendado.", username: "- Mar\xEDa G" },
    { valoration: "Profesionales y eficientes. Salvaron mi laptop cuando pens\xE9 que estaba perdida.", username: "- Carlos R." },
    { valoration: "Precios justos y trabajo de calidad. Definitivamente volver\xE9 si necesito m\xE1s reparaciones.", username: "- Ana L." },
    { valoration: "Atenci\xF3n personalizada y soluciones efectivas. Recomiendo ampliamente.", username: "- Pedro M." },
    { valoration: "Servicio r\xE1pido y confiable. Arreglaron mi tablet en el mismo d\xEDa. Estoy muy satisfecho.", username: "- Laura S." },
    { valoration: "Excelente atenci\xF3n al cliente y conocimientos t\xE9cnicos. Resolvieron un problema complejo con mi PC.", username: "- Javier D." }
  ];
  const aboutGen = "En Genius Bar, nos dedicamos a proporcionar servicios t\xE9cnicos de alta calidad para tus dispositivos electr\xF3nicos. Con a\xF1os de experiencia y un equipo de t\xE9cnicos altamente capacitados, estamos comprometidos a ofrecer soluciones r\xE1pidas y confiables.";
  const missionGen = "  Nuestra misi\xF3n es mantener tus dispositivos funcionando perfectamente, minimizando el tiempo de inactividad y maximizando tu productividad y satisfacci\xF3n.";
  const seoData = {
    title: "Genius Bar Service - Reparaci\xF3n Apple en Argentina",
    description: "Servicio t\xE9cnico especializado en reparaci\xF3n de iPhones, MacBooks, iPads y m\xE1s. Garant\xEDa en todas nuestras reparaciones. Ubicados en Florida 537, Galer\xEDas Jard\xEDn, Local 366 PB, CABA.",
    keywords: "reparaci\xF3n Apple, servicio t\xE9cnico iPhone, reparaci\xF3n MacBook, arreglo iPad, Genius Bar Argentina, mantenimiento Apple",
    image: "https://i.imgur.com/UJ4wmM6.png?format=webp",
    url: "https://geniusbarservice.com/"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...seoData }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-mainbrand-dark dark:bg-sky-700 text-mainbrand-light rounded-t-lg "> <div class="container mx-auto px-6 py-16 text-center"> <h1 class="text-4xl md:text-6xl font-bold mb-4">
Servicio Técnico Profesional para tus Dispositivos
</h1> <p class="text-xl mb-8">
Reparaciones rápidas y confiables para celulares, tablets y computadoras
</p> <a href="/serviciosm" class="btn-custom-hero">
Ver Nuestros Servicios
</a> </div> </section>  <section class="bg-mainbrand-light dark:bg-mainbrand-dark text-mainbrand-dark dark:text-mainbrand-light py-16"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Nuestros Servicios</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${ourServiceImages.map(async (services) => {
    return (
      // <div class="text-center" >
      //   <Image src={services.image} alt={services.title} quality="medium" inferSize densities={[4,4]} class="w-auto h-5/6 rounded-lg mx-auto mb-4 shadow-md" loading={"lazy"}/>
      //   <h3 class="text-xl font-semibold mb-2">{services.title}</h3>
      //   <p>{services.description}</p>
      // </div>
      renderTemplate`<div class="text-center"> ${renderComponent($$result2, "BlurImages", BlurImages, { "client:visible": true, "src": services.image, "alt": services.title, "className": "w-auto h-80 rounded-lg mx-auto mb-4 shadow-md ", "client:component-hydration": "visible", "client:component-path": "@/components/BlurImages.tsx", "client:component-export": "default" })} <h3 class="text-xl font-semibold mb-2">${services.title}</h3> <p>${services.description}</p> </div>`
    );
  })} </div> <div class="grid grid-cols-1 mt-24 "> ${plusServices.map(
    async (services) => {
      return renderTemplate`<div class="text-center"> ${renderComponent($$result2, "BlurImages", BlurImages, { "client:visible": true, "src": services.image, "alt": services.title, "className": "w-auto h-auto lg:h-[500px] lg:w-full rounded-lg mx-auto mb-4 shadow-md object-cover", "client:component-hydration": "visible", "client:component-path": "@/components/BlurImages.tsx", "client:component-export": "default" })} <h3 class="text-xl font-semibold mb-2">${services.title}</h3> <p>${services.description}</p> </div>`;
    }
  )} </div> </div> </section>  <section class=""> <div class=""> <h2></h2> ${renderComponent($$result2, "ImageLightboxSlider", ImageLightboxSlider, { "client:visible": true, "images": galleryImages, "client:component-hydration": "visible", "client:component-path": "@/components/CardSliders", "client:component-export": "default" })} </div> </section>  <section class="bg-mainbrand-dark dark:bg-mainbrand-light text-mainbrand-light dark:text-mainbrand-dark py-16"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Por qué elegirnos?</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 "> ${whySelectUsdata.map((choose) => renderTemplate`<div class="bg-gray-esp text-mainbrand-dark p-6 rounded-lg shadow-md hover:scale-custom2 transition duration-300 ease-in-out"> <h3 class="text-xl font-semibold mb-2">${choose.title}</h3> <p>${choose.description}</p> </div>`)} </div> </div> </section>  <section class="bg-mainbrand-light dark:bg-mainbrand-dark text-mainbrand-dark dark:text-mainbrand-light md:text-lg smd:text-md py-16"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Lo que dicen nuestros clientes!</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${userTestimony.map((users) => renderTemplate`<div class="bg-gray-esp p-6 rounded-lg shadow-xl hover:scale-custom2 transition duration-300 ease-in-out"> <p class="font-semibolb mb-4 text-mainbrand-dark">${users.valoration}</p> <p class="font-semibold text-black">- ${users.username}</p> </div>`)} </div> </div> </section>  <section class="bg-gray-900 dark:bg-mainbrand-light dark:text-mainbrand-dark text-white py-16"> <div class="container mx-auto px-6"> <div class="flex flex-col md:flex-row items-center"> <div class="md:w-3/4 mb-8 md:mb-0"> <!-- <Image src="https://i.imgur.com/oU5Yi8f.png" inferSize densities={[3,3]} alt="Genius Bar Team" class="rounded-lg shadow-lg dark:ring-4 dark:ring-mainbrand-light "> --> ${renderComponent($$result2, "BlurImages", BlurImages, { "client:visible": true, "src": "https://i.imgur.com/oU5Yi8f.png", "alt": "Genius Bar Team", "className": "rounded-lg shadow-lg dark:ring-4 dark:ring-mainbrand-light ", "client:component-hydration": "visible", "client:component-path": "@/components/BlurImages.tsx", "client:component-export": "default" })} </div> <div class="md:w-1/2 md:pl-12 text-center md:text-left"> <h2 class="text-3xl font-bold mb-4">Sobre Genius Bar</h2> <p class="mb-4"> ${aboutGen} </p> <p> ${missionGen} </p> </div> </div> </div> </section>  <section class="bg-sky-700  dark:bg-sky-700 text-mainbrand-light py-16"> <div class="container mx-auto px-6 text-center"> <h2 class="text-3xl font-bold mb-4">¿Listo para reparar tu dispositivo?</h2> <p class="text-xl mb-8">Contáctanos hoy mismo para obtener un diagnóstico gratuito</p> <a href="/formservice" class="btn-custom-hero">
Solicitar Servicio
</a> </div> </section>  <section class="bg-mainbrand-light dark:bg-mainbrand-dark text-mainbrand-dark  dark:text-mainbrand-light py-16"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Preguntas Frecuentes:</h2> <!-- FAQ Cards --> <div class="space-y-4"> <div class="bg-gray-esp dark:bg-mainbrand-light dark:text-mainbrand-dark p-6 rounded-lg shadow"> <h3 class="text-xl font-semibold mb-2">¿Cuánto tiempo toma una reparación típica?</h3> <p>La mayoría de las reparaciones se completan en 24-48 horas, dependiendo de la complejidad y disponibilidad de piezas.</p> </div> <div class="bg-gray-esp dark:bg-mainbrand-light dark:text-mainbrand-dark p-6 rounded-lg shadow"> <h3 class="text-xl font-semibold mb-2">¿Ofrecen garantía en sus reparaciones?</h3> <p>Sí, todas nuestras reparaciones vienen con una garantía de 90 días en mano de obra y piezas.</p> </div> <div class="bg-gray-esp dark:bg-mainbrand-light dark:text-mainbrand-dark p-6 rounded-lg shadow"> <h3 class="text-xl font-semibold mb-2">¿Qué marcas de dispositivos reparan?</h3> <p>Trabajamos con todas las marcas principales, incluyendo Apple, Samsung, LG, Huawei, y más.</p> </div> <div class="bg-gray-esp dark:bg-mainbrand-light dark:text-mainbrand-dark p-6 rounded-lg shadow"> <h3 class="text-xl font-semibold mb-2">¿Necesito una cita previa?</h3> <p>No, atendemos en el momento, puedes acercarte dentro del horario.</p> </div> </div> </div> </section>  <section class="bg-sky-700 dark:bg-sky-700 text-mainbrand-light dark:text-mainbrand-light py-16 rounded-b-lg"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Contáctanos</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="text-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-4 text-blue-500 dark:text-mainbrand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> <p class="font-bold">Teléfono</p> <a href="https://wa.me/5491123560959?text=Hola,%20quisiera%20más%20información%20sobre%20sus%20servicios" target="_blank" rel="noopener noreferrer"><p class="font-semibold">+54 9 11-2356-0959</p></a> </div> <div class="text-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-4 text-blue-500 dark:text-mainbrand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> <p class="font-bold animate-bounce transition-all duration-500 hover:animate-none">Email</p> <a href="mailto:geniusbarservices.ar@gmail.com" class="hover:text-blue-500 transition-colors font-semibold ">geniusbarservices.ar@gmail.com</a> </div> <div class="text-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-4 text-blue-500 dark:text-mainbrand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <p class="font-bold">Dirección</p> <p class="font-semibold">Florida 537, Galerias Jardin, Local 366 PB, CABA, Argentina</p> </div> </div> </div> </section> ` })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/home.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/home.astro";
const $$url = "/home";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Home,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Home as $, _page as _ };
