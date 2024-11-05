/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BgmmEVtV.mjs';
import { $ as $$Layout } from '../chunks/Layout_BHzrqhtq.mjs';
import { createClient } from '@libsql/client/web';
export { renderers } from '../renderers.mjs';

const turso = createClient({
  url: "libsql://geniusbarsrvdb-juandev.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIxNTY3MDksImlkIjoiNDA4YzUxN2UtMjY5NS00M2VlLTg0ZTAtMTFjNGNiODgxOWU2In0.6LmRL6Xcs3dYuzrA12gpM3DnwU7Cp3c9g2zTo56TyR9GmkZ6svGZTDuLyOAV3Dbf68mDS4f3y3CWpczi8cMFAg"
});

const $$TestTurso = createComponent(async ($$result, $$props, $$slots) => {
  const { rows } = await turso.execute("select * from users");
  console.log(rows);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "servicios" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ul class="flex flex-col text-white font-mono text-4xl"> ${rows.map((post) => renderTemplate`<li class="text-center">Identificador: ${post.ID}</li>
            <li class="text-center">Nombre: ${post.name}</li>`)} </ul> ` })}
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
