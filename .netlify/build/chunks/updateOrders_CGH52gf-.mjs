import { g as getCurrentFormattedDate } from './dateFormatter_BMWjZbs9.mjs';
import { t as turdb } from './turso_CdaR7E3F.mjs';

const cl = console.log.bind(console);
function removeNullUndefined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null)
  );
}
async function PUT(context) {
  try {
    const { id, ...rawUpdateData } = await context.request.json();
    const updateData = {
      ...removeNullUndefined(rawUpdateData),
      updatedAt: getCurrentFormattedDate()
    };
    cl("tratando de modificar la orden", id);
    cl("Before update:", updateData);
    const columns = Object.keys(updateData);
    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const values = [...Object.values(updateData), id];
    const { rows: updatedOrder } = await turdb.execute({
      sql: `UPDATE ServiceOrder SET ${setClause} WHERE id = ? RETURNING *`,
      args: values
    });
    cl("resultado de la modificaciond de la base de datos", updatedOrder);
    cl("updateData de la modificaciond de la base de datos", updateData);
    if (updatedOrder.length === 0) {
      return new Response(JSON.stringify({ error: "Orden no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { rows: checkOrder } = await turdb.execute({
      sql: "SELECT * FROM ServiceOrder WHERE id = ?",
      args: [id]
    });
    cl("Order after update:", checkOrder);
    return new Response(JSON.stringify(updatedOrder[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

export { PUT as P, _page as _ };
