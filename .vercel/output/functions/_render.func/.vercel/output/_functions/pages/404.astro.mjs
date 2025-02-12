/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_C3fX89Zu.mjs';
import { $ as $$Layout } from '../chunks/Layout_BIGIKqIB.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 Not Found", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-container" data-astro-cid-zetdm5md> <!-- <Matrix /> --> <div class="video-background" data-astro-cid-zetdm5md> <img class="iframe" src="https://midu.dev/images/this-is-fine-404.gif" alt="Error image gif" data-astro-cid-zetdm5md> </div> <div class="content" data-astro-cid-zetdm5md> <h1 class="font-sans font-bold" data-astro-cid-zetdm5md>404</h1> <p class="text-lg font-apple" data-astro-cid-zetdm5md>Página no encontrada</p> </div> </div> ` })} `;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/404.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
