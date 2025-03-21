import { P as PUT } from './updateOrders_CGH52gf-.mjs';
import { t as turdb } from './turso_CdaR7E3F.mjs';

const cl = console.log.bind(console);
async function GET(context) {
  try {
    const elementsPerPages = 5;
    const actualPage = parseInt(context.url.searchParams.get("pagina") || "1", 10) || 1;
    const offset = (actualPage - 1) * elementsPerPages;
    const { rows: countResults } = await turdb.execute({
      sql: "SELECT totalOrders FROM OrderCount LIMIT 1 ",
      args: []
    });
    cl("Count countResults", countResults);
    const totalOrder = Number(countResults[0]?.totalOrders) ?? 0;
    cl("Total de ordenes", totalOrder);
    const totalPages = Math.ceil(totalOrder / elementsPerPages);
    const { rows: orders } = await turdb.execute({
      sql: "SELECT * FROM ServiceOrder LIMIT ? OFFSET ?",
      args: [elementsPerPages, offset]
    });
    cl("Orders retrived", orders);
    return new Response(JSON.stringify({
      ordenes: orders,
      actualPage,
      totalPages
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al recuperar las ordenes", error);
    if (error instanceof Error) {
      if (error.message.includes("conexion")) {
        return new Response(JSON.stringify({ error: "Error de conexion a la base de datos" }), { status: 500 });
      } else {
        return new Response(JSON.stringify({ error: "Error al procesador la solicitud" }), { status: 500 });
      }
    } else {
      return new Response(JSON.stringify({ error: "Error desconocido" }), { status: 500 });
    }
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    PUT
}, Symbol.toStringTag, { value: 'Module' }));

export { GET as G, _page as _ };
