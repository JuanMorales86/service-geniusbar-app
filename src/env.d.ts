/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		session: import("lucia").Session | null;
		user: import("lucia").User | null;
	}
}

// interface ImportMetaEnv {

// }

// interface Env {
//     readonly BD_URL: string;
//     readonly BD_TOKEN: string;
// }


// declare module 'astro' {
//     interface AstroGlobal {
//         env: Env
//     }
// }