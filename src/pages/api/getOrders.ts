import { offset } from "@formkit/tempo";
import type { APIContext } from "astro";
import { db, ServiceOrder, OrderCount } from "astro:db";
import { PUT as updateOrder } from "./updateOrders";
const cl = console.log.bind(console)


//PETICION GET PARA ServiceOrder
export async function GET(context: APIContext): Promise<Response> {
    try {
        const elementsPerPages = 5; //Ajustar paginacion a conveniencia
        const actualPage = parseInt(context.url.searchParams.get('pagina') || '1', 10) || 1;
        /*Intenta obtener el parámetro 'pagina' de la URL usando context.url.searchParams.get('pagina'). o pages o hojas se puede cambiar el nombre pagina por otro que tenga sentido.

        Si 'pagina' está presente en la URL, lo convierte a un número entero con parseInt(). El segundo argumento 10 indica que la conversión debe hacerse en base 10.
        
        Si 'pagina' no está presente o no se puede convertir a número, usa '1' como valor predeterminado.
        
        El || 1 al final asegura que si la conversión falla y devuelve NaN, se use el valor 1 como respaldo.
        
        Esta técnica garantiza que actualPage siempre tenga un número válido, usando 1 como valor predeterminado si no se especifica una página o si se proporciona un número de página inválido en la URL. Es una forma robusta de manejar los parámetros de paginación en tu API.*/
        const offset = (actualPage - 1) * elementsPerPages;

        //1.Obtener el conteo total de ordenes desde OrderCount
        const countResults = await db.select({ totalOrders: OrderCount.totalOrders }).from(OrderCount).limit(1);
        const totalOrder = countResults[0].totalOrders ?? 0;

        //2.Calcular el total de paginas
        const totalPages = Math.ceil(totalOrder / elementsPerPages);
        
        //3.Obtener las ordenes de la pagina actual
        const orders = await db.select()
        .from(ServiceOrder)
        .offset(offset)
        .limit(elementsPerPages);

        return new Response(JSON.stringify({
            ordenes: orders,
            actualPage,
            totalPages,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //Manejo de errores
    } catch (error) {
        console.error('Error al recuperar las ordenes', error);


        if(error instanceof Error) { //Verificar si es un error de Javascript
            if (error.message.includes('conexion')) { //Error de conexion
                return new Response(JSON.stringify({ error: 'Error de conexion a la base de datos'}), {status: 500});
            } else { //Otro tipo de error
                return new Response(JSON.stringify({error: 'Error al procesador la solicitud'}), {status: 500});
            }
        } else { //Error desconocido
            return new Response(JSON.stringify({error: 'Error desconocido'}), {status: 500})
        }
    }  
}

// PETICION PUT PARA ServiceOrder
export { updateOrder as PUT };