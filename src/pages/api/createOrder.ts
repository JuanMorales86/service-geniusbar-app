//Api endpoint createOrder

import type { APIContext } from "astro";
import { generateId } from "lucia";
import { getISODate } from "@/utilities/dateFormatter";
import { getNextOrderNumber } from "@/utilities/orderUtils";
import { turdb } from "../../../db/turso";

const cl = console.log.bind(console);
export async function POST(contex: APIContext) : Promise<Response> {
    const formData = await contex.request.json();
    const {
        clientname, clientdni, email, phone, deviceType, phonedetails, model, serial, issue, devicepassword,
    } = formData;

        try {
            const orderId = generateId(15);
            const orderNumber = await getNextOrderNumber();

            await turdb.execute({
                sql: "INSERT INTO ServiceOrder (id, ordernumber, clientname, clientdni, email, phone, deviceType, model, serial, phonedetails, issue, devicepassword, status, createdAt, updatedAt, aditionalObservation, donerepairments, topay, payed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                args: [orderId, orderNumber, clientname, clientdni, email, phone, deviceType, model, serial, phonedetails, issue, devicepassword, 'Pendiente', getISODate(), getISODate(), 'Sin especificar', 'Sin especificar', 0, 0],
            } as any);


            const { rows: countResults } = await turdb.execute({
                sql: "SELECT * FROM Ordercount LIMIT 1",
                args: [],
            })
           
            //! ----------> Inicializacion de la tabla OrderCount <-----
            if(countResults.length === 0) {
                 //La tabla estavacia, calcular el conteo inicial
                // const initialCountResult = await db.select({total: sql<number>`COUNT(*)`} ).from(ServiceOrder)//! Usamos sql<number> para tipar el resultado

                const { rows: initialCountResult } = await turdb.execute({
                    sql: "SELECT COUNT(*) as total FROM ServiceOrder",
                    args: []
                });
                const initialCount = initialCountResult[0]?.total;// Usar optional chaining


                await turdb.execute({
                    sql: "INSERT INTO OrderCount (totalOrders) VALUES (?)",
                    args: [initialCount || 0]
                });
            }
            //! ----------> Fin de la logica de inicializacion <-----

            const { rows: countResultsUpdate } = await turdb.execute({
                sql: "SELECT id as idCount, totalOrders FROM OrderCount LIMIT 1",
                args: [],
            });

        if (countResultsUpdate.length > 0) {
            const idFromCount = countResultsUpdate[0].idCount;

            if(idFromCount !== undefined) {

                const {rows: orderCountBeforeUpdate} = await turdb.execute({
                    sql: "SELECT * FROM OrderCount LIMIT 1",
                    args: [],
                });

                await turdb.execute({
                    sql: "UPDATE OrderCount SET totalOrders = (SELECT COUNT(*) FROM ServiceOrder) WHERE id = ?",
                    args: [idFromCount],
                });

                

                const { rows: orderCountAfterUpdate } = await turdb.execute({
                    sql: "SELECT * FROM OrderCount LIMIT 1",
                    args: [],
                })
            } else {

                await turdb.execute({
                    sql: "INSERT INTO OrderCount VALUES ?",
                    args: [0],
                })
            }
        } else {

            await turdb.execute({
                sql: "INSERT INTO OrderCount VALUES ?",
                args: [0],
            })
        }

            return new Response(JSON.stringify({ success: true, orderId, orderNumber }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error al crear la orden', error);
            return new Response(JSON.stringify({ success: false, error: 'Error al crear la oden'}), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }, 
            }
        )};
}
