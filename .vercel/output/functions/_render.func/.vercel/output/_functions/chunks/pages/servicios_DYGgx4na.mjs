/* empty css                              */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_BkI29Jvg.mjs';
import { $ as $$Layout } from './TestTurso_Dd07clhr.mjs';

const $$Astro = createAstro();
const $$Servicios = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Servicios;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mostrario Servicio Tecnico" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-gradient-blk-gray"> <div class="container mx-auto md:h-screen w-7/12"> <img src="https://i.imgur.com/3YQsqmO.jpg" class="w-full h-96 object-cover rounded-t-lg"> <div class="bg-gray-300 p-8 rounded-b-lg shadow-lg"> <h2 class="text-2xl font-bold mb-4">Reparación de Celulares</h2> <p class="mb-4">
Descripción del servicio...
</p> <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">
Cotizar
</button> </div> </div> </section> ` })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicios.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicios.astro";
const $$url = "/servicios";

export { $$Servicios as default, $$file as file, $$url as url };
