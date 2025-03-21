import type { APIContext } from "astro"
import { turdb } from "../../../db/turso";


export async function DELETE(context: APIContext): Promise<Response> {
    try{    
        const {id} = await context.request.json();
   

 
        const {rows: deletedOrder} = await turdb.execute({
            sql:'DELETE FROM ServiceOrder WHERE id = ? RETURNING *',
            args: [id],
        })

      

        if (deletedOrder.length === 0) {
            return new Response(JSON.stringify({ error: 'Orden no encontrada' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({
            message: 'Orden borrada con exitoso',
            deletedOrder: deletedOrder[0]
        }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

    } catch (error) {
        console.error('Error borrando la orden:', error);
        return new Response(JSON.stringify({ error: 'Error interno de servidor'}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }


}
