# Administración y moderación

Todas las rutas `/api/admin` usan `authenticateToken` y `requireAdmin`. El
cliente administrativo web consume estas rutas desde `/admin`; mobile mantiene
un servicio admin para los casos soportados, pero no sustituye la autorización
del backend.

## Capacidades

- Overview y métricas de negocio.
- Métricas de runtime: pool de base de datos, Socket.IO, caché y storage.
- Listado, creación, edición y eliminación de usuarios administradores.
- Evidencia de verificación de un usuario.
- Listado y resolución de reportes mediante dismiss, warning o retirada de contenido.
- Consulta de bloqueos.
- Gestión de solicitudes de soporte de verificación.

Las acciones de moderación deben ser auditables y devolver errores claros. No se
deben ocultar reportes solo en el cliente: el backend debe aplicar el cambio y
comprobar permisos en cada petición.
