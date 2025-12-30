import { google, lucia } from "@/auth/auth";
import {  OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import type { APIContext } from "astro";
import { turdb } from "../../../../db/turso";

export async function GET(context: APIContext): Promise<Response> {
    const code = context.url.searchParams.get("code");
    const state = context.url.searchParams.get("state");
    const storeCodeVerifier = context.cookies.get("google_oauth_code_verifier")?.value;
    const storedState = context.cookies.get("google_oauth_state")?.value;

    if(!code || !state || !storedState || !storeCodeVerifier || state !== storedState) {//si no hay codigo, estado, estado almacenado o codigo de verificador almacenado, o si el estado no es igual al estado almacenado, entonces retorna un error 400
        return new Response(null, {
            status: 400
        });
    };

    // Borramos las cookies de estado después de usarlas.
    // Esto previene que se queden en el navegador y causen conflictos en futuros inicios de sesión.
    context.cookies.delete("google_oauth_state", {
        path: "/",
    });
    context.cookies.delete("google_oauth_code_verifier", {
        path: "/",
    });

    try{
        const tokens = await google.validateAuthorizationCode(code, storeCodeVerifier);//valida el codigo de autorizacion de google
        const token = tokens.accessToken;
        const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Si la respuesta de Google no es OK, algo salió mal con el token.
        if (!googleUserResponse.ok) {
            return new Response("Failed to fetch user from Google", { status: 400 });
        }

        const googleUser: GoogleUser = await googleUserResponse.json();


        // Aunque el console.log muestra un id, es bueno validar que siempre esté presente.
        if (!googleUser.id) {
            return new Response("Google user ID not found", { status: 400 });
        }

        const { rows: existingUserRows } = await turdb.execute({
            sql: "SELECT * FROM User WHERE google_id = ? LIMIT 1",
            args: [String(googleUser.id)] // Aseguramos que el ID sea un string
        });

        const existingUser = existingUserRows[0];

        if(existingUser) {
            const session = await lucia.createSession(String(existingUser.id), {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            // Simplificamos el seteo de la cookie
            context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return context.redirect("/");
        }

        // Verificar si ya existe un usuario con ese email (username) para vincular la cuenta y evitar error 500
        if (googleUser.email) {
            const { rows: userByEmailRows } = await turdb.execute({
                sql: "SELECT * FROM User WHERE username = ? LIMIT 1",
                args: [googleUser.email]
            });
            const userByEmail = userByEmailRows[0];

            if (userByEmail) {
                // Vincular cuenta: Actualizar el usuario existente agregando el google_id
                await turdb.execute({
                    sql: "UPDATE User SET google_id = ? WHERE id = ?",
                    args: [String(googleUser.id), userByEmail.id]
                });
                
                const session = await lucia.createSession(String(userByEmail.id), {});
                const sessionCookie = lucia.createSessionCookie(session.id);
                context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
                return context.redirect("/");
            }
        }

        const userId = generateId(15);
        // Si el email no viene, creamos un username alternativo para evitar errores.
        const username = googleUser.email ?? `user_${userId}`;

        await turdb.execute({
            sql: "INSERT INTO User (id, google_id, username) VALUES (?,?,?)",
            args: [userId, String(googleUser.id), username]
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        // Simplificamos el seteo de la cookie
        context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return context.redirect("/");
    } catch(error) {
        console.error("Error en google callback:", error);
        if (error instanceof OAuth2RequestError){
            return new Response(null, {
                status: 400
                
            });
        }
        return new Response(null, {
            status: 500 // Error interno del servidor para otros errores
        });
    }
}

// Interfaz para tipar la respuesta del usuario de Google
interface GoogleUser {
	id: string | number;
	email?: string;
	name?: string;
}
