import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DtDvBq5x.mjs';
import { manifest } from './manifest_CR_PfFlS.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/adminconfig.astro.mjs');
const _page4 = () => import('./pages/api/callbacks/github.astro.mjs');
const _page5 = () => import('./pages/api/callbacks/google.astro.mjs');
const _page6 = () => import('./pages/api/createorder.astro.mjs');
const _page7 = () => import('./pages/api/deleteorders.astro.mjs');
const _page8 = () => import('./pages/api/enviar-email.astro.mjs');
const _page9 = () => import('./pages/api/generate-blurhash.astro.mjs');
const _page10 = () => import('./pages/api/getorders.astro.mjs');
const _page11 = () => import('./pages/api/github.astro.mjs');
const _page12 = () => import('./pages/api/google.astro.mjs');
const _page13 = () => import('./pages/api/resetattempts.astro.mjs');
const _page14 = () => import('./pages/api/sendmail.astro.mjs');
const _page15 = () => import('./pages/api/sendmail-respaldo.astro.mjs');
const _page16 = () => import('./pages/api/signin.astro.mjs');
const _page17 = () => import('./pages/api/signout.astro.mjs');
const _page18 = () => import('./pages/api/signup.astro.mjs');
const _page19 = () => import('./pages/api/signverificator.astro.mjs');
const _page20 = () => import('./pages/api/submitform.astro.mjs');
const _page21 = () => import('./pages/api/updateorders.astro.mjs');
const _page22 = () => import('./pages/api/verify-email.astro.mjs');
const _page23 = () => import('./pages/expert-help.astro.mjs');
const _page24 = () => import('./pages/formservice.astro.mjs');
const _page25 = () => import('./pages/home.astro.mjs');
const _page26 = () => import('./pages/ordershow-page.astro.mjs');
const _page27 = () => import('./pages/service-createorders.astro.mjs');
const _page28 = () => import('./pages/servicedescription.astro.mjs');
const _page29 = () => import('./pages/serviceiphone.astro.mjs');
const _page30 = () => import('./pages/servicios.astro.mjs');
const _page31 = () => import('./pages/serviciosm.astro.mjs');
const _page32 = () => import('./pages/signin.astro.mjs');
const _page33 = () => import('./pages/signup.astro.mjs');
const _page34 = () => import('./pages/testturso.astro.mjs');
const _page35 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.3.0_@types+node@22._e437acd706f6c70e494a501d4a0c6afc/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin.astro", _page2],
    ["src/pages/api/adminConfig.ts", _page3],
    ["src/pages/api/callbacks/github.ts", _page4],
    ["src/pages/api/callbacks/google.ts", _page5],
    ["src/pages/api/createOrder.ts", _page6],
    ["src/pages/api/deleteOrders.ts", _page7],
    ["src/pages/api/enviar-email.ts", _page8],
    ["src/pages/api/generate-blurhash.ts", _page9],
    ["src/pages/api/getOrders.ts", _page10],
    ["src/pages/api/github.ts", _page11],
    ["src/pages/api/google.ts", _page12],
    ["src/pages/api/resetAttempts.ts", _page13],
    ["src/pages/api/sendMail.js", _page14],
    ["src/pages/api/sendMail-Respaldo.js", _page15],
    ["src/pages/api/signin.ts", _page16],
    ["src/pages/api/signout.ts", _page17],
    ["src/pages/api/signup.ts", _page18],
    ["src/pages/api/signverificator.ts", _page19],
    ["src/pages/api/submitForm.ts", _page20],
    ["src/pages/api/updateOrders.ts", _page21],
    ["src/pages/api/verify-email.ts", _page22],
    ["src/pages/expert-help.astro", _page23],
    ["src/pages/formservice.astro", _page24],
    ["src/pages/home.astro", _page25],
    ["src/pages/ordershow-page.astro", _page26],
    ["src/pages/service-createorders.astro", _page27],
    ["src/pages/servicedescription.astro", _page28],
    ["src/pages/serviceiphone.astro", _page29],
    ["src/pages/servicios.astro", _page30],
    ["src/pages/serviciosm.astro", _page31],
    ["src/pages/signin.astro", _page32],
    ["src/pages/signup.astro", _page33],
    ["src/pages/TestTurso.astro", _page34],
    ["src/pages/index.astro", _page35]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "7eedd859-544b-4bd2-aef2-5c668e0b831d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
