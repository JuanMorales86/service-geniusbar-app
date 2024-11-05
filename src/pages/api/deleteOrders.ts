import type { APIContext } from "astro"
import { db, eq, ServiceOrder } from "astro:db"
const cl = console.log.bind(console)

interface Props {}

export async function DELETE(context: APIContext): Promise<Response> {
    try{    
        const {id} = await context.request.json();
        cl('Tratando de borrar la orden', id);

        const deletedOrder = await db
            .delete(ServiceOrder)
            .where(eq(ServiceOrder.id, id))
            .returning();
        if (deletedOrder.length === 0) {
            return new Response(JSON.stringify({ error: 'Orden no encontrada' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    return new Response(JSON.stringify({message: 'Orden borrada con exitoso'}), {
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
