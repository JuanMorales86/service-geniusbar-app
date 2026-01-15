# Service GeniusBar App

Bienvenido al repositorio de **Service GeniusBar App**. Este proyecto es una aplicación web moderna diseñada para la gestión de servicios de soporte técnico, citas y ventas de equipos.

> **Estado:** Rama de Desarrollo (`Brach Desarrollo`)

## 📋 Tabla de Contenidos

- Descripción
- Requisitos Previos
- Instalación
- Scripts Disponibles
- Tecnologías
- Contribución

## 🚀 Descripción

**Service GeniusBar App** es una aplicación web que permite agendar citas para revisión de equipos, gestionar tickets de soporte, visualizar el estado de las reparaciones y mostrar equipos disponibles a la venta.

El sistema integra funcionalidades avanzadas como autenticación segura, gestión de base de datos, notificaciones por correo electrónico, chat de soporte en tiempo real y características potenciadas por Inteligencia Artificial.

## 🛠️ Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu entorno local:

- Node.js (v18 o superior recomendado)
- pnpm (Gestor de paquetes principal)
- Git

## 📦 Instalación

Sigue estos pasos para configurar el proyecto:

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd service-geniusbar-app
    ```

2.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

3.  **Configuración de Entorno:**
    Crea un archivo `.env` en la raíz con las variables necesarias (Base de datos, API Keys de Google, Credenciales de correo, etc.).

## 💻 Scripts Disponibles

De acuerdo al `package.json`, estos son los comandos principales para el ciclo de vida del desarrollo:

| Comando | Descripción |
| :--- | :--- |
| `pnpm run dev` | Inicia el servidor de desarrollo de Astro (`--host`). |
| `pnpm run dev:open` | Inicia el servidor y abre automáticamente el navegador en el puerto 4321. |
| `pnpm run build` | Compila la aplicación para producción (modo remoto). |
| `pnpm run start` | Ejecuta el servidor de producción personalizado (`node server.js`). |
| `pnpm run preview` | Previsualiza la versión construida localmente. |

## 🛠️ Tecnologías

Este proyecto utiliza un stack tecnológico robusto y moderno:

### Core & Frontend
- **Framework:** Astro (v5)
- **UI Library:** React (v19)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS, DaisyUI
- **Animaciones:** Framer Motion, GSAP

### Backend & Servicios
- **Base de Datos:** Astro DB / LibSQL (Turso)
- **Autenticación:** Lucia Auth (con Arctic & Oslo)
- **IA:** Google GenAI SDK
- **Email:** Nodemailer, Resend
- **Soporte:** Tawk.to (Widget de Chat en Vivo)
- **Formularios:** React Hook Form + Zod
- **Utilidades:** Sharp, Blurhash

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de trabajar sobre la rama de desarrollo y crear un Pull Request para cualquier cambio importante.
