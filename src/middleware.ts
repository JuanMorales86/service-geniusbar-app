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
      //const hostHeader = context.request.headers.get("Host");
      const hostHeader = context.request.headers.get("Host") ?? context.url.host;
      
      // Lista de dominios permitidos (apex y www)
      const allowedHosts = [hostHeader, "onthepointservice.com", "www.onthepointservice.com"];

      // if (
      //(!)   originHeader ||
      //(!)   hostHeader ||
      //   //verifyRequestOrigin(originHeader, [hostHeader])
      //(!)   verifyRequestOrigin(originHeader, allowedHosts)
      // ) {
      //   //console.warn("Invalid request origin:", originHeader);
      //   console.warn("Bloqueo CSRF - Origin:", originHeader, "Host:", hostHeader);
      //   return new Response(null, { status: 403 });
      // }

      // if(originHeader){
      //   const validOrigin = verifyRequestOrigin(originHeader, [hostHeader]);

      //   if(!validOrigin){
      //     console.warn("Bloqueo CSRF - Origin no permitido:", originHeader, "Host:", hostHeader);
      //     return new Response(null, { status: 403 });
      //   }
      // }

      if(import.meta.env.PROD && context.request.method !== "GET"){}
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
