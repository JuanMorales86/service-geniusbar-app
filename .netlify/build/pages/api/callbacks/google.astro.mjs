import { a as google, l as lucia } from '../../../chunks/auth_dBB4lbfl.mjs';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { t as turdb } from '../../../chunks/turso_CdaR7E3F.mjs';
export { renderers } from '../../../renderers.mjs';

async function GET(context) {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storeCodeVerifier = context.cookies.get("google_oauth_code_verifier")?.value;
  const storedState = context.cookies.get("google_oauth_state")?.value;
  if (!code || !state || !storedState || !storeCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }
  try {
    const tokens = await google.validateAuthorizationCode(code, storeCodeVerifier);
    const token = tokens.accessToken;
    const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const googleUser = await googleUserResponse.json();
    const { rows: existingUserRows } = await turdb.execute({
      sql: "SELECT * FROM User WHERE google_id = ? LIMIT 1",
      args: [googleUser.id]
    });
    const existingUser = existingUserRows[0];
    if (existingUser) {
      const session2 = await lucia.createSession(String(existingUser.id), {});
      const sessionCookie2 = lucia.createSessionCookie(session2.id);
      context.cookies.set(sessionCookie2.name, sessionCookie2.value, sessionCookie2.attributes);
      return context.redirect("/home");
    }
    const userId = generateId(15);
    await turdb.execute({
      sql: "INSERT INTO User (id, google_id, username) VALUES (?,?,?)",
      args: [userId, googleUser.id, googleUser.email]
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return context.redirect("/home");
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
