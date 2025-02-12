import { e as decodeKey } from './chunks/astro/server_C3fX89Zu.mjs';
import './chunks/astro-designed-error-pages_lUy9v0XW.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_CT3jP1RJ.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.16.10_@types+node@22.9.0_rollup@4.24.4_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"inline","content":".page-container[data-astro-cid-zetdm5md]{display:flex;flex-direction:column;min-height:100vh;position:relative}.video-background[data-astro-cid-zetdm5md]{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden}.video-background[data-astro-cid-zetdm5md]:before,.video-background[data-astro-cid-zetdm5md]:after{content:\"\";position:absolute;left:0;width:100%;height:20%;z-index:1}.video-background[data-astro-cid-zetdm5md]:before{top:0;background:linear-gradient(to bottom,#000000b3,#0000)}.video-background[data-astro-cid-zetdm5md]:after{bottom:0;background:linear-gradient(to top,#000000b3,#0000)}.video-background[data-astro-cid-zetdm5md] .iframe[data-astro-cid-zetdm5md]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;opacity:.6}.content[data-astro-cid-zetdm5md]{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;z-index:1;padding:2rem;text-align:center;& h1[data-astro-cid-zetdm5md]{font-size:5rem}& p[data-astro-cid-zetdm5md]{font-size:1.5rem}}\n"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/adminconfig","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/adminConfig\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"adminConfig","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/adminConfig.ts","pathname":"/api/adminConfig","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/callbacks/github","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/callbacks\\/github\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"callbacks","dynamic":false,"spread":false}],[{"content":"github","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/callbacks/github.ts","pathname":"/api/callbacks/github","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/createorder","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/createOrder\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"createOrder","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/createOrder.ts","pathname":"/api/createOrder","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/deleteorders","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/deleteOrders\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"deleteOrders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/deleteOrders.ts","pathname":"/api/deleteOrders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/enviar-email","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/enviar-email\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"enviar-email","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/enviar-email.ts","pathname":"/api/enviar-email","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/getorders","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/getOrders\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"getOrders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/getOrders.ts","pathname":"/api/getOrders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/github","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/github\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"github","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/github.ts","pathname":"/api/github","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/resetattempts","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/resetAttempts\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"resetAttempts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/resetAttempts.ts","pathname":"/api/resetAttempts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/sendmail","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sendMail\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sendMail","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sendMail.js","pathname":"/api/sendMail","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/sendmail-respaldo","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sendMail-Respaldo\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sendMail-Respaldo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sendMail-Respaldo.js","pathname":"/api/sendMail-Respaldo","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signin.ts","pathname":"/api/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signout.ts","pathname":"/api/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signup","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signup\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signup.ts","pathname":"/api/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signverificator","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signverificator\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signverificator","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signverificator.ts","pathname":"/api/signverificator","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submitform","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submitForm\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submitForm","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submitForm.ts","pathname":"/api/submitForm","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/updateorders","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/updateOrders\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"updateOrders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/updateOrders.ts","pathname":"/api/updateOrders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"}],"routeData":{"route":"/expert-help","isIndex":false,"type":"page","pattern":"^\\/expert-help\\/?$","segments":[[{"content":"expert-help","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/expert-help.astro","pathname":"/expert-help","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/formservice","isIndex":false,"type":"page","pattern":"^\\/formservice\\/?$","segments":[[{"content":"formservice","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/formservice.astro","pathname":"/formservice","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/home","isIndex":false,"type":"page","pattern":"^\\/home\\/?$","segments":[[{"content":"home","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/home.astro","pathname":"/home","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/ordershow-page","isIndex":false,"type":"page","pattern":"^\\/ordershow-page\\/?$","segments":[[{"content":"ordershow-page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ordershow-page.astro","pathname":"/ordershow-page","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/service-createorders","isIndex":false,"type":"page","pattern":"^\\/service-createorders\\/?$","segments":[[{"content":"service-createorders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/service-createorders.astro","pathname":"/service-createorders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"inline","content":"body{overflow-x:hidden;scroll-behavior:smooth}\n"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/servicedescription","isIndex":false,"type":"page","pattern":"^\\/servicedescription\\/?$","segments":[[{"content":"servicedescription","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicedescription.astro","pathname":"/servicedescription","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/servicios","isIndex":false,"type":"page","pattern":"^\\/servicios\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios.astro","pathname":"/servicios","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BuvL18-h.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"inline","content":".circular-gradient-bg[data-astro-cid-247nrqx3]{background-image:radial-gradient(circle,#1da1f2,#1da1f2);border-radius:50%;width:100px;height:100px;display:flex;align-items:center;justify-content:center;color:#fff}.img-class[data-astro-cid-zrz2d27u]{width:400px;height:350px;-o-object-fit:contain;object-fit:contain;filter:drop-shadow(5px 5px 8px #000000)}.img-class2[data-astro-cid-zrz2d27u]{width:100%;height:400px;-o-object-fit:contain;object-fit:contain;-o-object-position:center;object-position:center;filter:drop-shadow(5px 5px 8px #000000)}\n"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/serviciosm","isIndex":false,"type":"page","pattern":"^\\/serviciosm\\/?$","segments":[[{"content":"serviciosm","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/serviciosm.astro","pathname":"/serviciosm","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CU-_IXdz.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DafroZLe.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.C0aGliFq.css"},{"type":"external","src":"/_astro/ordershow-page.VQtS2Ikf.css"}],"routeData":{"route":"/testturso","isIndex":false,"type":"page","pattern":"^\\/TestTurso\\/?$","segments":[[{"content":"TestTurso","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/TestTurso.astro","pathname":"/TestTurso","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/ordershow-page.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/TestTurso.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/formservice.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/home.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/service-createorders.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicedescription.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicios.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/serviciosm.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signin.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signup.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/components/MyLoadingIcon.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ordershow-page@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/TestTurso@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/formservice@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/home@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/service-createorders@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/servicedescription@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/servicios@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/serviciosm@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/signin@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/signup@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astro-page:src/pages/api/getOrders@_@ts":"pages/api/getorders.astro.mjs","\u0000@astro-page:src/pages/api/sendMail@_@js":"pages/api/sendmail.astro.mjs","\u0000@astro-page:src/pages/api/signverificator@_@ts":"pages/api/signverificator.astro.mjs","\u0000@astro-page:src/pages/api/updateOrders@_@ts":"pages/api/updateorders.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/adminConfig@_@ts":"pages/api/adminconfig.astro.mjs","\u0000@astro-page:src/pages/api/callbacks/github@_@ts":"pages/api/callbacks/github.astro.mjs","\u0000@astro-page:src/pages/api/deleteOrders@_@ts":"pages/api/deleteorders.astro.mjs","\u0000@astro-page:src/pages/api/enviar-email@_@ts":"pages/api/enviar-email.astro.mjs","\u0000@astro-page:src/pages/api/github@_@ts":"pages/api/github.astro.mjs","\u0000@astro-page:src/pages/api/resetAttempts@_@ts":"pages/api/resetattempts.astro.mjs","\u0000@astro-page:src/pages/api/sendMail-Respaldo@_@js":"pages/api/sendmail-respaldo.astro.mjs","\u0000@astro-page:src/pages/api/signin@_@ts":"pages/api/signin.astro.mjs","\u0000@astro-page:src/pages/api/signout@_@ts":"pages/api/signout.astro.mjs","\u0000@astro-page:src/pages/api/signup@_@ts":"pages/api/signup.astro.mjs","\u0000@astro-page:src/pages/api/submitForm@_@ts":"pages/api/submitform.astro.mjs","\u0000@astro-page:src/pages/expert-help@_@astro":"pages/expert-help.astro.mjs","\u0000@astro-page:src/pages/home@_@astro":"pages/home.astro.mjs","\u0000@astro-page:src/pages/servicios@_@astro":"pages/servicios.astro.mjs","\u0000@astro-page:src/pages/signin@_@astro":"pages/signin.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.16.10_@types+node@22.9.0_rollup@4.24.4_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/createOrder@_@ts":"pages/api/createorder.astro.mjs","\u0000@astro-page:src/pages/formservice@_@astro":"pages/formservice.astro.mjs","\u0000@astro-page:src/pages/servicedescription@_@astro":"pages/servicedescription.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/TestTurso@_@astro":"pages/testturso.astro.mjs","\u0000@astro-page:src/pages/service-createorders@_@astro":"pages/service-createorders.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/ordershow-page@_@astro":"pages/ordershow-page.astro.mjs","\u0000@astro-page:src/pages/serviciosm@_@astro":"pages/serviciosm.astro.mjs","C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/node_modules/.pnpm/astro@4.16.10_@types+node@22.9.0_rollup@4.24.4_typescript@5.4.5/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/node_modules/.pnpm/@astrojs+react@3.6.1_@types+react-dom@18.3.0_@types+react@18.3.3_react-dom@18.3.1_react@18.3._rnxxdzlhffnilxo4qphce2vokq/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","\u0000@astrojs-manifest":"manifest_Bddu4lLA.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.CU-_IXdz.js","@/components/parallaxServices":"_astro/parallaxServices.CBE-y85E.js","@/components/signupFormReact":"_astro/signupFormReact.zXeXm2zT.js","@/components/FormReact":"_astro/FormReact.DWZB55r5.js","@/components/service-createorders-form":"_astro/service-createorders-form.B0uN31nJ.js","/astro/hoisted.js?q=0":"_astro/hoisted.BuvL18-h.js","@astrojs/react/client.js":"_astro/client.BU_v_VGO.js","@/components/OrdersShowCase":"_astro/OrdersShowCase.C9o2Im0W.js","/astro/hoisted.js?q=2":"_astro/hoisted.DafroZLe.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/macbookimg.BtTfmgKU.png","/_astro/montserrat-vietnamese-wght-normal.BXWSX9tz.woff2","/_astro/montserrat-cyrillic-ext-wght-normal.rV1oiNxr.woff2","/_astro/montserrat-cyrillic-wght-normal.CHYi_LmU.woff2","/_astro/montserrat-latin-wght-normal.BDA6280a.woff2","/_astro/montserrat-latin-ext-wght-normal.BIVePy9u.woff2","/_astro/roboto-cyrillic-ext-700-normal.CsrCEJIc.woff2","/_astro/roboto-cyrillic-700-normal.B5ZBKWCH.woff2","/_astro/roboto-latin-ext-700-normal.BYGCo3Go.woff2","/_astro/roboto-greek-700-normal.Cc2Tq8FV.woff2","/_astro/roboto-vietnamese-700-normal.SekShQfT.woff2","/_astro/roboto-latin-700-normal.CeM5gOv8.woff2","/_astro/space-grotesk-latin-ext-wght-normal.OnFqUBEL.woff2","/_astro/space-grotesk-vietnamese-wght-normal.D_Q6m-an.woff2","/_astro/space-grotesk-latin-wght-normal.5PZORFv8.woff2","/_astro/roboto-cyrillic-ext-700-normal.dDOtDc5i.woff","/_astro/roboto-cyrillic-700-normal.DAIxw5xX.woff","/_astro/roboto-latin-ext-700-normal.DwUXTeTv.woff","/_astro/roboto-vietnamese-700-normal.Mc0c6qif.woff","/_astro/roboto-greek-700-normal.CjuTpGfE.woff","/_astro/roboto-latin-700-normal.Bh431LEL.woff","/_astro/TestTurso.C0aGliFq.css","/_astro/ordershow-page.VQtS2Ikf.css","/favicon.svg","/_astro/client.BU_v_VGO.js","/_astro/FormReact.DWZB55r5.js","/_astro/hoisted.BuvL18-h.js","/_astro/hoisted.CU-_IXdz.js","/_astro/hoisted.DafroZLe.js","/_astro/index.DJO9vBfz.js","/_astro/index.Dk_1zyWj.js","/_astro/jsx-runtime.CYYqVSlZ.js","/_astro/OrdersShowCase.C9o2Im0W.js","/_astro/parallaxServices.CBE-y85E.js","/_astro/service-createorders-form.B0uN31nJ.js","/_astro/signupFormReact.zXeXm2zT.js","/_astro/ToastContainer.BHdLIS0W.js","/_astro/UserMenu.astro_astro_type_script_index_0_lang.CYHw8MGh.js","/img/imac.png","/img/logogeniusbar.svg","/img/macbook.png"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"MnlR1SHo16GIkLmHPWKt01PoIDRQ0bK6hdyaLV2daj8=","experimentalEnvGetSecretEnabled":false});

export { manifest };
