# Arquitectura y navegación móvil

## Rutas de Expo Router

```text
src/app/
├─ (auth)/
│  ├─ onboarding.tsx
│  ├─ login.tsx
│  ├─ forgot-password.tsx
│  └─ register/[step].tsx
├─ (app)/
│  ├─ _layout.tsx       tabs autenticadas
│  ├─ index.tsx         inicio
│  ├─ discovery.tsx
│  ├─ messages.tsx
│  ├─ profile.tsx
│  └─ settings/
├─ chat/[userId].tsx
├─ chat-files/[userId].tsx
├─ user/[userId].tsx
├─ mailbox.tsx
└─ index.tsx
```

`(auth)` contiene onboarding, login, recuperación y el registro por pasos.
`(app)` usa tabs para inicio, discovery, mensajes y perfil; ajustes se abre
como stack interno. Chat, archivos, mailbox y perfiles externos son rutas
apiladas fuera de las tabs.

## Capas

| Capa | Ubicación | Responsabilidad |
| --- | --- | --- |
| Pantallas | `src/app` | Navegación y composición de flujos |
| Componentes | `src/components` | Chat, perfiles, formularios, modales y feedback |
| Contextos | `src/context` | Auth, registro, notificaciones, accesibilidad y sonidos |
| Servicios | `src/services` | API, auth, usuarios, matches, chat, storage y realtime |
| Tipos | `src/types` | Contratos de usuario, chat y verificación |
| Tema | `src/constants`, `src/styles` | Paleta, tipografía, layout y NativeWind |
| Módulos | `modules/bluvi-face-liveness` | Integración nativa Android/web |

## Autenticación y API

`backendConfig.ts` calcula `API_URL` y `SOCKET_URL` según el perfil de ejecución
y el host local de Expo. Axios lee el access token de `SecureStore`, lo añade
como Bearer y coordina refresh/reintentos cuando recibe 401.

La app no depende de cookies web para guardar la sesión móvil. Si el refresh
falla, elimina credenciales locales y devuelve a login.

## Estado y tiempo real

TanStack Query mantiene datos remotos. `realtime.service.ts` conecta Socket.IO,
reconecta, envía `auth:refresh` y permite a chat/notifications suscribirse a
mensajes, typing, presencia, matches, lectura, entrega y reacciones.
