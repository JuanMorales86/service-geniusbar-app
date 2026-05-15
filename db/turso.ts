
import { createClient } from '@libsql/client'

console.log("DB URL:", process.env.ASTRO_DB_REMOTE_URL),
console.log("TOKEN:", process.env.ASTRO_STUDIO_APP_TOKEN ? "OK" : "MISSING")


export const turdb = createClient({
    url: process.env.ASTRO_DB_REMOTE_URL!,
    authToken: process.env.ASTRO_STUDIO_APP_TOKEN,
    
})