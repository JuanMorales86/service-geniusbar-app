import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { l as lucia } from '../../chunks/auth_B-WdwNpW.mjs';
import { t as turdb } from '../../chunks/turso_GRw5KsYt.mjs';
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const cl = console.log.bind(console);
async function POST(context) {
  const formData = await context.request.formData();
  const usernameInput = formData.get("username");
  const username = typeof usernameInput === "string" ? usernameInput : "";
  const password = formData.get("password");
  const adminCode = formData.get("adminCode");
  const { ADMIN_USER_LEVEL, ADMIN_USERNAMES } = Object.assign(__vite_import_meta_env__, { ADMIN_USER_LEVEL: "recruiter", ADMIN_USERNAMES: "admin,superuser,JUANDEV", OS: process.env.OS, USERNAME: process.env.USERNAME });
  const adminUsers = String(ADMIN_USERNAMES);
  const adminUserLevel = String(ADMIN_USER_LEVEL);
  const adminUsernames = adminUsers?.split(",") || [];
  const isAdminUsername = adminUsernames.includes(username);
  const hasValidAdminCode = adminCode === adminUserLevel;
  const isAdmin = isAdminUsername && hasValidAdminCode;
  try {
    const { rows: existingUser } = await turdb.execute({
      sql: "SELECT * FROM User WHERE username = ?",
      args: [username]
    });
    if (existingUser.length > 0) {
      return context.redirect("/signup?error=user_exists&message=" + encodeURIComponent("Este usuario ya existe"));
    }
    if (!username || !password) {
      return context.redirect("/signup?error=invalid_input&message=" + encodeURIComponent("Usuario o Contraseña incorrectos"));
    }
    if (typeof username !== "string" || username.length < 4) {
      return context.redirect("/signup?error=invalid_username&message=" + encodeURIComponent("Usuario debe contener al menos 4 caracteres de longitud"));
    }
    if (typeof password !== "string" || password.length < 4) {
      return context.redirect("/signup?error=invalid_password&message=" + encodeURIComponent("La Contraseña debe contener al menos 4 caracteres de longitud"));
    }
    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);
    await turdb.execute({
      sql: "INSERT INTO User (id, username, password, github_id, isAdmin) VALUES ( ?, ? , ?, ? , ? )",
      args: [userId, username, hashedPassword, null, isAdmin]
    });
    cl("User created successfully:", userId);
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return context.redirect("/serviciosm");
  } catch (error) {
    console.error("Error durante el registro:", error);
    return context.redirect("/signup?error=server_error&message=" + encodeURIComponent("Error en el servidor"));
  }
}
async function GET() {
  return new Response(null, {
    status: 307,
    headers: { Location: "/signup" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
