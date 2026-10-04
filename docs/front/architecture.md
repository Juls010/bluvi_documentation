# Arquitectura y flujos del frontend web

## Router y límites de acceso

El router de `src/router/Router.tsx` define cuatro zonas:

| Zona | Rutas principales | Protección |
| --- | --- | --- |
| Pública | `/`, `/login`, `/forgot-password`, `/reset-password` | Ninguna |
| Legal | `/privacidad`, `/cookies`, `/legal`, `/terminos`, `/faq`, `/accesibilidad` | Ninguna |
| Registro | `/register/name` hasta `/register/safety-tips` | `RegisterProvider` |
| App | `/app/home`, `/app/mailbox`, `/app/discovery`, `/app/messages`, `/app/profile`, `/app/settings` | `RouteGuard` |
| Chat | `/app/chat/:id`, `/app/chat/:id/files` | `RouteGuard` |
| Admin | `/admin` | `AdminRoute` |

La aplicación utiliza layouts separados para evitar que navegación, tema y
estado de una zona se filtren a otra. Las páginas se cargan con `lazy` y
`Suspense` para reducir el coste inicial.

## Estado y datos

- `AuthContext` mantiene sesión, usuario actual, login, logout y refresh.
- `RegisterContext` conserva el wizard y prepara el registro final.
- `NotificationContext` escucha matches, mensajes y lectura mediante Socket.IO.
- TanStack Query cachea datos asíncronos y permite invalidar discovery, perfiles
  y conversaciones tras mutaciones.
- `services/api.ts` centraliza Axios y `services/realtime.service.ts` mantiene
  la conexión autenticada.

## Funcionalidades de producto

- Landing pública y SEO básico con sitemap, robots y canonical URL.
- Registro guiado de nombre, edad, género, sexualidad, neurodivergencia,
  comunicación, email, fotos, ubicación, intereses, descripción, verificación
  de email y consejos de seguridad.
- Discovery con filtros, impresiones y perfiles.
- Matches, mailbox, mensajes de texto, imágenes y audio.
- Transcripción manual de audio, reacciones, lectura, entrega y presencia.
- Perfil, privacidad, accesibilidad, atmósfera, reportes y bloqueos.
- Panel admin con usuarios, reportes, métricas y moderación.

## Accesibilidad y UI

El cliente respeta tema, contraste, reducción de movimiento, navegación por
teclado, focus visible, labels y mensajes de error. Los componentes nuevos
deben conservar los estados de carga, vacío, error y éxito, y preferir
componentes accesibles existentes antes de introducir una variante aislada.

## Tiempo real

El cliente conecta Socket.IO con el access token y gestiona reconexión, refresh
de credenciales y desconexión. Los eventos de chat deben actualizar el estado
local sin duplicar mensajes ya persistidos por la API.
