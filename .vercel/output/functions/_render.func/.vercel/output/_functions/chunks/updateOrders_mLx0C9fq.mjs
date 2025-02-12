import { g as getCurrentFormattedDate } from './dateFormatter_BMWjZbs9.mjs';
import { d as db, S as ServiceOrder } from './_astro_db_B32vqkck.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

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
    const updatedOrder = await db.update(ServiceOrder).set(updateData).where(eq(ServiceOrder.id, id)).returning();
    cl("resultado de la modificaciond de la base de datos", updatedOrder);
    cl("updateData de la modificaciond de la base de datos", updateData);
    if (updatedOrder.length === 0) {
      return new Response(JSON.stringify({ error: "Orden no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const checkOrder = await db.select().from(ServiceOrder).where(eq(ServiceOrder.id, id));
    console.log("Order after update:", checkOrder);
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
