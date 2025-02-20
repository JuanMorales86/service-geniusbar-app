/* empty css                                     */
import { c as createComponent, a as createAstro, d as renderComponent, e as renderScript, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_CuO-qrqT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_kJWPOogx.mjs';
import { $ as $$IcoAtom } from '../chunks/icoAtom_Snvd0Fso.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Signin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signin;
  const errorParam = Astro2.url.searchParams.get("error");
  const username = Astro2.url.searchParams.get("username") || "";
  const remainingTime = Number(Astro2.url.searchParams.get("remainingTime") || 0);
  const permanentLock = Boolean(Astro2.url.searchParams.get("permanentLock") || false);
  let errorMessage = "";
  if (errorParam === "user_not_found") {
    errorMessage = "Usuario no encontrado";
  } else if (errorParam === "invalid_password") {
    errorMessage = "Contrase\xF1a incorrecta";
  } else if (errorParam === "account_locked") {
    errorMessage = `Cuenta bloqueada. Por favor, intente nuevamente en ${remainingTime} segundos.`;
  } else if (errorParam === "permanent_lock") {
    errorMessage = "Tu cuenta ha sido bloqueada permanentemente por exceder el n\xFAmero m\xE1ximo de intentos. Contacta al administrador.";
  }
  const seoData = {
    title: "Iniciar sesi\xF3n - Genius Bar Service",
    description: "Accede a tu cuenta en Genius Bar Service para gestionar tus consultas y seguimiento de reparaciones.",
    keywords: "iniciar sesi\xF3n, login Genius Bar, acceder cuenta servicio t\xE9cnico Apple, seguimiento de reparaciones, Genius Bar Argentina",
    image: "https://i.imgur.com/xYGD6SF.jpg?format=webp",
    url: "https://geniusbarservice.com/signin"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...seoData }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class=""> <div class="flex flex-col items-center justify-center px-6 py-0 mx-auto lg:py-0"> <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> ${renderComponent($$result2, "IcoAtom", $$IcoAtom, { "wi": "3rem", "he": "3rem" })}
Genius Bar Accesos
</a> <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> <div class="p-6 space-y-4 md:space-y-6 sm:p-8"> <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
Inicia session en tu cuenta
</h1> <form id="signinForm" class="space-y-4 md:space-y-6" method="POST" action="/api/signin"> <div> <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label> <input type="text" name="username" id="username"${addAttribute(username, "value")} placeholder="email@gmail.com" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> </div> <div> <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> </div> ${errorMessage && !remainingTime && renderTemplate`<div id="errorMessage" class="text-redCrayola text-sm">${errorMessage}</div>`} ${errorMessage && remainingTime > 0 && renderTemplate`<div id="lockTimer"${addAttribute(remainingTime, "data-remaining-time")}${addAttribute(username, "data-username")} class="text-redCrayola text-sm">${errorMessage} </div>`} ${errorMessage && permanentLock && renderTemplate`<div id="permanentLock" class="text-redCrayola text-sm">
Tu cuenta ha sido bloqueada permanentemente por exceder el número máximo de intentos. 
                  Contacta al administrador.
</div>`} <button type="submit" class="w-full text-white bg-sky-esp focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Sign In</button> <p class="text-sm font-light text-gray-500 dark:text-gray-400">
already have an account? <a href="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a> </p> </form> </div> </div> </div> </section> ` })} ${renderScript($$result, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signin.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signin.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signin.astro";
const $$url = "/signin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
