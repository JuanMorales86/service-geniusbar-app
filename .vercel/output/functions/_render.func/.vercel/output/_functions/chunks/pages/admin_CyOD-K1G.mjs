/* empty css                              */
import { c as createAstro, d as createComponent, r as renderTemplate } from '../astro_BkI29Jvg.mjs';

const $$Astro = createAstro();
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
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

export { $$Admin as default, $$file as file, $$url as url };
