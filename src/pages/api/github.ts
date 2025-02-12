// pages/login/github/index.ts
import { generateState } from "arctic";
import { github } from "@/auth/auth";

import type { APIContext } from "astro";

//Genera el enlace para la pantalla de confirmacion de github
export async function GET(context: APIContext): Promise<Response> {
	const state = generateState();
	//console.log('Generated state:', state);
	const url = await github.createAuthorizationURL(state, { scopes:["user"] });
	//console.log('Auth URL:', url.toString());

	context.cookies.set("github_oauth_state", state, {
		path: "/",
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	return context.redirect(url.toString());
}