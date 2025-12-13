//Proceso de Registro
import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "@/auth/auth";
import { turdb } from "../../../db/turso";

const ADMIN_USERNAMES = (import.meta.env.ADMIN_USERNAMES ?? "").split(',').filter(Boolean);
const ADMIN_USER_LEVEL_CODE = import.meta.env.ADMIN_USER_LEVEL;

if (ADMIN_USERNAMES.length === 0 || !ADMIN_USER_LEVEL_CODE) {
    console.error("Missing admin configuration in environment variables.");
}

function redirectWithError(context: APIContext, error: string, message: string) {
    const url = new URL("/signup", context.url);
    url.searchParams.set("error", error);
    url.searchParams.set("message", message);
    return context.redirect(url.toString());
}

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const usernameInput = formData.get("username");
    const passwordInput = formData.get("password");
    const verifyPasswordInput = formData.get("verifypassword");
    const adminCode = formData.get("adminCode");

    const username = typeof usernameInput === "string" ? usernameInput.trim() : "";
    const password = typeof passwordInput === "string" ? passwordInput : "";

    const isAdminUsername = ADMIN_USERNAMES.includes(username);
    let isAdmin = false;

    try {
        // --- Validaciones ---
        if (!username || !password) {
            return redirectWithError(context, "invalid_input", "Usuario y Contraseña son requeridos.");
        }

        const verifyPassword = typeof verifyPasswordInput === "string" ? verifyPasswordInput : "";
        if (password !== verifyPassword) {
            return redirectWithError(context, "password_mismatch", "Las contraseñas no coinciden.");
        }

        // 1. Validar formato de email (excepto para usuarios admin que no son email)
        if (!isAdminUsername && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            return context.redirect("/signup?error=invalid_email&message=" + encodeURIComponent("Por favor, introduce un correo electrónico válido."));
        }

        // 2. Verificar si el usuario ya existe
        const { rows: existingUsers } = await turdb.execute({
            sql: "SELECT id FROM User WHERE username = ?",
            args: [username]
        });

        if (existingUsers.length > 0) {
            return redirectWithError(context, "user_exists", "Este usuario ya existe.");
        }

        if (username.length < 4) {
            return redirectWithError(context, "invalid_username", "El usuario debe contener al menos 4 caracteres.");
        }

        if (password.length < 4) {
            return redirectWithError(context, "invalid_password", "La contraseña debe contener al menos 4 caracteres.");
        }

        // 3. Validar rol de administrador
        if (isAdminUsername) {
            if (adminCode === ADMIN_USER_LEVEL_CODE) {
                isAdmin = true;
            } else {
                return redirectWithError(context, "invalid_admin_code", "El código de administrador es incorrecto.");
            }
        }

        const userId = generateId(15);
        const hashedPassword = await new Argon2id().hash(password);

        await turdb.execute({
            sql: "INSERT INTO User (id, username, password, github_id, isAdmin) VALUES (?, ?, ?, ?, ?)",
            args: [userId, username, hashedPassword, null, isAdmin ? 1 : 0]
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return context.redirect(isAdmin ? "/" : "/serviciosm");

    } catch (error) {
        console.error("Error during signup:", error);
        return redirectWithError(context, "server_error", "Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.");
    }

}

//Redirige las peticionoes GET de vuelta a la pagina de registro
export async function GET(): Promise<Response> {
    return new Response(null, {
        status: 307,
        headers: { Location: '/signup' }
    });
}