import type { APIContext } from "astro";
import { turdb } from "../../../db/turso";

export async function GET(context: APIContext): Promise<Response> {
    const url = new URL(context.request.url);
    const page = parseInt(url.searchParams.get('pagina') || '1', 10);
    const search = url.searchParams.get('search') || '';
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        let whereClause = '';
        const args: (string | number)[] = [];

        if (search) {
            // Si el usuario buscó algo, preparamos la condición de búsqueda
            whereClause = `WHERE clientname LIKE ? OR clientdni LIKE ? OR serial LIKE ? OR imei1 LIKE ?`;
            const searchTerm = `%${search}%`; // El % busca el texto en cualquier parte del campo
            args.push(searchTerm, searchTerm, searchTerm, searchTerm);
        }

        const { rows: devices } = await turdb.execute({
            sql: `SELECT * FROM SaledDevices ${whereClause} ORDER BY saledate DESC LIMIT ? OFFSET ?`,
            args: [...args, limit, offset],
        });

        const { rows: totalResult } = await turdb.execute({
            sql: `SELECT COUNT(*) as count FROM SaledDevices ${whereClause}`,
            args: args,
        });

        const totalDevices = totalResult[0]?.count as number || 0;
        const totalPages = Math.ceil(totalDevices / limit);

        return new Response(JSON.stringify({
            devices,// La lista de 10 dispositivos de la página actual
            actualPage: page, // El número de la página que se está viendo
            totalPages, // El número total de páginas que existen
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error fetching saled devices:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
