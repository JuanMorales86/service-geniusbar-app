/* empty css                                     */
import { c as createComponent, a as createAstro, r as renderTemplate } from '../chunks/astro/server_BSg9zxmn.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Admin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Admin;
  const user = Astro2.locals.user;
  if (!user) {
    return Astro2.redirect("/signin");
  }
  return renderTemplate``;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/admin.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
