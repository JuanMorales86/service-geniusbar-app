import { defineConfig } from "auth-astro";//importar libreria de autenticacion de astro
import Google from "@auth/core/providers/google";//importar libreria de autenticacion de google

export default defineConfig({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ]
})
