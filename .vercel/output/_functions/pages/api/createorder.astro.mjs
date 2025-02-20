import { generateId } from 'lucia';
import { g as getCurrentFormattedDate } from '../../chunks/dateFormatter_BMWjZbs9.mjs';
import { t as turdb } from '../../chunks/turso_GRw5KsYt.mjs';
export { renderers } from '../../renderers.mjs';

async function getNextOrderNumber() {
  const { rows } = await turdb.execute({
    sql: "SELECT ordernumber FROM ServiceOrder ORDER BY ordernumber DESC LIMIT 1",
    args: []
  });
  if (rows.length === 0) {
    return "Orden000";
  }
  const lastNumber = parseInt(String(rows[0].ordernumber).slice(5) ?? "000");
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
    await turdb.execute({
      sql: "INSERT INTO ServiceOrder (id, ordernumber, clientname, clientdni, email, phone, deviceType, model, serial, phonedetails, issue, devicepassword, status, createdAt, updatedAt, aditionalObservation, donerepairments, topay, payed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [orderId, orderNumber, clientname, clientdni, email, phone, deviceType, model, serial, phonedetails, issue, devicepassword, "Pending", getCurrentFormattedDate(), getCurrentFormattedDate(), "Sin especificar", "Sin especificar", 0, 0]
    });
    const { rows: countResults } = await turdb.execute({
      sql: "SELECT * FROM Ordercount LIMIT 1",
      args: []
    });
    //! ----------> Inicializacion de la tabla OrderCount <-----
    if (countResults.length === 0) {
      const { rows: initialCountResult } = await turdb.execute({
        sql: "SELECT COUNT(*) as total FROM ServiceOrder",
        args: []
      });
      const initialCount = initialCountResult[0]?.total;
      await turdb.execute({
        sql: "INSERT INTO OrderCount (totalOrders) VALUES (?)",
        args: [initialCount || 0]
      });
    }
    //! ----------> Fin de la logica de inicializacion <-----
    const { rows: countResultsUpdate } = await turdb.execute({
      sql: "SELECT id as idCount, totalOrders FROM OrderCount LIMIT 1",
      args: []
    });
    cl("countResults:", countResultsUpdate);
    if (countResultsUpdate.length > 0) {
      cl("countResults[0]:", countResultsUpdate[0]);
      const idFromCount = countResultsUpdate[0].idCount;
      cl("idFrontCount", idFromCount);
      if (idFromCount !== void 0) {
        const { rows: orderCountBeforeUpdate } = await turdb.execute({
          sql: "SELECT * FROM OrderCount LIMIT 1",
          args: []
        });
        console.log("OrderCount antes de la actualización:", orderCountBeforeUpdate);
        await turdb.execute({
          sql: "UPDATE OrderCount SET totalOrders = (SELECT COUNT(*) FROM ServiceOrder) WHERE id = ?",
          args: [idFromCount]
        });
        const { rows: orderCountAfterUpdate } = await turdb.execute({
          sql: "SELECT * FROM OrderCount LIMIT 1",
          args: []
        });
        console.log("OrderCount después de la actualización:", orderCountAfterUpdate);
      } else {
        console.error("Error: idFromCount es un undefined, pero countResults.lenght > 0");
        await turdb.execute({
          sql: "INSERT INTO OrderCount VALUES ?",
          args: [0]
        });
      }
    } else {
      await turdb.execute({
        sql: "INSERT INTO OrderCount VALUES ?",
        args: [0]
      });
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
