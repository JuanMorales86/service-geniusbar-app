import { defineConfig } from 'astro/config';
import "dotenv/config"; // Import dotenv to load environment variables
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import tailwindcss from "tailwindcss";
//import netlify from "@astrojs/netlify"
import node from "@astrojs/node";
import db from "@astrojs/db";
import icon from "astro-icon";
import middleware from "./src/middleware.ts"
import sitemap from "@astrojs/sitemap";



console.log("🔍 Astro config - output mode:", "server"); // Verificar qué modo se usa en build


// https://astro.build/config
export default defineConfig({
  site: 'https://www.onthepointservice.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  middleware: [middleware],
  image: {
    domains: ['i.imgur.com']
  },


  integrations: [
    sitemap(),
    tailwind(), 
    db({
      remoteUrl: process.env.ASTRO_DB_REMOTE_URL,
      token:process.env.ASTRO_STUDIO_APP_TOKEN
    }), 
    react(), 
    icon({
    include: { 
      lucide: ["*"] //importar todo * biblioteca de iconos
    }
  })
    
],
  vite: {
    plugins: [tailwindcss()], 
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    logLevel: "info",
    optimizeDeps: {
      include: ["react-to-print", "fast-glob"],
      exclude: ["oslo"]
    },
    build: {
      commonjsOptions: {
        include: [/react-to-print/, /fast-glob/, /node_modules/],
        transformMixedEsModules: true,
      }
    },
   
    // server: {
    //   hmr:{
    //     port: 9000,// You can change this to any available port
    //   }
    // }
  },
  // server:{
  //   port:4321 // Astro port
  // },
 
});