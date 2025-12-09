import type { APIContext } from "astro";
import { turdb } from "@../../db/turso";

export async function DELETE(context: APIContext): Promise<Response> {
    try {
        const { id } = await context.request.json();
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID es requerido' }), { status: 400 });
        }

        const result = await turdb.execute({
            sql: 'DELETE FROM SaledDevices WHERE id = ?',
            args: [id],
        });

        if (result.rowsAffected === 0) {
            return new Response(JSON.stringify({ error: 'Dispositivo no encontrado' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error deleting saled device:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
