//Api endpoint createOrder

import type { APIContext } from "astro";
// import { db, ServiceOrder, OrderCount, sql, eq } from "astro:db"
import { generateId } from "lucia";
import { getCurrentFormattedDate } from "@/utilities/dateFormatter";
import { getNextOrderNumber } from "@/utilities/orderUtils";
import { turdb } from "../../../db/turso";

const cl = console.log.bind(console);
export async function POST(contex: APIContext) : Promise<Response> {
    const formData = await contex.request.json();
    const {
        clientname, clientdni, email, phone, deviceType, phonedetails, model, serial, issue, devicepassword,
    } = formData;
    cl('CreateOrder API endpoint hit', formData);

    cl('Attempting to insert order into database', {
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
      });

        try {
            const orderId = generateId(15);
            const orderNumber = await getNextOrderNumber();
            // await db.insert(ServiceOrder).values({
            //     id: orderId,
            //     ordernumber: orderNumber,
            //     clientname,
            //     clientdni,
            //     email,
            //     phone,
            //     deviceType,
            //     model,
            //     serial,
            //     phonedetails,
            //     issue,
            //     devicepassword,
            //     status: 'Pending',
            //     createdAt: getCurrentFormattedDate(),
            //     updatedAt: getCurrentFormattedDate(),
            //     aditionalObservation: 'Sin especificar',
            //     donerepairments: 'Sin especificar',
            //     topay: 0,
            //     payed: 0,
            // } as any);

            await turdb.execute({
                sql: "INSERT INTO ServiceOrder (id, ordernumber, clientname, clientdni, email, phone, deviceType, model, serial, phonedetails, issue, devicepassword, status, createdAt, updatedAt, aditionalObservation, donerepairments, topay, payed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                args: [orderId, orderNumber, clientname, clientdni, email, phone, deviceType, model, serial, phonedetails, issue, devicepassword, 'Pending', getCurrentFormattedDate(), getCurrentFormattedDate(), 'Sin especificar', 'Sin especificar', 0, 0],
            } as any);

            // Para actualizar el conteo de órdenes
            // const countResults = await db
            // .select()
            // .from(OrderCount)
            // .limit(1);

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

                //  await db.insert(OrderCount).values({
                //     totalOrders: initialCount || 0, // Usar 0 si initialCount es undefined
                // });

                await turdb.execute({
                    sql: "INSERT INTO OrderCount (totalOrders) VALUES (?)",
                    args: [initialCount || 0]
                });
            }
            //! ----------> Fin de la logica de inicializacion <-----

            //Verificar si ya existe una fila en OrderCount (despues d ela Inicializacion)
            // const countResultsUpdate = await db
            // .select({
            //     idCount: OrderCount.id,
            //     totalOrders: OrderCount.totalOrders,
            // })
            // .from(OrderCount)
            // .limit(1);

            const { rows: countResultsUpdate } = await turdb.execute({
                sql: "SELECT id as idCount, totalOrders FROM OrderCount LIMIT 1",
                args: [],
            });
      
          cl("countResults:", countResultsUpdate); // Verifica el valor de countResulstUpdated
          
          if (countResultsUpdate.length > 0) {
            cl("countResults[0]:", countResultsUpdate[0]); 

            const idFromCount = countResultsUpdate[0].idCount;
            cl('idFrontCount', idFromCount)

            if(idFromCount !== undefined) {
                //const orderCountBeforeUpdate = await db.select().from(OrderCount).limit(1);

                const {rows: orderCountBeforeUpdate} = await turdb.execute({
                    sql: "SELECT * FROM OrderCount LIMIT 1",
                    args: [],
                });
                console.log("OrderCount antes de la actualización:", orderCountBeforeUpdate)
                
                // await db
                // .update(OrderCount)
                // .set({ 
                //     totalOrders: sql`(${db
                //         .select({count: sql<number>`COUNT(*)`})
                //         .from(ServiceOrder)})`
                //   })
                // .where(eq(OrderCount.id, idFromCount));//This is the specific condition. It uses the eq function (likely short for "equals") to check if the value in the id column of the OrderCount table is equal to the value stored in the idFromCount variable.
                // .where(sql`${idFromCount}`);

                await turdb.execute({
                    sql: "UPDATE OrderCount SET totalOrders = (SELECT COUNT(*) FROM ServiceOrder) WHERE id = ?",
                    args: [idFromCount],
                });

                //const orderCountAfterUpdate = await db.select().from(OrderCount).limit(1);

                const { rows: orderCountAfterUpdate } = await turdb.execute({
                    sql: "SELECT * FROM OrderCount LIMIT 1",
                    args: [],
                })
                console.log("OrderCount después de la actualización:", orderCountAfterUpdate);
              
            } else {
                console.error('Error: idFromCount es un undefined, pero countResults.lenght > 0')
                //await db.insert(OrderCount).values({ totalOrders: 0 });

                await turdb.execute({
                    sql: "INSERT INTO OrderCount VALUES ?",
                    args: [0],
                })
            }
        } else {
            // No se encontró ninguna fila en OrderCount, insertar una nueva
            //await db.insert(OrderCount).values({ totalOrders: 0 });

            await turdb.execute({
                sql: "INSERT INTO OrderCount VALUES ?",
                args: [0],
            })
        }
        // ----------> Fin de la logica de actualizacion <-----

            cl('orden creada:', orderId, 'Numero de Orden:', orderNumber)

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


