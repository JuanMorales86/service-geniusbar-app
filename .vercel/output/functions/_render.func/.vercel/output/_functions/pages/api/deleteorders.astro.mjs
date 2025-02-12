import { d as db, S as ServiceOrder } from '../../chunks/_astro_db_B32vqkck.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

const cl = console.log.bind(console);
async function DELETE(context) {
  try {
    const { id } = await context.request.json();
    cl("Tratando de borrar la orden", id);
    const deletedOrder = await db.delete(ServiceOrder).where(eq(ServiceOrder.id, id)).returning();
    if (deletedOrder.length === 0) {
      return new Response(JSON.stringify({ error: "Orden no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ message: "Orden borrada con exitoso" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error borrando la orden:", error);
    return new Response(JSON.stringify({ error: "Error interno de servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
