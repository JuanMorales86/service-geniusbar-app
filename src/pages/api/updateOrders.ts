import { getCurrentFormattedDate } from "@/utilities/dateFormatter";
import type { APIContext } from "astro";
import { ServiceOrder, db, eq } from "astro:db";
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
    const updatedOrder = await db
      .update(ServiceOrder)
      .set(updateData)
      .where(eq(ServiceOrder.id, id))
      .returning();
        cl('resultado de la modificaciond de la base de datos',updatedOrder)
        cl('updateData de la modificaciond de la base de datos',updateData)
 
      if(updatedOrder.length === 0){
        return new Response(JSON.stringify({ error: 'Orden no encontrada'}), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
      }
      const checkOrder = await db.select().from(ServiceOrder).where(eq(ServiceOrder.id, id));
console.log('Order after update:', checkOrder);
   
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