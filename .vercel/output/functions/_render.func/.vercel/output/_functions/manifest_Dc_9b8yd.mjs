import { _ as bold, $ as red, a0 as yellow, a1 as dim, a2 as blue } from './chunks/astro_BkI29Jvg.mjs';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

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
    const path = toPath(params);
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
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.5.10_typescript@5.4.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/TestTurso.Do-Qc3Ok.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/callbacks/github","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/callbacks\\/github\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"callbacks","dynamic":false,"spread":false}],[{"content":"github","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/callbacks/github.ts","pathname":"/api/callbacks/github","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/github","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/github\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"github","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/github.ts","pathname":"/api/github","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signin.ts","pathname":"/api/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signout.ts","pathname":"/api/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signup","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signup\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signup.ts","pathname":"/api/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CaREk9lS.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.Do-Qc3Ok.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Mono:wght@400;500;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;700;900&display=swap\";@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;background:#13151a;color-scheme:dark light}body{font-family:Roboto,sans-serif}.roboto-bold{font-family:Roboto,sans-serif;font-weight:800;font-style:normal}.roboto-semibold{font-family:Roboto,sans-serif;font-weight:600;font-style:normal}.roboto-regular{font-family:Roboto,sans-serif;font-weight:400;font-style:normal}.montserrat-bold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:800;font-style:normal}.montserrat-semibold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:600;font-style:normal}.montserrat-regular{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-code-normal{font-family:Fira Code,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-mono-regular{font-family:Fira Mono,monospace;font-weight:400;font-style:normal}.fira-mono-medium{font-family:Fira Mono,monospace;font-weight:500;font-style:normal}.fira-mono-bold{font-family:Fira Mono,monospace;font-weight:700;font-style:normal}.fira-code-bold{font-family:Fira Code,monospace;font-optical-sizing:auto;font-weight:800;font-style:normal}.bg-gradient-blk-gray{background:linear-gradient(to bottom,#13151a 0% 5%,#4b5563)}\n"}],"routeData":{"route":"/servicios","isIndex":false,"type":"page","pattern":"^\\/servicios\\/?$","segments":[[{"content":"servicios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicios.astro","pathname":"/servicios","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CaREk9lS.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.Do-Qc3Ok.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Mono:wght@400;500;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;700;900&display=swap\";@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;background:#13151a;color-scheme:dark light}body{font-family:Roboto,sans-serif}.roboto-bold{font-family:Roboto,sans-serif;font-weight:800;font-style:normal}.roboto-semibold{font-family:Roboto,sans-serif;font-weight:600;font-style:normal}.roboto-regular{font-family:Roboto,sans-serif;font-weight:400;font-style:normal}.montserrat-bold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:800;font-style:normal}.montserrat-semibold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:600;font-style:normal}.montserrat-regular{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-code-normal{font-family:Fira Code,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-mono-regular{font-family:Fira Mono,monospace;font-weight:400;font-style:normal}.fira-mono-medium{font-family:Fira Mono,monospace;font-weight:500;font-style:normal}.fira-mono-bold{font-family:Fira Mono,monospace;font-weight:700;font-style:normal}.fira-code-bold{font-family:Fira Code,monospace;font-optical-sizing:auto;font-weight:800;font-style:normal}.bg-gradient-blk-gray{background:linear-gradient(to bottom,#13151a 0% 5%,#4b5563)}\n"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CaREk9lS.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.Do-Qc3Ok.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Mono:wght@400;500;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;700;900&display=swap\";@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;background:#13151a;color-scheme:dark light}body{font-family:Roboto,sans-serif}.roboto-bold{font-family:Roboto,sans-serif;font-weight:800;font-style:normal}.roboto-semibold{font-family:Roboto,sans-serif;font-weight:600;font-style:normal}.roboto-regular{font-family:Roboto,sans-serif;font-weight:400;font-style:normal}.montserrat-bold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:800;font-style:normal}.montserrat-semibold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:600;font-style:normal}.montserrat-regular{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-code-normal{font-family:Fira Code,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-mono-regular{font-family:Fira Mono,monospace;font-weight:400;font-style:normal}.fira-mono-medium{font-family:Fira Mono,monospace;font-weight:500;font-style:normal}.fira-mono-bold{font-family:Fira Mono,monospace;font-weight:700;font-style:normal}.fira-code-bold{font-family:Fira Code,monospace;font-optical-sizing:auto;font-weight:800;font-style:normal}.bg-gradient-blk-gray{background:linear-gradient(to bottom,#13151a 0% 5%,#4b5563)}\n"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CaREk9lS.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.Do-Qc3Ok.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Mono:wght@400;500;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;700;900&display=swap\";@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;background:#13151a;color-scheme:dark light}body{font-family:Roboto,sans-serif}.roboto-bold{font-family:Roboto,sans-serif;font-weight:800;font-style:normal}.roboto-semibold{font-family:Roboto,sans-serif;font-weight:600;font-style:normal}.roboto-regular{font-family:Roboto,sans-serif;font-weight:400;font-style:normal}.montserrat-bold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:800;font-style:normal}.montserrat-semibold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:600;font-style:normal}.montserrat-regular{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-code-normal{font-family:Fira Code,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-mono-regular{font-family:Fira Mono,monospace;font-weight:400;font-style:normal}.fira-mono-medium{font-family:Fira Mono,monospace;font-weight:500;font-style:normal}.fira-mono-bold{font-family:Fira Mono,monospace;font-weight:700;font-style:normal}.fira-code-bold{font-family:Fira Code,monospace;font-optical-sizing:auto;font-weight:800;font-style:normal}.bg-gradient-blk-gray{background:linear-gradient(to bottom,#13151a 0% 5%,#4b5563)}\n"}],"routeData":{"route":"/testturso","isIndex":false,"type":"page","pattern":"^\\/TestTurso\\/?$","segments":[[{"content":"TestTurso","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/TestTurso.astro","pathname":"/TestTurso","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CaREk9lS.js"}],"styles":[{"type":"external","src":"/_astro/TestTurso.Do-Qc3Ok.css"},{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Fira+Mono:wght@400;500;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:wght@300;400;700;900&display=swap\";@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}html{font-family:system-ui,sans-serif;background:#13151a;color-scheme:dark light}body{font-family:Roboto,sans-serif}.roboto-bold{font-family:Roboto,sans-serif;font-weight:800;font-style:normal}.roboto-semibold{font-family:Roboto,sans-serif;font-weight:600;font-style:normal}.roboto-regular{font-family:Roboto,sans-serif;font-weight:400;font-style:normal}.montserrat-bold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:800;font-style:normal}.montserrat-semibold{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:600;font-style:normal}.montserrat-regular{font-family:Montserrat,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-code-normal{font-family:Fira Code,sans-serif;font-optical-sizing:auto;font-weight:400;font-style:normal}.fira-mono-regular{font-family:Fira Mono,monospace;font-weight:400;font-style:normal}.fira-mono-medium{font-family:Fira Mono,monospace;font-weight:500;font-style:normal}.fira-mono-bold{font-family:Fira Mono,monospace;font-weight:700;font-style:normal}.fira-code-bold{font-family:Fira Code,monospace;font-optical-sizing:auto;font-weight:800;font-style:normal}.bg-gradient-blk-gray{background:linear-gradient(to bottom,#13151a 0% 5%,#4b5563)}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/TestTurso.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/TestTurso@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/servicios.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/servicios@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signin.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/signin@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/src/pages/signup.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/signup@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","/src/pages/admin.astro":"chunks/pages/admin_CyOD-K1G.mjs","/node_modules/.pnpm/astro@4.5.10_typescript@5.4.3/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_B_avd5Ol.mjs","/src/pages/index.astro":"chunks/pages/index_aoEzYRGK.mjs","/src/pages/servicios.astro":"chunks/pages/servicios_DYGgx4na.mjs","/src/pages/signin.astro":"chunks/pages/signin_CgLGdBEd.mjs","/src/pages/api/signin.ts":"chunks/pages/signin_DogPwOUF.mjs","/src/pages/api/signout.ts":"chunks/pages/signout_Bj-QXu3i.mjs","/src/pages/signup.astro":"chunks/pages/signup_yW0VoyM4.mjs","/src/pages/api/signup.ts":"chunks/pages/signup_B1J2iG90.mjs","\u0000@astrojs-manifest":"manifest_Dc_9b8yd.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.5.10_typescript@5.4.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DOs9R9Bn.mjs","\u0000@astro-page:src/pages/admin@_@astro":"chunks/admin_BveWY1ze.mjs","\u0000@astro-page:src/pages/api/callbacks/github@_@ts":"chunks/github_Crlgp3jK.mjs","\u0000@astro-page:src/pages/api/github@_@ts":"chunks/github_DPT9Oy9W.mjs","\u0000@astro-page:src/pages/api/signin@_@ts":"chunks/signin_Dm9r0Z-K.mjs","\u0000@astro-page:src/pages/api/signout@_@ts":"chunks/signout_hL7p9xq7.mjs","\u0000@astro-page:src/pages/api/signup@_@ts":"chunks/signup_C6ZGh0Kh.mjs","\u0000@astro-page:src/pages/servicios@_@astro":"chunks/servicios_CNL4NQ4H.mjs","\u0000@astro-page:src/pages/signin@_@astro":"chunks/signin_CFzqHm2W.mjs","\u0000@astro-page:src/pages/signup@_@astro":"chunks/signup_D-9Sq2nL.mjs","\u0000@astro-page:src/pages/TestTurso@_@astro":"chunks/TestTurso_BCfkfTYD.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BYrMg1y5.mjs","@astrojs/preact/client.js":"_astro/client.D3qZTTHn.js","C:/Users/juanj/Desktop/ASTRO/service-geniusbar-app/node_modules/.pnpm/@preact+signals@1.2.3_preact@10.20.1/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.CgWwp9rv.js","/astro/hoisted.js?q=0":"_astro/hoisted.CaREk9lS.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/TestTurso.Do-Qc3Ok.css","/favicon.svg","/_astro/client.BohdDPRY.js","/_astro/client.D3qZTTHn.js","/_astro/hoisted.CaREk9lS.js","/_astro/signals.module.CgWwp9rv.js"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
