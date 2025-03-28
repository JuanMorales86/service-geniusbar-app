import { c as createComponent, b as createAstro, m as maybeRenderHead, l as addAttribute, a as renderTemplate } from './astro/server_9MFPbHYP.mjs';
import 'kleur/colors';

const $$Astro = createAstro();
const $$IcoAtom = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$IcoAtom;
  const { slot: direction, wi, he } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(direction, "slot")} xmlns="http://www.w3.org/2000/svg"${addAttribute(wi, "width")}${addAttribute(he, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-atom"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12v.01"></path><path d="M19.071 4.929c-1.562 -1.562 -6 .337 -9.9 4.243c-3.905 3.905 -5.804 8.337 -4.242 9.9c1.562 1.561 6 -.338 9.9 -4.244c3.905 -3.905 5.804 -8.337 4.242 -9.9"></path><path d="M4.929 4.929c-1.562 1.562 .337 6 4.243 9.9c3.905 3.905 8.337 5.804 9.9 4.242c1.561 -1.562 -.338 -6 -4.244 -9.9c-3.905 -3.905 -8.337 -5.804 -9.9 -4.242"></path></svg>`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/utilities/icons/icoAtom.astro", void 0);

export { $$IcoAtom as $ };
