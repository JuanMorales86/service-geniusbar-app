import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { d as db, U as User } from '../../chunks/_astro_db_Cmk0CmgW.mjs';
import { l as lucia } from '../../chunks/auth_cIWyA0at.mjs';
export { renderers } from '../../renderers.mjs';

async function POST(context) {
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  if (!username || !password) {
    return new Response("Usuario o Contraseña incorrectos", { status: 400 });
  }
  if (typeof username !== "string" || username.length < 4) {
    return new Response("El Usuario debe contener al menos 4 caracteres de longitud ", { status: 400 });
  }
  if (typeof password !== "string" || password.length < 4) {
    return new Response("La Contraseña debe contener al menos 4 caracteres de longitud ", { status: 400 });
  }
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);
  await db.insert(User).values([
    {
      id: userId,
      username,
      password: hashedPassword,
      github_id: null
    }
  ]);
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/serviciosm");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
