/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_B5a4cxtw.mjs';
import { $ as $$Layout } from '../chunks/Layout_hq8xEdw3.mjs';
import { t as turdb } from '../chunks/turso_CdaR7E3F.mjs';
export { renderers } from '../renderers.mjs';

const $$TestTurso = createComponent(async ($$result, $$props, $$slots) => {
  const { rows } = await turdb.execute("select * from User");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "servicios" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ul class="flex flex-col text-white font-mono text-4xl"> ${rows.map((post) => renderTemplate`<li class="text-center">Identificador: ${post.id}</li>
            <li class="text-center">Nombre: ${post.username}</li>
            <li class="text-center">Admin?: ${post.isAdmin}</li>
            <li class="text-center">Passwod: ${post.password}</li>`)} </ul> ` })}
db/turso`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/TestTurso.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/TestTurso.astro";
const $$url = "/TestTurso";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$TestTurso,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
