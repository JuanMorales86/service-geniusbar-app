/* empty css                                     */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_9MFPbHYP.mjs';
import 'kleur/colors';
import { $ as $$Home } from '../chunks/home_0HM2OE0W.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Home", $$Home, {})}`;
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
