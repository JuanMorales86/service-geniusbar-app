import { generateState } from 'arctic';
import { g as github } from '../../chunks/auth_DaMfVQSL.mjs';
export { renderers } from '../../renderers.mjs';

async function GET(context) {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);
  context.cookies.set("github_oauth_state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });
  return context.redirect(url.toString());
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
