import { getCurrentFormattedDate } from "@/utilities/dateFormatter";
import type { APIContext } from "astro";
// import { ServiceOrder, db, eq } from "astro:db";
import { turdb } from "../../../db/turso";
const cl = console.log.bind(console)

function removeNullUndefined(obj: Record<string, any>) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null)
    );
  }

export async function PUT(context: APIContext): Promise<Response> {
    try {
    const { id, ...rawUpdateData } = await context.request.json();
    const updateData = {
      ...removeNullUndefined(rawUpdateData), 
      updatedAt: getCurrentFormattedDate()}
    cl('tratando de modificar la orden', id)
    cl('Before update:', updateData);
    
    // const updatedOrder = await db
    //   .update(ServiceOrder)
    //   .set(updateData)
    //   .where(eq(ServiceOrder.id, id))
    //   .returning();

    // const {rows: updatedOrder} = await turdb.execute({
    //   sql: `UPDATE ServiceOrder 
    //         SET status = ?, 
    //             clientname = ?,
    //             clientdni = ?,
    //             email = ?,
    //             phone = ?,
    //             deviceType = ?,
    //             model = ?,
    //             serial = ?,
    //             phonedetails = ?,
    //             devicepassword = ?,
    //             issue = ?,
    //             aditionalObservation = ?,
    //             donerepairments = ?,
    //             topay = ?,
    //             payed = ?,
    //             updatedAt = ?
    //         WHERE id = ? 
    //         RETURNING *`,
    //   args: [
    //     ServiceOrder.status,
    //     ServiceOrder.clientname,
    //     ServiceOrder.clientdni,
    //     ServiceOrder.email,
    //     ServiceOrder.phone,
    //     ServiceOrder.deviceType,
    //     ServiceOrder.model,
    //     ServiceOrder.serial,
    //     ServiceOrder.phonedetails,
    //     ServiceOrder.devicepassword,
    //     ServiceOrder.issue,
    //     ServiceOrder.aditionalObservation,
    //     ServiceOrder.donerepairments,
    //     ServiceOrder.topay,
    //     ServiceOrder.payed,
    //     updateData.updatedAt,
    //     id
    //         ]
    // })

    const columns = Object.keys(updateData);//Obtiene los nombres de las columnas a actualizar
    const setClause = columns.map(col => `${col} = ?`).join(', '); // Crea la cláusula SET dinamica
    const values = [...Object.values(updateData), id]; //Prepara array de valores + id

    const {rows: updatedOrder} = await turdb.execute({
        sql: `UPDATE ServiceOrder SET ${setClause} WHERE id = ? RETURNING *`,
        args: values
    })

    /*1.Generamos dinámicamente la cláusula SET basada en los campos presentes en updateData
      2.Creamos un array de valores que coincide con los placeholders (?)
      3.Mantenemos el id al final para el WHERE
      4.Usamos RETURNING * para obtener la fila actualizada
      5.La sintaxis es más cercana a SQL puro pero mantiene la seguridad con parámetros 
    */
        cl('resultado de la modificaciond de la base de datos',updatedOrder)
        cl('updateData de la modificaciond de la base de datos',updateData)
 
      if(updatedOrder.length === 0){
        return new Response(JSON.stringify({ error: 'Orden no encontrada'}), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
      }
      // const checkOrder = await db.select().from(ServiceOrder).where(eq(ServiceOrder.id, id));

      const {rows: checkOrder} = await turdb.execute({
        sql:'SELECT * FROM ServiceOrder WHERE id = ?',
        args:[id],
      })
      cl('Order after update:', checkOrder);

    return new Response(JSON.stringify(updatedOrder[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }),{
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    })
  }
  
}

/*
Cuando usas el input directo en el SQL:

// INSEGURO ❌
sql: `UPDATE ServiceOrder SET status = '${userInput}'`

Copy

Apply

Usando parámetros con ? y args:

// SEGURO ✅
sql: `UPDATE ServiceOrder SET status = ?`,
args: [userInput]

Copy

Apply

El segundo método es más seguro porque:

Turso sanitiza automáticamente los valores
Los datos se tratan como valores puros, no como comandos SQL
El motor de base de datos sabe exactamente qué esperar en cada ?
Los valores maliciosos no pueden ejecutarse como código SQL
Por eso en nuestra implementación usamos:

const setClause = columns.map(col => `${col} = ?`).join(', ');
const values = [...Object.values(updateData), id];

Copy

Apply

Cada valor tiene su ? correspondiente y se pasa de forma segura a través de args.
*/