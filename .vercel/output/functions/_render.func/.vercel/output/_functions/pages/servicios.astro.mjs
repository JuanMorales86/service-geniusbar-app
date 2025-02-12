/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_C3fX89Zu.mjs';
import { $ as $$Layout } from '../chunks/Layout_BIGIKqIB.mjs';
export { renderers } from '../renderers.mjs';

const $$Servicios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Genius Bar Servicio Tecnico" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-gradient-to-b from-blk-gray-dark via-blk-gray-dark to-blk-gray-light"> <div class="container mx-auto md:h-screen w-7/12"> <img src="https://i.imgur.com/3YQsqmO.jpg" class="w-full h-96 object-cover rounded-t-lg"> <div class="bg-gray-300 p-8 rounded-b-lg shadow-lg"> <h2 class="text-2xl font-bold mb-4">Reparación de Celulares</h2> <p class="mb-4">
Descripción del servicio...
</p> <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">
Cotizar
</button> </div> </div> </section> ` })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicios.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicios.astro";
const $$url = "/servicios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Servicios,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
