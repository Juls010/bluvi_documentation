# Introducción al Backend

Esta sección documenta la infraestructura, arquitectura y flujos lógicos del backend de Bluvi (`bluvi-backend`).

---

## Stack Tecnológico del Backend

- **Entorno de ejecución**: Node.js
- **Lenguaje**: TypeScript
- **Framework Web**: Express.js
- **Base de Datos**: PostgreSQL
- **Capa de Caché**: Redis
- **Servicio de Archivos**: Supabase Storage
- **Mensajería en Tiempo Real**: Socket.io

---

## Módulos y Secciones Documentadas

Aquí encontrarás detalles específicos acerca de los siguientes módulos:

### 1. Arquitectura y Configuración
- **Configuración inicial**: Configuración de variables de entorno, Docker y scripts de inicio.
- **Express & Middleware**: Ciclo de vida de las peticiones, compresión y manejo de errores.
- **Base de Datos e Infraestructura**: Conexiones a PostgreSQL, transacciones y políticas de expiración en Redis.

### 2. Autenticación y Onboarding
- **Registro y Verificación de Email**: Envío de correos de activación y control de estado de cuentas.
- **Inicio de Sesión y Seguridad**: JWT, refresco de tokens y rate limiting contra ataques de fuerza bruta.

### 3. Perfiles y Descubrimiento
- **[Gestión de Perfiles (Profile Management)](/back/profile-management)**: Detalles técnicos sobre la recuperación, actualización y eliminación de cuentas.
- **Motor de Exploración (Explore)**: Filtros dinámicos basados en intereses y cacheado mediante Redis.

### 4. Interacción en Tiempo Real
- **Sistema de Matching**: Ciclo de vida de solicitudes de match y transición a chat.
- **Mensajería & Websockets**: Protocolos de Socket.io, almacenamiento de mensajes, confirmación de lectura y envío de contenido multimedia (audio/imágenes).

### 5. Servicios de Valor Añadido
- **Accesibilidad (Text-to-Speech)**: Narración automática de mensajes y preferencias de accesibilidad.
- **Panel de Administración**: Herramientas de moderación, reportes y métricas de uso de la plataforma.
