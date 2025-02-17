import dns from 'dns';
import { promisify } from 'util';
export { renderers } from '../../renderers.mjs';

const resolveMx = promisify(dns.resolveMx);
const POST = async ({ request }) => {
  try {
    const { email } = await request.json();
    const domain = email.split("@")[1];
    const mxRecods = await resolveMx(domain);
    return new Response(JSON.stringify({
      isValid: mxRecods.length > 0,
      message: mxRecods.length > 0 ? "El email es válido" : "Dominio de email no valido"
    }));
  } catch {
    return new Response(JSON.stringify({
      isvalid: false,
      message: "Error al verificar el email"
    }));
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
