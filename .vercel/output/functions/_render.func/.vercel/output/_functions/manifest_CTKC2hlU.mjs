import { f as decodeKey } from './chunks/astro/server_BgmmEVtV.mjs';
import './chunks/shared_qa4Nkjuc.mjs';
import './chunks/astro-designed-error-pages_DkMv6S-J.mjs';

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

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
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
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
    middleware(_, next) {
      return next();
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.14.3_@types+node@22.5.0_rollup@4.21.0_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"inline","content":".page-container[data-astro-cid-zetdm5md]{display:flex;flex-direction:column;min-height:100vh;position:relative}.video-background[data-astro-cid-zetdm5md]{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden}.video-background[data-astro-cid-zetdm5md]:before,.video-background[data-astro-cid-zetdm5md]:after{content:\"\";position:absolute;left:0;width:100%;height:20%;z-index:1}.video-background[data-astro-cid-zetdm5md]:before{top:0;background:linear-gradient(to bottom,#000000b3,#0000)}.video-background[data-astro-cid-zetdm5md]:after{bottom:0;background:linear-gradient(to top,#000000b3,#0000)}.video-background[data-astro-cid-zetdm5md] .iframe[data-astro-cid-zetdm5md]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;opacity:.6}.content[data-astro-cid-zetdm5md]{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;z-index:1;padding:2rem;text-align:center;& h1[data-astro-cid-zetdm5md]{font-size:5rem}& p[data-astro-cid-zetdm5md]{font-size:1.5rem}}\n"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/callbacks/github","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/callbacks\\/github\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"callbacks","dynamic":false,"spread":false}],[{"content":"github","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/callbacks/github.ts","pathname":"/api/callbacks/github","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/createorder","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/createOrder\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"createOrder","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/createOrder.ts","pathname":"/api/createOrder","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/enviar-email","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/enviar-email\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"enviar-email","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/enviar-email.ts","pathname":"/api/enviar-email","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/github","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/github\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"github","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/github.ts","pathname":"/api/github","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/sendmail","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sendMail\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sendMail","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sendMail.js","pathname":"/api/sendMail","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/sendmail-respaldo","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sendMail-Respaldo\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sendMail-Respaldo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sendMail-Respaldo.js","pathname":"/api/sendMail-Respaldo","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signin.ts","pathname":"/api/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signout.ts","pathname":"/api/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signup","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signup\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signup.ts","pathname":"/api/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submitform","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submitForm\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submitForm","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submitForm.ts","pathname":"/api/submitForm","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"}],"routeData":{"route":"/expert-help","isIndex":false,"type":"page","pattern":"^\\/expert-help\\/?$","segments":[[{"content":"expert-help","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/expert-help.astro","pathname":"/expert-help","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/formservice","isIndex":false,"type":"page","pattern":"^\\/formservice\\/?$","segments":[[{"content":"formservice","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/formservice.astro","pathname":"/formservice","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.jmzo_G7f.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/service-createorders","isIndex":false,"type":"page","pattern":"^\\/service-createorders\\/?$","segments":[[{"content":"service-createorders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/service-createorders.astro","pathname":"/service-createorders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/service-orders","isIndex":false,"type":"page","pattern":"^\\/service-orders\\/?$","segments":[[{"content":"service-orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/service-orders.astro","pathname":"/service-orders","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"inline","content":"body{overflow-x:hidden;scroll-behavior:smooth}\n"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/servicedescription","isIndex":false,"type":"page","pattern":"^\\/servicedescription\\/?$","segments":[[{"content":"servicedescription","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicedescription.astro","pathname":"/servicedescription","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/servicios","isIndex":false,"type":"page","pattern":"^\\/servicios\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios.astro","pathname":"/servicios","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.22JEArKb.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"inline","content":".circular-gradient-bg[data-astro-cid-247nrqx3]{background-image:radial-gradient(circle,#1da1f2,#1da1f2);border-radius:50%;width:100px;height:100px;display:flex;align-items:center;justify-content:center;color:#fff}.img-class[data-astro-cid-zrz2d27u]{width:400px;height:350px;-o-object-fit:contain;object-fit:contain;filter:drop-shadow(5px 5px 8px #000000)}.img-class2[data-astro-cid-zrz2d27u]{width:100%;height:400px;-o-object-fit:contain;object-fit:contain;-o-object-position:center;object-position:center;filter:drop-shadow(5px 5px 8px #000000)}\n"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/serviciosm","isIndex":false,"type":"page","pattern":"^\\/serviciosm\\/?$","segments":[[{"content":"serviciosm","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/serviciosm.astro","pathname":"/serviciosm","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/testturso","isIndex":false,"type":"page","pattern":"^\\/TestTurso\\/?$","segments":[[{"content":"TestTurso","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/TestTurso.astro","pathname":"/TestTurso","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C5U_Y_RG.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.DpHVcAzk.css"},{"type":"external","src":"/_astro/TestTurso.DgZour51.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/TestTurso.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/formservice.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/service-createorders.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/service-orders.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicedescription.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicios.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/serviciosm.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signin.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signup.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/TestTurso@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/formservice@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/service-createorders@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/service-orders@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/servicedescription@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/servicios@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/serviciosm@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/signin@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/signup@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astro-page:src/pages/api/sendMail@_@js":"pages/api/sendmail.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/callbacks/github@_@ts":"pages/api/callbacks/github.astro.mjs","\u0000@astro-page:src/pages/api/enviar-email@_@ts":"pages/api/enviar-email.astro.mjs","\u0000@astro-page:src/pages/api/github@_@ts":"pages/api/github.astro.mjs","\u0000@astro-page:src/pages/api/sendMail-Respaldo@_@js":"pages/api/sendmail-respaldo.astro.mjs","\u0000@astro-page:src/pages/api/signin@_@ts":"pages/api/signin.astro.mjs","\u0000@astro-page:src/pages/api/signout@_@ts":"pages/api/signout.astro.mjs","\u0000@astro-page:src/pages/api/signup@_@ts":"pages/api/signup.astro.mjs","\u0000@astro-page:src/pages/api/submitForm@_@ts":"pages/api/submitform.astro.mjs","\u0000@astro-page:src/pages/expert-help@_@astro":"pages/expert-help.astro.mjs","\u0000@astro-page:src/pages/service-orders@_@astro":"pages/service-orders.astro.mjs","\u0000@astro-page:src/pages/servicios@_@astro":"pages/servicios.astro.mjs","\u0000@astro-page:src/pages/signin@_@astro":"pages/signin.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.14.3_@types+node@22.5.0_rollup@4.21.0_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/formservice@_@astro":"pages/formservice.astro.mjs","\u0000@astro-page:src/pages/service-createorders@_@astro":"pages/service-createorders.astro.mjs","\u0000@astro-page:src/pages/servicedescription@_@astro":"pages/servicedescription.astro.mjs","\u0000@astro-page:src/pages/TestTurso@_@astro":"pages/testturso.astro.mjs","\u0000@astro-page:src/pages/api/createOrder@_@ts":"pages/api/createorder.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/serviciosm@_@astro":"pages/serviciosm.astro.mjs","C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/node_modules/.pnpm/astro@4.14.3_@types+node@22.5.0_rollup@4.21.0_typescript@5.4.5/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/node_modules/.pnpm/@astrojs+react@3.6.1_@types+react-dom@18.3.0_@types+react@18.3.3_react-dom@18.3.1_react@18.3._m54tnigmvx4lu3wklzhxg4frtm/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","\u0000@astrojs-manifest":"manifest_CTKC2hlU.mjs","/astro/hoisted.js?q=2":"_astro/hoisted.C5U_Y_RG.js","@/components/parallaxServices":"_astro/parallaxServices.DbX_gba4.js","/astro/hoisted.js?q=0":"_astro/hoisted.jmzo_G7f.js","/astro/hoisted.js?q=1":"_astro/hoisted.22JEArKb.js","@/components/service-createorders-form":"_astro/service-createorders-form.7idno9AY.js","@/components/FormReact":"_astro/FormReact.BQvzP9Ze.js","@astrojs/react/client.js":"_astro/client.BY2mA-CD.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/macbookimg.BtTfmgKU.png","/_astro/roboto-cyrillic-ext-700-normal.CsrCEJIc.woff2","/_astro/roboto-cyrillic-700-normal.B5ZBKWCH.woff2","/_astro/roboto-greek-700-normal.Cc2Tq8FV.woff2","/_astro/roboto-vietnamese-700-normal.SekShQfT.woff2","/_astro/roboto-latin-ext-700-normal.BYGCo3Go.woff2","/_astro/roboto-latin-700-normal.CeM5gOv8.woff2","/_astro/montserrat-cyrillic-ext-wght-normal.rV1oiNxr.woff2","/_astro/montserrat-latin-ext-wght-normal.BIVePy9u.woff2","/_astro/montserrat-vietnamese-wght-normal.BXWSX9tz.woff2","/_astro/montserrat-cyrillic-wght-normal.CHYi_LmU.woff2","/_astro/montserrat-latin-wght-normal.BDA6280a.woff2","/_astro/space-grotesk-vietnamese-wght-normal.D_Q6m-an.woff2","/_astro/space-grotesk-latin-ext-wght-normal.OnFqUBEL.woff2","/_astro/space-grotesk-latin-wght-normal.5PZORFv8.woff2","/_astro/roboto-cyrillic-ext-700-normal.dDOtDc5i.woff","/_astro/roboto-greek-700-normal.CjuTpGfE.woff","/_astro/roboto-cyrillic-700-normal.DAIxw5xX.woff","/_astro/roboto-latin-ext-700-normal.DwUXTeTv.woff","/_astro/roboto-vietnamese-700-normal.Mc0c6qif.woff","/_astro/roboto-latin-700-normal.Bh431LEL.woff","/_astro/TestTurso.DpHVcAzk.css","/_astro/TestTurso.DgZour51.css","/favicon.svg","/img/imac.png","/img/logogeniusbar.svg","/img/macbook.png","/_astro/client.BY2mA-CD.js","/_astro/FormReact.BQvzP9Ze.js","/_astro/hoisted.22JEArKb.js","/_astro/hoisted.C5U_Y_RG.js","/_astro/hoisted.jmzo_G7f.js","/_astro/index.B52nOzfP.js","/_astro/jsx-runtime.CRkqtJS5.js","/_astro/parallaxServices.DbX_gba4.js","/_astro/service-createorders-form.7idno9AY.js","/_astro/ToastContainer.mqTz6Ve3.js","/_astro/UserDropdown.astro_astro_type_script_index_0_lang.C0kIwZF6.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"nEUGwEwo860dK1xnKOldOkDO/SdX/P32zbDhGx0fD5U=","experimentalEnvGetSecretEnabled":false});

export { manifest };
