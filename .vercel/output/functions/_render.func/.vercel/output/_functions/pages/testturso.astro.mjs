/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_C3fX89Zu.mjs';
import { $ as $$Layout } from '../chunks/Layout_BIGIKqIB.mjs';
import { createClient } from '@libsql/client/web';
export { renderers } from '../renderers.mjs';

const turdb = createClient({
  url: "libsql://service-geniusbar-app-juandev.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzM0MTcwNjAsImlkIjoiYzVmZjQyMjItMTY3YS00Njc3LTgwNTctNjg4MzliYjc3NDE5In0._KXNSRqvkqLiHe3Tke6GrcGv9B_WFm1IZn3eBYd_HHN1JVjP_aL4DAM3H6hWYsr6oWRm2Ptz8nSm3qG_1rVlDw"
});

const $$TestTurso = createComponent(async ($$result, $$props, $$slots) => {
  const { rows } = await turdb.execute("select * from User");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "servicios" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ul class="flex flex-col text-white font-mono text-4xl"> ${rows.map((post) => renderTemplate`<li class="text-center">Identificador: ${post.id}</li>
            <li class="text-center">Nombre: ${post.username}</li>`)} </ul> ` })}
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
