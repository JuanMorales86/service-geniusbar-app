/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent } from '../chunks/astro/server_BgmmEVtV.mjs';
import { $ as $$Layout } from '../chunks/Layout_BHzrqhtq.mjs';
export { renderers } from '../renderers.mjs';

const $$ServiceOrders = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Ordernes de Servicios \u{1F9D1}\u200D\u{1F4BB}" })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/service-orders.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/service-orders.astro";
const $$url = "/service-orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ServiceOrders,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
