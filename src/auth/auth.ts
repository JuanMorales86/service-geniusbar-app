// src/auth.ts del doc de lucia
import {Lucia} from "lucia"
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { GitHub } from "arctic";//Artic para Github
import { Google } from "arctic";//Artic para Google
import { turdb } from "../../db/turso";

//const adapter = new DrizzleSQLiteAdapter(db as any, Session, User); // your adapter

const adapter = new LibSQLAdapter(turdb, {
	user: "User",
	session: "Session",
}
)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: import.meta.env.PROD
		}
	},
	getUserAttributes: (attributes) => {
		return {
			
			githubId: attributes.github_id,
			username: attributes.username,
			isAdmin: attributes.isAdmin
		};
	}
});

const googleCallbackURL = import.meta.env.PROD ?
	import.meta.env.GOOGLE_REDIRECT :
	"http://localhost:4321/api/callbacks/google";

export const google = new Google(
	import.meta.env.GOOGLE_CLIENT_ID,
	import.meta.env.GOOGLE_CLIENT_SECRET,
	googleCallbackURL //Direct string
)

const githubCallbackURL = import.meta.env.PROD ?
	"https://yourdomain.com/api/callbacks/github" :
	"http://localhost:4321/api/callbacks/github";

export const github = new GitHub(
	import.meta.env.GITHUB_CLIENT_ID,
	import.meta.env.GITHUB_CLIENT_SECRET,
	{ redirectURI: githubCallbackURL } // Object with string r1edirectURI
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes; 
	}
}

interface DatabaseUserAttributes {
	github_id: number;
	google_id?: string;
	username: string;
	isAdmin: boolean;
}