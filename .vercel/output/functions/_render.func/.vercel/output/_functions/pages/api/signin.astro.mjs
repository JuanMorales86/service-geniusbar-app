import { l as lucia } from '../../chunks/auth_DaMfVQSL.mjs';
import { d as db, U as User } from '../../chunks/_astro_db_B32vqkck.mjs';
import { c as checkAccountLocked, r as resetFailedAttempts } from '../../chunks/signverificator_BkgqBGws.mjs';
import { Argon2id } from 'oslo/password';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

async function POST(context) {
  const formData = await context.request.formData();
  const usernameInput = formData.get("username");
  const username = typeof usernameInput === "string" ? usernameInput : "";
  const password = formData.get("password");
  const { isLocked, remainingTime, permanentLock } = await checkAccountLocked(username);
  if (permanentLock) {
    return context.redirect(`/signin?error=permanent_lock&username=${encodeURIComponent(username)}`);
  }
  if (isLocked) {
    const remainingSeconds = Math.ceil(remainingTime / 1e3);
    const currentTime = Date.now();
    const unlockTime = currentTime + remainingTime;
    return context.redirect(`/signin?error=account_locked&remainingTime=${remainingSeconds}&unlockTime=${unlockTime}&username=${encodeURIComponent(username)}`);
  }
  if (typeof username !== "string") {
    return new Response("El Usuario o el Password Incorrecto ", { status: 400 });
  }
  if (typeof password !== "string") {
    return new Response("El Usuario o el Password es Incorrecto ", { status: 400 });
  }
  const foundUser = (await db.select().from(User).where(eq(User.username, username))).at(0);
  if (!foundUser) {
    return context.redirect("/signin?error=user_not_found");
  }
  if (!foundUser.password) {
    return new Response("El Usuario o el Password es Incorrecto", { status: 400 });
  }
  const valiPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );
  if (!valiPassword) {
    return context.redirect("/signin?error=invalid_password&username=" + encodeURIComponent(username));
  }
  await resetFailedAttempts(username);
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/home");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
