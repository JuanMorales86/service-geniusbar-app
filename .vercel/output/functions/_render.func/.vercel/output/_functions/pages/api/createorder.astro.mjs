import { d as db, b as ServiceOrder } from '../../chunks/_astro_db_Cmk0CmgW.mjs';
import { generateId } from 'lucia';
import { format } from '@formkit/tempo';
import { desc } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

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
    devicepassword
  } = formData;
  console.log("CreateOrder API endpoint hit", formData);
  console.log("Attempting to insert order into database", {
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
      updatedAt: getCurrentFormattedDate()
    });
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
