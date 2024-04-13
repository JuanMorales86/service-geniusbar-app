// src/auth.ts del doc de lucia
import {Lucia} from "lucia"
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"//anadir
import { db, Session, User } from "astro:db"; //anadir
import { GitHub } from "arctic";//Artic para Github

const adapter = new DrizzleSQLiteAdapter(db as any, Session, User); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			githubId: attributes.github_id,
			username: attributes.username
		};
	}
});

export const github = new GitHub(
	import.meta.env.GITHUB_CLIENT_ID,
	import.meta.env.GITHUB_CLIENT_SECRET
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;//Agregar esta extension para q detecte la interface DatabaseUserAttributes 
	}
}

interface DatabaseUserAttributes {
	github_id: number;
	username: string;
}