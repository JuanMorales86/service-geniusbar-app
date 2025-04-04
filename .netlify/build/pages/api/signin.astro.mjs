import { l as lucia } from '../../chunks/auth_dBB4lbfl.mjs';
import { c as checkAccountLocked, r as resetFailedAttempts } from '../../chunks/signverificator_Zb6UlTic.mjs';
import { Argon2id } from 'oslo/password';
import { t as turdb } from '../../chunks/turso_CdaR7E3F.mjs';
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
  const { rows: [foundUser] } = await turdb.execute({
    sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
    args: [username]
    /** - Usamos turdb.execute() para hacer consultas SQL directas
        - rows: [foundUser] desestructura directamente el primer resultado
        - LIMIT 1 asegura que solo obtenemos un usuario
        - El objeto foundUser mantiene la misma estructura con las propiedades id, username, password, etc. */
  });
  if (!foundUser) {
    return context.redirect("/signin?error=user_not_found");
  }
  if (!foundUser.password) {
    return new Response("El Usuario o el Password es Incorrecto", { status: 400 });
  }
  const valiPassword = await new Argon2id().verify(
    String(foundUser.password),
    String(password)
  );
  if (!valiPassword) {
    return context.redirect("/signin?error=invalid_password&username=" + encodeURIComponent(username));
  }
  await resetFailedAttempts(username);
  const session = await lucia.createSession(String(foundUser.id), {});
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
