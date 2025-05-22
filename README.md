# 💡 Service Genius Bar App

**Autor:** Juan Morales

Live demo : https://service-geniusbar-app.onrender.com/home

## 📋 Descripción

Aplicación web para la **gestión de órdenes de servicio técnico** de dispositivos electrónicos, inspirada en el estilo "Genius Bar". Permite:

- Crear, consultar, modificar y eliminar órdenes
- Gestionar usuarios, sesiones y roles
- Comunicarte con clientes por correo electrónico

---

## 🧱 Estructura del Proyecto
src/         -> Código fuente principal  
components/  -> Componentes reutilizables (React/Astro)  
pages/       -> Páginas y endpoints API  
db/          -> Configuración y modelos de base de datos  
public/      -> Archivos estáticos  

---

## 🚀 Funcionalidades Principales

### 🛠 Gestión de Órdenes de Servicio
- CRUD de órdenes
- Seguimiento de reparaciones
- Detalles de dispositivos y fallas

### 🔐 Autenticación y Autorización
- Login con proveedores: Local, GitHub, Google
- Protección contra accesos no autorizados
- Roles: administrador / usuario

### 📬 Comunicación con Clientes
- Envío de correos automáticos
- Formulario de contacto

### 🎨 Interfaz de Usuario
- Diseño responsivo
- Animaciones fluidas
- Modo claro / oscuro

---

## 🧰 Tecnologías Utilizadas

### Frontend
- ⚡ **Astro.js** (framework principal)
- ⚛️ **React** (componentes interactivos)
- 🎨 **Tailwind CSS** + **DaisyUI**
- 🎞 **GSAP** (animaciones)

### Backend
- 🌐 API REST (Astro/Node.js)
- 📧 **Nodemailer** (envío de correos)
- Typescript

### Base de Datos
- 🗃 **SQLite** con Astro DB
- ☁️ **Turso DB** (persistencia en la nube)

### Autenticación
- 🛡 **Lucia Auth** (sesiones y seguridad)

### Herramientas de Desarrollo
- 🧠 **TypeScript** (tipado)
- 🧹 **ESLint / Prettier** (formato de código)

---

## 🎨 Características de Diseño

- UI moderna y adaptable
- Componentes reutilizables
- Tema personalizado con colores de marca
- Soporte completo para **modo claro / oscuro**

---

## ▶️ Ejecución

### 1. Clona el repositorio:

git clone https://github.com/JuanMorales86/service-geniusbar-app.git

##  Instala las dependencias:

pnpm install

## 4. Inicia el servidor de desarrollo:

pnpm run dev

## Compila para producción:

pnpm run buid

📄 Licencia:

Este proyecto está bajo la licencia MIT.
