import { d as db, S as ServiceOrder, O as OrderCount } from '../../chunks/_astro_db_B32vqkck.mjs';
import { generateId } from 'lucia';
import { g as getCurrentFormattedDate } from '../../chunks/dateFormatter_BMWjZbs9.mjs';
import { desc, sql, eq } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

async function getNextOrderNumber() {
  const latestOrder = await db.select({ ordernumber: ServiceOrder.ordernumber }).from(ServiceOrder).orderBy(desc(ServiceOrder.ordernumber)).limit(1);
  if (latestOrder.length === 0) {
    return "Orden000";
  }
  const lastNumber = parseInt(latestOrder?.[0]?.ordernumber?.slice(5) ?? "000");
  const nextNumber = lastNumber + 1;
  return `Orden${nextNumber.toString().padStart(3, "0")}`;
}

const cl = console.log.bind(console);
async function POST(contex) {
  const formData = await contex.request.json();
  const {
    clientname,
    clientdni,
    email,
    phone,
    deviceType,
    phonedetails,
    model,
    serial,
    issue,
    devicepassword,
    aditionalObservation,
    donerepairments,
    topay,
    payed
  } = formData;
  cl("CreateOrder API endpoint hit", formData);
  cl("Attempting to insert order into database", {
    clientname,
    clientdni,
    email,
    phone,
    deviceType,
    model,
    serial,
    phonedetails,
    issue,
    devicepassword
  });
  try {
    const orderId = generateId(15);
    const orderNumber = await getNextOrderNumber();
    await db.insert(ServiceOrder).values({
      id: orderId,
      ordernumber: orderNumber,
      clientname,
      clientdni,
      email,
      phone,
      deviceType,
      model,
      serial,
      phonedetails,
      issue,
      devicepassword,
      status: "Pending",
      createdAt: getCurrentFormattedDate(),
      updatedAt: getCurrentFormattedDate(),
      aditionalObservation: "Sin especificar",
      donerepairments: "Sin especificar",
      topay: 0,
      payed: 0
    });
    const countResults = await db.select().from(OrderCount).limit(1);
    if (countResults.length === 0) {
      const initialCountResult = await db.select({ total: sql`COUNT(*)` }).from(ServiceOrder);
      //! Usamos sql<number> para tipar el resultado
      const initialCount = initialCountResult[0]?.total;
      await db.insert(OrderCount).values({
        totalOrders: initialCount || 0
        // Usar 0 si initialCount es undefined
      });
    }
    const countResultsUpdate = await db.select({
      idCount: OrderCount.id,
      totalOrders: OrderCount.totalOrders
    }).from(OrderCount).limit(1);
    cl("countResults:", countResultsUpdate);
    if (countResultsUpdate.length > 0) {
      cl("countResults[0]:", countResultsUpdate[0]);
      const idFromCount = countResultsUpdate[0].idCount;
      cl("idFrontCount", idFromCount);
      if (idFromCount !== void 0) {
        const orderCountBeforeUpdate = await db.select().from(OrderCount).limit(1);
        console.log("OrderCount antes de la actualización:", orderCountBeforeUpdate);
        await db.update(OrderCount).set({
          totalOrders: sql`(${db.select({ count: sql`COUNT(*)` }).from(ServiceOrder)})`
        }).where(eq(OrderCount.id, idFromCount));
        const orderCountAfterUpdate = await db.select().from(OrderCount).limit(1);
        console.log("OrderCount después de la actualización:", orderCountAfterUpdate);
      } else {
        console.error("Error: idFromCount es un undefined, pero countResults.lenght > 0");
        await db.insert(OrderCount).values({ totalOrders: 0 });
      }
    } else {
      await db.insert(OrderCount).values({ totalOrders: 0 });
    }
    cl("orden creada:", orderId, "Numero de Orden:", orderNumber);
    return new Response(JSON.stringify({ success: true, orderId, orderNumber }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error al crear la orden", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al crear la oden" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
