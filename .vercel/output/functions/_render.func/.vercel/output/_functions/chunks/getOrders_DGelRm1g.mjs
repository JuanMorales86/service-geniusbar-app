import '@formkit/tempo';
import { d as db, O as OrderCount, S as ServiceOrder } from './_astro_db_B32vqkck.mjs';
import { P as PUT } from './updateOrders_mLx0C9fq.mjs';

console.log.bind(console);
async function GET(context) {
  try {
    const elementsPerPages = 5;
    const actualPage = parseInt(context.url.searchParams.get("pagina") || "1", 10) || 1;
    const offset2 = (actualPage - 1) * elementsPerPages;
    const countResults = await db.select({ totalOrders: OrderCount.totalOrders }).from(OrderCount).limit(1);
    const totalOrder = countResults[0].totalOrders ?? 0;
    const totalPages = Math.ceil(totalOrder / elementsPerPages);
    const orders = await db.select().from(ServiceOrder).offset(offset2).limit(elementsPerPages);
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
