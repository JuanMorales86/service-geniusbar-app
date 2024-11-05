/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BgmmEVtV.mjs';
import { $ as $$Layout } from '../chunks/Layout_BHzrqhtq.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_BPI2EKq4.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const ourServiceImages = [
    { image: "https://i.imgur.com/C30dsYG.jpg", title: "Celulares y Tablets", description: "Arreglamos pantallas, bater\xEDas, botones y m\xE1s para Marcas Apple." },
    { image: "https://i.imgur.com/zkNNKcN.jpg", title: "Computadoras", description: "Mantenimiento y reparaci\xF3n de MacBooks y iMacs." },
    { image: "https://i.imgur.com/BBitngx.jpg", title: "Placas", description: "Soluciones de soldaduras para todas las marcas y modelos." }
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Genius Bar Servicio Tecnico" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-sky-700 text-white rounded-t-lg"> <div class="container mx-auto px-6 py-16 text-center"> <h1 class="text-4xl md:text-6xl font-bold mb-4">
Servicio Técnico Profesional para tus Dispositivos
</h1> <p class="text-xl mb-8">
Reparaciones rápidas y confiables para celulares, tablets y computadoras
</p> <a href="/serviciosm" class="btn-custom-hero">
Ver Nuestros Servicios
</a> </div> </section> <section class="bg-white py-16"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Nuestros Servicios</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${ourServiceImages.map((services, index) => renderTemplate`<div class="text-center"> ${renderComponent($$result2, "Image", $$Image, { "src": services.image, "alt": services.title, "quality": "medium", "inferSize": true, "densities": [4, 4], "class": "w-auto h-5/6 rounded-lg mx-auto mb-4 shadow-md" })} <h3 class="text-xl font-semibold mb-2">${services.title}</h3> <p>${services.description}</p> </div>`)} </div> </div> </section> <section class="bg-gray-100 py-16"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Por qué elegirnos</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 "> ${whySelectUsdata.map((choose, index) => renderTemplate`<div class="bg-white p-6 rounded-lg shadow-md hover:scale-custom2 transition duration-300 ease-in-out"> <h3 class="text-xl font-semibold mb-2">${choose.title}</h3> <p>${choose.description}</p> </div>`)} </div> </div> </section> <section class="bg-white py-16"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Lo que dicen nuestros clientes</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> ${userTestimony.map((users, index) => renderTemplate`<div class="bg-gray-400 p-6 rounded-lg shadow-xl"> <p class="mb-4 text-white">${users.valoration}</p> <p class="font-semibold text-black">- ${users.username}</p> </div>`)} </div> </div> </section> <section class="bg-gray-900 text-white py-16"> <div class="container mx-auto px-6"> <div class="flex flex-col md:flex-row items-center"> <div class="md:w-3/4 mb-8 md:mb-0"> ${renderComponent($$result2, "Image", $$Image, { "src": "https://i.imgur.com/oU5Yi8f.png", "inferSize": true, "densities": [3, 3], "alt": "Genius Bar Team", "class": "rounded-lg shadow-lg" })}</div> <div class="md:w-1/2 md:pl-12"> <h2 class="text-3xl font-bold mb-4">Sobre Genius Bar</h2> <p class="mb-4"> ${aboutGen} </p> <p> ${missionGen} </p> </div> </div> </div> </section> <section class="bg-sky-700 text-white py-16"> <div class="container mx-auto px-6 text-center"> <h2 class="text-3xl font-bold mb-4">¿Listo para reparar tu dispositivo?</h2> <p class="text-xl mb-8">Contáctanos hoy mismo para obtener un diagnóstico gratuito</p> <a href="/formservice" class="btn-custom-hero">
Solicitar Servicio
</a> </div> </section> <section class="bg-gray-100 py-16"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2> <div class="space-y-4"> <div class="bg-white p-6 rounded-lg shadow"> <h3 class="text-xl font-semibold mb-2">¿Cuánto tiempo toma una reparación típica?</h3> <p>La mayoría de las reparaciones se completan en 24-48 horas, dependiendo de la complejidad y disponibilidad de piezas.</p> </div> <div class="bg-white p-6 rounded-lg shadow"> <h3 class="text-xl font-semibold mb-2">¿Ofrecen garantía en sus reparaciones?</h3> <p>Sí, todas nuestras reparaciones vienen con una garantía de 90 días en mano de obra y piezas.</p> </div> <div class="bg-white p-6 rounded-lg shadow"> <h3 class="text-xl font-semibold mb-2">¿Qué marcas de dispositivos reparan?</h3> <p>Trabajamos con todas las marcas principales, incluyendo Apple, Samsung, LG, Huawei, y más.</p> </div> <div class="bg-white p-6 rounded-lg shadow"> <h3 class="text-xl font-semibold mb-2">¿Necesito una cita previa?</h3> <p>Aunque aceptamos visitas sin cita, recomendamos agendar una para garantizar un servicio más rápido.</p> </div> </div> </div> </section> <section class="bg-white py-16 rounded-b-lg"> <div class="container mx-auto px-6"> <h2 class="text-3xl font-bold text-center mb-8">Contáctanos</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="text-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg> <p class="font-semibold">Teléfono</p> <p>+54 9 11-2356-0959</p> <p>+54 9 11-2391-7853</p> </div> <div class="text-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> <p class="font-semibold">Email</p> <p>geniusbarservice@gmail.com</p> </div> <div class="text-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <p class="font-semibold">Dirección</p> <p>Florida 537, Galerias Jardin, Local 366 PB, CABA, Argentina</p> </div> </div> </div> </section> ` })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/index.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
