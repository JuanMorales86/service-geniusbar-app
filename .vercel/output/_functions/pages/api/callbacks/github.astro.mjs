import { g as github, l as lucia } from '../../../chunks/auth_B-WdwNpW.mjs';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { t as turdb } from '../../../chunks/turso_GRw5KsYt.mjs';
export { renderers } from '../../../renderers.mjs';

async function GET(context) {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }
  try {
    const tokens = await github.validateAuthorizationCode(code);
    const token = tokens.accessToken;
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const githubUser = await githubUserResponse.json();
    const { rows: existingUserRows } = await turdb.execute({
      sql: "SELECT * FROM User WHERE github_id = ? LIMIT 1",
      args: [githubUser.id]
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
      sql: "INSERT INTO User (id, github_id, username) VALUES (?,?,?)",
      args: [userId, githubUser.id, githubUser.login]
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return context.redirect("/");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
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
