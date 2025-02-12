import type { APIRoute } from 'astro'; 
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email } = await request.json();
        const domain = email.split('@')[1];

        const mxRecods = await resolveMx(domain);
        return new Response(JSON.stringify({
            isValid: mxRecods.length > 0,
            message: mxRecods.length > 0 ? 'El email es válido' : 'Dominio de email no valido'
        }));

    } catch {
        return new Response(JSON.stringify({
            isvalid: false,
            message: 'Error al verificar el email'
        }));
    }
}

/**
APIRoute es un tipo de interfaz que proporciona Astro específicamente para endpoints API

Cuando hacemos export const POST: APIRoute, estamos diciendo que POST es una función que debe cumplir con la estructura que define APIRoute. Esta interfaz espera una función que reciba un objeto con propiedades específicas como request, params, etc.

La función se vuelve anónima (async ({ request })) porque es una implementación directa del tipo APIRoute. Es similar a cuando implementas una interfaz en programación orientada a objetos.

El beneficio es que TypeScript ahora conoce exactamente qué propiedades y métodos están disponibles en el objeto request, proporcionando autocompletado y verificación de tipos.

Es como un contrato que dice: "Esta función POST debe comportarse como un endpoint API de Astro, con todas sus características y restricciones". */

/**
 * 
1.const { email } = await request.json();

2.Extrae el email del cuerpo de la petición usando destructuring
 - El await es necesario porque .json() devuelve una promesa
-  const domain = email.split('@')[1];

3. Divide el email en el carácter '@' y toma la segunda parte
 - Ejemplo: para "usuario@gmail.com" obtiene "gmail.com"

3.const mxRecods = await resolveMx(domain);

- Usa la función promisificada resolveMx para verificar los registros MX del dominio
- Los registros MX indican si un dominio puede recibir correos

4.El return con el ternario:

return new Response(JSON.stringify({
    isValid: mxRecods.length > 0,
    message: mxRecods.length > 0 ? 'El email es válido' : 'Dominio de email no valido'
}));

- Si hay registros MX (length > 0), el dominio es válido
- Devuelve un objeto con el estado de validación y un mensaje apropiado

5. El bloque catch maneja cualquier error durante el proceso y devuelve una respuesta de error

6. Todo esto está envuelto en un try-catch para manejar posibles errores de forma elegante.
 * 
 */