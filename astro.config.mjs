import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";


import icon from "astro-icon";

console.log('Starting Astro configuration');

// https://astro.build/config
export default defineConfig({

  image: {
    domains: ['i.imgur.com']
  },

  // experimental: {
  //   env: {
  //     schema: {
  //       PASS_APP_GMAIL: envField.string({
  //         description: 'Gmail application password',
  //         context: 'server',
  //         access: 'secret',
  //       }),
  //       USER_GMAIL: envField.string({
  //         description: 'Gmail user email',
  //         context: 'server',
  //         access: 'secret'
  //       })
  //     }
  //   }
  // },

  integrations: [tailwind(), db(), react(), icon({
    include: { 
      lucide: ["*"] //importar todo * biblioteca de iconos
    }
  })],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    },
    server: {
      hmr:{
        port: 9000,// You can change this to any available port
      }
    }
  },
  server:{
    port:4321 // Astro port
  },
  output: "server",
  adapter: vercel(),
  hooks: {
    'astro:config:setup': ({ command, isRestart }) => {
      console.log(`Astro build starting. Command: ${command}, isRestart: ${isRestart}`);
    },
    'astro:config:done': ({ config }) => {
      console.log('Astro configuration completed');
    },
    'astro:server:setup': ({ server }) => {
      console.log('Astro server setup completed');
    },
    'astro:build:start': ({ buildConfig }) => {
      console.log('Astro build started');
    },
  },
});