/* empty css                                     */
import { c as createComponent, a as createAstro, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_B5a4cxtw.mjs';
import { $ as $$Layout } from '../chunks/Layout_hq8xEdw3.mjs';
import { $ as $$IcoAtom } from '../chunks/icoAtom_DhDBWwkW.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import React__default from 'react';
export { renderers } from '../renderers.mjs';

const cl = console.log.bind(console);
const SignupFormReact = ({ errorMessage }) => {
  cl("Component rendering");
  const [username, setUsername] = React__default.useState("");
  const [showAdminField, setShowAdminField] = React__default.useState(false);
  const [adminUsers, setAdminUsers] = React__default.useState([]);
  React__default.useEffect(() => {
    const getAdminUsers = async () => {
      const response = await fetch("/api/adminConfig");
      const data = await response.json();
      setAdminUsers(data);
    };
    getAdminUsers();
  }, []);
  cl(adminUsers);
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setShowAdminField(adminUsers.includes(value));
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      id: "signinForm",
      className: "space-y-4 md:space-y-6",
      method: "POST",
      action: "/api/signup",
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "username", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white", children: "Your username" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "username",
              id: "username",
              value: username,
              onChange: handleUsernameChange,
              className: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              placeholder: "email@gmail.com",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white", children: "Password" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              name: "password",
              id: "password",
              placeholder: "••••••••",
              className: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              required: true
            }
          )
        ] }),
        showAdminField && /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "adminCode",
            placeholder: "Admin Code",
            className: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          }
        ),
        errorMessage && /* @__PURE__ */ jsx("div", { className: "text-redCrayola text-sm", role: "alert", children: /* @__PURE__ */ jsx("span", { className: "font-medium", children: decodeURIComponent(errorMessage) }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full text-white bg-sky-esp focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800",
            children: "Sign Up"
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-sm font-light text-gray-500 dark:text-gray-400", children: [
          "already have an account? ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/signin",
              className: "font-medium text-primary-600 hover:underline dark:text-primary-500",
              children: "Sign In"
            }
          )
        ] })
      ]
    }
  );
};

const $$Astro = createAstro();
const $$Signup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signup;
  const errorMessage = Astro2.url.searchParams.get("message");
  const seoData = {
    title: "Crear cuenta - Genius Bar Service",
    description: "Reg\xEDstrate en Genius Bar Service para gestionar tus consultas de reparaci\xF3n y recibir atenci\xF3n personalizada.",
    keywords: "crear cuenta, registrarse Genius Bar, servicio t\xE9cnico Apple, Genius Bar Argentina, registro de usuario",
    image: "https://i.imgur.com/Plv66zB.jpg?format=webp",
    url: "https://geniusbarservice.com/signup"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { ...seoData }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section> <div class="flex flex-col items-center justify-center px-6 mx-auto lg:py-0"> <a href="/home" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> ${renderComponent($$result2, "IcoAtom", $$IcoAtom, { "wi": "3rem", "he": "3rem" })}
Genius Bar Accesos
</a> <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> <div class="p-6 space-y-4 md:space-y-6 sm:p-8"> <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
Crea tu cuenta de usuario
</h1> ${renderComponent($$result2, "SignupFormReact", SignupFormReact, { "client:load": true, "errorMessage": errorMessage, "client:component-hydration": "load", "client:component-path": "@/components/signupFormReact", "client:component-export": "default" })} <!-- <form
            id="signinForm"
              class="space-y-4 md:space-y-6"
              method="POST"
              action="/api/signup"
            >
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your username</label
                >
                <input
                  type="text"
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@gmail.com or Andrew"
                  required=""
                />
              </div>
               
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {
                errorMessage && (
                  <div class="text-redCrayola text-sm " role="alert"><span class="font-medium">{decodeURIComponent(errorMessage)}</span></div>
                )
              }
              <button
                type="submit"
                class="w-full text-white bg-sky-esp focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                >Sign Up</button
              >

              

              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                already have an account? <a
                  href="/signin"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign In</a
                >
              </p>
            </form> --> </div> </div> </div> </section> ` })}`;
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
