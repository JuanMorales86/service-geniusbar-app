/* empty css                                     */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BgmmEVtV.mjs';
import { $ as $$Layout } from '../chunks/Layout_BHzrqhtq.mjs';
import { $ as $$IcoAtom } from '../chunks/icoAtom_L3ij1XMz.mjs';
export { renderers } from '../renderers.mjs';

const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Crear Cuenta de Session" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class=""> <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> ${renderComponent($$result2, "IcoAtom", $$IcoAtom, { "wi": "3rem", "he": "3rem" })}
Genius Bar Accesos
</a> <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> <div class="p-6 space-y-4 md:space-y-6 sm:p-8"> <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
Crea tu cuenta de usuario
</h1> <form class="space-y-4 md:space-y-6" method="POST" action="/api/signup"> <div> <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label> <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> </div> <div> <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""> </div> <button type="submit" class="w-full text-white bg-pink-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button> <p class="text-sm font-light text-gray-500 dark:text-gray-400">
already have an account? <a href="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a> </p> </form> </div> </div> </div> </section> ` })}`;
}, "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signup.astro", void 0);

const $$file = "C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
