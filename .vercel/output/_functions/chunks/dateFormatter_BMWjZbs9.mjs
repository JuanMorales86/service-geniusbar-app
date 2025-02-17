import { format } from '@formkit/tempo';

function formatDate() {
  const d = /* @__PURE__ */ new Date();
  return format({
    date: d,
    format: { date: "short", time: "short" },
    // usa la sintaxys del objeto para la funcion format
    tz: "America/Argentina/Buenos_Aires",
    // especifica el timezone usando la propiedad tz
    locale: "es-AR"
    // setea el locale usando la propiedad locale.
  });
}
function getCurrentFormattedDate() {
  return formatDate();
}

export { getCurrentFormattedDate as g };
