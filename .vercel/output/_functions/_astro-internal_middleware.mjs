import { l as lucia } from './chunks/auth_B-WdwNpW.mjs';
import { verifyRequestOrigin } from 'lucia';
import { d as defineMiddleware, s as sequence } from './chunks/index_DlzGT8U0.mjs';
import './chunks/astro-designed-error-pages_CRtBtjUK.mjs';
import 'kleur/colors';
import './chunks/astro/server_CuO-qrqT.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context.request.method !== "GET") {
    const originHeader = context.request.headers.get("Origin");
    const hostHeader = context.request.headers.get("Host");
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      console.warn("Invalid request origin:", originHeader);
      return new Response(null, {
        status: 403
      });
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
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
