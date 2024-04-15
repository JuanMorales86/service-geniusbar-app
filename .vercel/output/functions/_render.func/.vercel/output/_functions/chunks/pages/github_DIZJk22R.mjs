import { GitHub, OAuth2RequestError, generateState } from 'arctic';
import { Lucia, generateId } from 'lucia';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN, {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const User = asDrizzleTable("User", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true, "optional": false } }, "username": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "username", "collection": "User", "primaryKey": false, "optional": false } }, "password": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "password", "collection": "User", "primaryKey": false, "optional": true } }, "github_id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "github_id", "collection": "User", "primaryKey": false, "optional": true } } }, "deprecated": false, "indexes": {} }, false);
const Session = asDrizzleTable("Session", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Session", "primaryKey": false, "optional": false } }, "userId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "Session", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true, "optional": false } } } }, "expiresAt": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "expiresAt", "collection": "Session", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

const adapter = new DrizzleSQLiteAdapter(db, Session, User);
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      githubId: attributes.github_id,
      username: attributes.username
    };
  }
});
const github$2 = new GitHub("02c8fe8e9ba8ed58f6bc", "aa9809a17b13ef0edad878ea33b5a0f90d31f3db");

async function GET$1(context) {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }
  try {
    const tokens = await github$2.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const githubUser = await githubUserResponse.json();
    const existingUser = (await db.select().from(User).where(eq(User.github_id, githubUser.id))).at(0);
    if (existingUser) {
      const session2 = await lucia.createSession(existingUser.id, {});
      const sessionCookie2 = lucia.createSessionCookie(session2.id);
      context.cookies.set(sessionCookie2.name, sessionCookie2.value, sessionCookie2.attributes);
      return context.redirect("/");
    }
    const userId = generateId(15);
    await db.insert(User).values([{
      id: userId,
      github_id: githubUser.id,
      username: githubUser.login
    }]);
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

const github$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET: GET$1
}, Symbol.toStringTag, { value: 'Module' }));

async function GET(context) {
  const state = generateState();
  const url = await github$2.createAuthorizationURL(state);
  context.cookies.set("github_oauth_state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });
  return context.redirect(url.toString());
}

const github = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

export { User as U, github as a, db as d, github$1 as g, lucia as l };
