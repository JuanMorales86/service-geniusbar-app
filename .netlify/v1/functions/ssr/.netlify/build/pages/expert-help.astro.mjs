/* empty css                                     */
import { c as createComponent, b as createAstro } from '../chunks/astro/server_9MFPbHYP.mjs';
import 'kleur/colors';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ExpertHelp = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ExpertHelp;
  return Astro2.redirect("/formservice");
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/expert-help.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/expert-help.astro";
const $$url = "/expert-help";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ExpertHelp,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
