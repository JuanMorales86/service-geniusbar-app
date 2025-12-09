import type { APIContext } from "astro";
import { turdb } from "../../../db/turso";

function removeNullUndefined(obj: Record<string, any>) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

export async function PUT(context: APIContext): Promise<Response> {
    try {
        const { id, ...rawUpdateData } = await context.request.json();
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID es requerido' }), { status: 400 });
        }

        const updateData = removeNullUndefined(rawUpdateData);
        const columns = Object.keys(updateData);
        const setClause = columns.map(col => `${col} = ?`).join(', ');
        const values = [...Object.values(updateData), id];

        const { rows: updatedDevice } = await turdb.execute({
            sql: `UPDATE SaledDevices SET ${setClause} WHERE id = ? RETURNING *`,
            args: values,
        });

        if (updatedDevice.length === 0) {
            return new Response(JSON.stringify({ error: 'Dispositivo no encontrado' }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedDevice[0]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error updating saled device:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
