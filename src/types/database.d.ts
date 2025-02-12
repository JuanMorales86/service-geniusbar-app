//Objetivo: El archivo database.d.ts se encarga de definir los tipos de datos que representan las tablas de tu base de datos para TypeScript. Esto ayuda a mantener la consistencia de tipos entre tu base de datos y tu código TypeScript, lo que facilita el desarrollo y previene errores.

import { z } from "astro:db"; /*Importar z:
import { z } from 'astro:db';: Importa el objeto z del paquete astro:db. Este objeto proporciona funciones para trabajar con Zod, una librería de validación y análisis de esquemas de datos que Astro DB utiliza internamente. */

/*Definir el tipo ServiceOrder:
export type ServiceOrder = z.infer<typeof import('../db/config').default>['tables']['ServiceOrder'];: Esta línea define un nuevo tipo llamado ServiceOrder que representa la estructura de tu tabla ServiceOrder en la base de datos. */
export type ServiceOrder = z.infer<typeof import("db/config").default>["tables"]["ServiceOrder"];
export type ServiceOrder = {
  //este es probando si es necesario borralo y deja el de arriba 📤
  id: string;
  ordernumber?: string;
  clientname?: string;
  clientdni?: string;
  email?: string;
  phone?: string;
  deviceType?: string;
  model?: string;
  serial?: string;
  issue?: string;
  phonedetails?: string;
  devicepassword?: string;
  status?: string;
  createdAt?: number;
  updatedAt?: string | number | null;
  aditionalObservation?: string;
  donerepairments?: string;
  topay?: number;
  payed?: number;
};
/*
- export type ServiceOrder = ...: Exporta el tipo ServiceOrder para que pueda ser utilizado en otros archivos de tu proyecto.
- z.infer<...>: Utiliza la función infer de Zod para inferir el tipo de datos a partir del esquema de la tabla ServiceOrder. Esto crea un tipo TypeScript que coincide exactamente con la estructura de tu tabla en la base de datos.
- typeof import(...): Obtiene el tipo del objeto importado (la configuración de la base de datos).
- import('../db/config').default: Importa la configuración de tu base de datos desde el archivo db/config.ts. Esta configuración incluye los esquemas de tus tablas.
- ['tables']['ServiceOrder']: Accede a la propiedad tables del objeto de configuración y luego a la propiedad ServiceOrder dentro de tables. Esto selecciona el esquema de la tabla ServiceOrder.
 */
