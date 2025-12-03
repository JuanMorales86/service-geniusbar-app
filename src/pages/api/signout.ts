import { lucia } from "@/auth/auth";
import type { APIContext } from "astro";

async function handleLogout(context: APIContext): Promise<Response> {
	// Comprobar si hay una sesión activa
	if (!context.locals.session) {
		return new Response(null, {
			status: 401
		});
	}

	// Invalidar la sesión usando el método de Lucia
	await lucia.invalidateSession(context.locals.session.id);

	// Crear una cookie de sesión en blanco para eliminar la del navegador
	const sessionCookie = lucia.createBlankSessionCookie();
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	// Redirigir al usuario a la página de inicio de sesión.
	return context.redirect("/signin");
}

// Exportamos la misma lógica para ambos métodos HTTP
export const GET = handleLogout;
export const POST = handleLogout;