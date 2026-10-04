# Introducción al backend

`bluvi-backend` es la API REST y servidor Socket.IO de Bluvi. Gestiona
autenticación, registro, perfiles, discovery, matches, chat, multimedia,
moderación y administración.

## Stack actual

- Node.js y TypeScript.
- Express 5, Helmet, CORS, cookies y Morgan.
- PostgreSQL con `pg` y Supabase como proveedor gestionado.
- Redis/Upstash como caché opcional y datos temporales.
- JWT, bcrypt y Zod.
- Socket.IO para eventos en tiempo real.
- Supabase Storage y servicios compatibles S3/R2 para multimedia.
- AWS Rekognition Face Liveness, Veriff y Hugging Face cuando están habilitados.
- Resend/servicio de email para comunicaciones transaccionales.

## Arranque

`src/index.ts` carga el entorno, prepara caché y tareas de limpieza, crea el
servidor HTTP y conecta Socket.IO. `src/app.ts` configura middleware y monta
las rutas bajo `/api`.

```text
src/
├─ config/       runtime y pool de base de datos
├─ controllers/  casos de uso HTTP
├─ middlewares/  auth, CORS, CSRF/origen y rate limits
├─ routes/       contratos Express
├─ services/     dominio, caché, storage, sockets y proveedores
└─ index.ts      punto de entrada
migrations/      scripts SQL ejecutables en la raíz del repo
```

## Módulos de API

| Prefijo | Área |
| --- | --- |
| `/api/auth` | Registro, email, login, refresh y contraseña |
| `/api/users` | Perfil, privacidad, accesibilidad, discovery y verificación |
| `/api/interests` | Catálogos de intereses |
| `/api/matches` | Solicitudes y matches aceptados |
| `/api/chats` | Conversaciones, mensajes, multimedia y moderación |
| `/api/transcriptions` | Transcripción manual de audio |
| `/api/storage` | URLs firmadas |
| `/api/admin` | Administración y métricas |
| `/api/verification` | Sesiones Veriff y webhook |
| `/api/places` | Búsqueda de lugares |
| `/api/notifications` | Tokens push |
| `/api/support` | Solicitudes de soporte de verificación |

La API incluye `/health` para monitorización. Consulta el [catálogo de
endpoints](./endpoints) para rutas, autenticación y operaciones.
