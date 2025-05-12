// src/middleware.ts de el doc de lucia
import { lucia } from "./auth/auth";
import { verifyRequestOrigin } from "lucia";
import { defineMiddleware } from "astro/middleware";
import type { APIContext, MiddlewareNext } from "astro";


//console.log('Middleware de autenticacion ejecutado')

export const onRequest = defineMiddleware(async (context: APIContext, next: MiddlewareNext)=> {
  try{

    if ( import.meta.env.PROD && context.request.method !== "GET") {
      const originHeader = context.request.headers.get("Origin");
      const hostHeader = context.request.headers.get("Host");
      if (
        !originHeader ||
        !hostHeader ||
        !verifyRequestOrigin(originHeader, [hostHeader])
      ) {
        console.warn("Invalid request origin:", originHeader);
        return new Response(null, { status: 403 });
      }
    }
  
    const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      context.locals.user = null;
      context.locals.session = null;
      return next();
    }
  
    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    context.locals.session = session;
    context.locals.user = user;
    return next();
  } catch(err) {
    console.error('Error en Middleware:', err);
    return new Response("Internal Server Error", {
      status: 500,})
  }
  

});

/**
 * El cambio a APIContext y APIRoute representa los tipos específicos de Astro para manejar las solicitudes HTTP:

APIContext define el tipo para el primer parámetro context que incluye:

request
cookies
params
locals
url Y todas las propiedades necesarias para manejar una solicitud HTTP en Astro.
APIRoute define el tipo para el segundo parámetro next que representa:

La función que continúa con el flujo de la aplicación
Maneja la respuesta HTTP
Asegura que la cadena de middleware continúe correctamente
Estos tipos son más específicos y seguros que usar any, ya que:

Proporcionan autocompletado en el editor
Detectan errores en tiempo de desarrollo
Documentan mejor el código
Mantienen la consistencia con el sistema de tipos de Astro'


***************************************
import type { MiddlewareNext, APIContext } from "astro";

- APIContext: Es el tipo que define la estructura del objeto context que recibe el middleware, incluyendo request, cookies, locals y demás propiedades necesarias para manejar peticiones HTTP
- MiddlewareNext: Es el tipo específico para la función next en middlewares de Astro, que no requiere parámetros y se encarga de continuar con la cadena de ejecución


export const onRequest = defineMiddleware(async (context: APIContext, next: MiddlewareNext) => {
- defineMiddleware: Función de Astro para crear middlewares

- context: APIContext: Primer parámetro tipado que contiene toda la información de la petición
next: MiddlewareNext: Segundo parámetro tipado que representa la función para continuar al siguiente middleware
- La función es asíncrona (async) porque maneja operaciones como validación de sesiones

Este cambio de tipos nos permite:
1.Mantener el código funcionando exactamente igual
2.Tener mejor autocompletado en el editor
3.Eliminar los warnings de TypeScript
4.Seguir las mejores prácticas de tipado de Astro
 */