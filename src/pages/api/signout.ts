import { lucia } from "@/auth/auth";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
	//Comprobar la session
    if (!context.locals.session) {
		return new Response(null, {
			status: 401
		});
	}

	await lucia.invalidateSession(context.locals.session.id);//Metodo de lucia invalidateSession accedo mediante locals a la session iniciada a su id para invalidarla

    //Vuelve a crear una cookie de session pero vacia
	const sessionCookie = lucia.createBlankSessionCookie();//aqui despues se crea una cookie de ssesion pero vacia
	context.cookies.set(
	sessionCookie.name, 
	sessionCookie.value, 
	sessionCookie.attributes
);

    //por ultimo redirige a la pagina de login
	return context.redirect("/serviciosm");
}