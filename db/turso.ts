//Inicializar un nuevo cliente para turso
import { createClient } from '@libsql/client/web'


export const turdb = createClient({
    url: process.env.ASTRO_DB_REMOTE_URL!,
    authToken: process.env.ASTRO_STUDIO_APP_TOKEN,
})



//   url: import.meta.env.ASTRO_DB_REMOTE_URL,
// authToken: import.meta.env.ASTRO_STUDIO_APP_TOKEN,