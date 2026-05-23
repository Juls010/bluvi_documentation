# Introducción al Frontend

Esta sección documenta la interfaz de usuario, los componentes visuales y la arquitectura del lado del cliente de Bluvi (`bluvi-frontend`).

---

## Stack Tecnológico del Frontend

El frontend está estructurado sobre las siguientes tecnologías principales:

- **Framework**: React (con Vite / Next.js)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS y Custom CSS para micro-animaciones
- **Gestión de Estado**: Zustand (estado global e integración de sockets)
- **Comunicación en Tiempo Real**: Socket.io-client
- **Enrutamiento**: React Router o Next Router

---

## Estructura de Carpetas Sugerida

El cliente de Bluvi sigue una organización modular enfocada en componentes atómicos y hooks reutilizables:

```
src/
├── assets/          # Imágenes, iconos y recursos estáticos
├── components/      # UI Atoms, Molecules y Organisms
│   ├── common/      # Botones, inputs y modales genéricos
│   ├── layout/      # Navbar, Footer y Sidebars
│   └── profile/     # Componentes específicos de gestión de perfiles
├── hooks/           # Custom React Hooks (useAuth, useSocket, etc.)
├── pages/           # Vistas principales de la aplicación (Home, Login, Chat)
├── services/        # Clientes API (fetch/axios) y configuración de sockets
└── store/           # Stores de Zustand para estado global
```

---

## Guías de Desarrollo del Frontend

### 1. Integración en Tiempo Real
Toda la lógica de Socket.io se maneja a través de un hook centralizado `useSocket` y se vincula con el store global para actualizar de inmediato el estado de la mensajería y la lista de usuarios activos.

### 2. Estilos y Temas
El proyecto utiliza un sistema de temas claro/oscuro que responde a la preferencia del sistema del usuario, con posibilidad de toggle manual. Se promueve el uso de variables CSS para mantener colores consistentes.

### 3. Consumo de API (Backend)
Las peticiones HTTP al backend se realizan mediante un cliente configurado con interceptores que adjuntan automáticamente el token JWT y manejan la lógica de expiración y redirección al login de forma centralizada.

---

## Secciones Detalladas

- **[Arquitectura y Diseño del Frontend](/front/architecture)**: Filosofía de diseño, flujos globales, maquetación de layouts y comunicación WebSocket.
