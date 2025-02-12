import { generateCodeVerifier, generateState } from "arctic";//Arctic para generar el estado  de autenticacion de google
import { google } from "@/auth/auth";//Artic para google, es el que se importa de auth en el archivo auth.ts
import type { APIContext } from "astro";//Importa el tipo de contexto de la API de astro

export async function GET(context: APIContext): Promise<Response> {
    const state = generateState();//Genera el estado de autenticacion
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {scopes:["email", "profile"]});

    context.cookies.set("google_oauth_state", state, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    })

    context.cookies.set("google_oauth_code_verifier", codeVerifier, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    })

    return context.redirect(url.toString());
}


