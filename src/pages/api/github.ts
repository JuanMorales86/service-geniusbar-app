// pages/login/github/index.ts
import { generateState } from "arctic";
import { github } from "@/auth/auth";

import type { APIContext } from "astro";

//Genera el enlace para la pantalla de confirmacion de github
export async function GET(context: APIContext): Promise<Response> {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	context.cookies.set("github_oauth_state", state, {
		path: "/",
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	return context.redirect(url.toString());
}