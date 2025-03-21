import { r as resetFailedAttempts } from '../../chunks/signverificator_Zb6UlTic.mjs';
export { renderers } from '../../renderers.mjs';

async function POST(context) {
  const body = await context.request.json();
  const username = body.username;
  await resetFailedAttempts(username);
  return new Response(JSON.stringify({ success: true }));
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
