import { d as db, U as User, l as lucia } from './github_DIZJk22R.mjs';
import { Argon2id } from 'oslo/password';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function POST(context) {
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  if (typeof username !== "string") {
    return new Response("El Usuario o el Password Incorrecto ", {
      status: 400
    });
  }
  if (typeof password !== "string") {
    return new Response("El Usuario o el Password es Incorrecto ", {
      status: 400
    });
  }
  const foundUser = (await db.select().from(User).where(eq(User.username, username))).at(0);
  if (!foundUser) {
    return new Response("El Usuario no existe ", {
      status: 400
    });
  }
  if (!foundUser.password) {
    return new Response("El Password no existe ", {
      status: 400
    });
  }
  const valiPassword = await new Argon2id().verify(foundUser.password, password);
  if (!valiPassword) {
    return new Response("El Usuario o el Password es Incorrecto ", {
      status: 400
    });
  }
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return context.redirect("/");
}

export { POST };
