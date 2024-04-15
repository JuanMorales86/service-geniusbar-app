/* empty css                              */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderSlot, g as renderComponent, h as renderHead } from '../astro_BkI29Jvg.mjs';
/* empty css                              */
import { createClient } from '@libsql/client/web';

const $$Astro$8 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Header;
  const { title, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header data-astro-transition-persist="true" class="py-8 px-4 mx-w-xl lg:py-2 lg:px-6"> <div class="mx-auto mb-8 lg:mb-8 text-center"> <h2 class="mb-4 text-5xl text-white tracking-tight roboto-bold">${title}</h2> <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400 roboto-regular"> ${description} </p> </div> </header>`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/components/Header.astro", "self");

const $$Astro$7 = createAstro();
const $$IcoNavApple = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$IcoNavApple;
  const { slot: direction } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(direction, "slot")} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-apple"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M8.286 7.008c-3.216 0 -4.286 3.23 -4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165 -.05 1.799 -.538 3.214 -.538c1.406 0 1.607 .538 3.214 .538s4.286 -3.229 4.286 -5.381c-.03 -.011 -2.649 -.434 -2.679 -3.23c-.02 -2.335 2.589 -3.179 2.679 -3.228c-1.096 -1.606 -3.162 -2.113 -3.75 -2.153c-1.535 -.12 -3.032 1.077 -3.75 1.077c-.729 0 -2.036 -1.077 -3.214 -1.077z"></path><path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2"></path></svg>`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/utilities/icons/icoNavApple.astro", void 0);

const $$Astro$6 = createAstro();
const $$IcoNavList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$IcoNavList;
  const { slot: direction } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(direction, "slot")} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-list-tree"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 6h11"></path><path d="M12 12h8"></path><path d="M15 18h5"></path><path d="M5 6v.01"></path><path d="M8 12v.01"></path><path d="M11 18v.01"></path></svg>`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/utilities/icons/icoNavList.astro", void 0);

const $$Astro$5 = createAstro();
const $$Headerbutton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Headerbutton;
  const { href: link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(link, "href")} class="flex-row justify-center text-white hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2  hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-90 scale-90 gap-x-2 opacity-90 hover:opacity-100 cursor-pointer"> ${renderSlot($$result, $$slots["before"])} ${renderSlot($$result, $$slots["default"], renderTemplate`uknown`)} ${renderSlot($$result, $$slots["after"])} </a>`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/components/Headerbutton.astro", void 0);

const $$Astro$4 = createAstro();
const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Logout;
  return renderTemplate`${renderTemplate`${maybeRenderHead()}<form id="logoutForm" method="POST" action="/api/signout"><button class="w-full text-white bg-pink-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Out</button></form>`}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/components/Logout.astro", void 0);

const $$Astro$3 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { user } = Astro2.props;
  console.log(user);
  return renderTemplate`${maybeRenderHead()}<nav class="flex flex-col justify-around  text-center md:flex-row sticky top-0 bg-gray-400 shrink-0"> <div class="flex flex-col items-center  justify-center md:flex-row"> ${renderComponent($$result, "Headerbutton", $$Headerbutton, { "class": "text-white", "href": "/" }, { "default": ($$result2) => renderTemplate` Home` })} ${renderComponent($$result, "Headerbutton", $$Headerbutton, { "href": "/servicios" }, { "before": ($$result2) => renderTemplate`${renderComponent($$result2, "IcoNavApple", $$IcoNavApple, { "slot": "before" })}`, "default": ($$result2) => renderTemplate` 
Servicios
` })} ${renderComponent($$result, "Headerbutton", $$Headerbutton, { "href": "/" }, { "before": ($$result2) => renderTemplate`${renderComponent($$result2, "IcoNavList", $$IcoNavList, { "slot": "before" })}`, "default": ($$result2) => renderTemplate` 
Ordenes y Reparaciones` })} ${renderComponent($$result, "Headerbutton", $$Headerbutton, { "href": "/" }, { "default": ($$result2) => renderTemplate`Contacto` })} ${renderComponent($$result, "Headerbutton", $$Headerbutton, { "href": "/signup" }, { "default": ($$result2) => renderTemplate`Crear Cuenta` })} ${renderComponent($$result, "Headerbutton", $$Headerbutton, { "href": "/signin" }, { "default": ($$result2) => renderTemplate`Iniciar Sesión` })} ${user ? renderTemplate`${renderComponent($$result, "Logout", $$Logout, {})}` : renderTemplate`${renderComponent($$result, "Headerbutton", $$Headerbutton, { "href": "/api/github" }, { "default": ($$result2) => renderTemplate`Iniciar Sesión con GitHub
` })}`} </div> <div> ${user ? `hola: ${user.username}` : `hola`} </div> </nav>`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/components/Navbar.astro", void 0);

const $$Astro$2 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/node_modules/.pnpm/astro@4.5.10_typescript@5.4.3/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const user = Astro2.locals.user;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body> <div class="pt-1"> ${renderComponent($$result, "Navbar", $$Navbar, { "user": user })} ${renderComponent($$result, "Header", $$Header, { "title": "Genius Bar Servicio Tecnico", "description": "Arreglamos tu iPhone, Mac y m\xE1s. Somos Expertos en Apple." })} <main> ${renderSlot($$result, $$slots["default"])} </main> </div> </body></html>`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/layouts/Layout.astro", void 0);

const turso = createClient({
  url: "libsql://geniusbarsrvdb-juandev.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIxNTY3MDksImlkIjoiNDA4YzUxN2UtMjY5NS00M2VlLTg0ZTAtMTFjNGNiODgxOWU2In0.6LmRL6Xcs3dYuzrA12gpM3DnwU7Cp3c9g2zTo56TyR9GmkZ6svGZTDuLyOAV3Dbf68mDS4f3y3CWpczi8cMFAg"
});

const $$Astro = createAstro();
const $$TestTurso = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TestTurso;
  const { rows } = await turso.execute("select * from users");
  console.log(rows);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "servicios" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<ul class="flex flex-col text-white font-mono text-4xl"> ${rows.map((post) => renderTemplate`<li class="text-center">Identificador: ${post.ID}</li>
            <li class="text-center">Nombre: ${post.name}</li>`)} </ul> ` })}
db/turso`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/TestTurso.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/TestTurso.astro";
const $$url = "/TestTurso";

const TestTurso = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TestTurso,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, TestTurso as T };
