// pages/login/github/callback.ts
import { github, lucia } from "@/auth/auth";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
//import { db, User, eq } from "astro:db";

import type { APIContext } from "astro";
import { turdb } from "../../../../db/turso";

export async function GET(context: APIContext): Promise<Response> {
	const code = context.url.searchParams.get("code");
	const state = context.url.searchParams.get("state");
	const storedState = context.cookies.get("github_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		//console.log('Code:', code);
		//console.log('State:', state);
		//console.log('Stored state:', storedState);
		return new Response(null, {
			status: 400
		});
	}

	try {
		// El token de GitHub debe ser obtenido de forma asíncrona usando await
		// ya que tokens.accessToken() devuelve una Promise que necesita resolverse
		// antes de usarlo en los headers de la petición a la API de GitHub
		const tokens = await github.validateAuthorizationCode(code);
		//cl('Tokens received:', !!tokens);
		//cl('Tokens structure:', tokens);
		const token = tokens.accessToken;
		//cl('Token value:', token);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		//console.log('GitHub API response:', githubUserResponse.status);
		const githubUser: GitHubUser = await githubUserResponse.json();
		//console.log('GitHub user data:', githubUser);
		//console.log('Attempting database query with github_id:', githubUser.id);


		// Replace this with your own DB client.
		//const existingUser = await db.table("user").where("github_id", "=", githubUser.id).get(); //Este es el que viene desde la pagina de lucia

        //const existingUser = (await db.select().from(User).where(eq(User.github_id, githubUser.id))).at(0);//hay q colocarle otro parentesis al final y el at(0) //este es el q usaba con astrodb
		//console.log('Checking for existing user...');
		const { rows: existingUserRows } = await turdb.execute({
			sql: "SELECT * FROM User WHERE github_id = ? LIMIT 1",
			args: [githubUser.id]
		})// este es el de turso
		//console.log('Database rows:', existingUserRows);

		const existingUser = existingUserRows[0]
		//console.log('Existing user:', existingUser);

		if (existingUser) {
			//console.log('Creating session for user:', existingUser.id);
			const session = await lucia.createSession(String(existingUser.id), {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return context.redirect("/home");
		}

		const userId = generateId(15);

		// Replace this with your own DB client.
		// await db.insert(User).values([
		// 	{
		// 		id: userId,
		// 		github_id: githubUser.id,
		// 		username: githubUser.login,
		// 	}
		// ]);

		await turdb.execute({
			sql: "INSERT INTO User (id, github_id, username) VALUES (?,?,?)",
			args: [userId, githubUser.id, githubUser.login]
		})

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return context.redirect("/");
	} catch (e) {
		//console.error('Error details:', e);
		//throw e
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GitHubUser {
	id: string;
	login: string;
}