# Introducción al frontend web

`bluvi-frontend` es una SPA React/TypeScript construida con Vite. Ofrece la
experiencia pública, el onboarding, el área autenticada, el chat y el panel de
administración.

## Stack actual

- React 19 y TypeScript.
- Vite 7 y plugin React SWC.
- React Router DOM 7.
- Tailwind CSS 4, MUI, Framer Motion y `next-themes`.
- React Aria Components para controles accesibles.
- TanStack Query para caché y estado asíncrono.
- Axios para REST y Socket.IO Client para tiempo real.
- Supabase para recursos públicos y Cloudflare Wrangler para despliegue.
- Vitest, Testing Library y ESLint para calidad.

## Estructura de `src`

| Carpeta | Responsabilidad |
| --- | --- |
| `assets` | Imágenes, iconos y fuentes |
| `components` | UI reutilizable, modales y feedback |
| `config` | URL y configuración del backend |
| `context` | Auth, registro y notificaciones |
| `hooks` | Lógica reutilizable de UI y datos |
| `layouts` | Shell público, registro, app, chat y legal |
| `pages` | Pantallas agrupadas por dominio |
| `router` | Router centralizado y guards |
| `services` | API, storage, chat, matches, audio y realtime |
| `tests` | Pruebas unitarias, integración y componentes |
| `types` | Tipos compartidos del cliente |

## Scripts

```powershell
npm run dev
npm run build
npm run build:staging
npm test
npm run lint
npm run deploy:staging
npm run deploy:production
```

La conexión con backend y servicios externos se selecciona por entorno de
despliegue; las credenciales de servicio permanecen fuera del cliente.
