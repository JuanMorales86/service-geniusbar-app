import { t as turdb } from '../../chunks/turso_CdaR7E3F.mjs';
export { renderers } from '../../renderers.mjs';

const cl = console.log.bind(console);
async function DELETE(context) {
  try {
    const { id } = await context.request.json();
    cl("Tratando de borrar la orden", id);
    const { rows: deletedOrder } = await turdb.execute({
      sql: "DELETE FROM ServiceOrder WHERE id = ? RETURNING *",
      args: [id]
    });
    cl("Delete operation result:", deletedOrder);
    if (deletedOrder.length === 0) {
      return new Response(JSON.stringify({ error: "Orden no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      message: "Orden borrada con exitoso",
      deletedOrder: deletedOrder[0]
    }), {
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
