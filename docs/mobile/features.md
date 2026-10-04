# Funcionalidades y servicios

## Autenticación y registro

- Onboarding inicial de cuatro pasos.
- Login y recuperación de contraseña.
- Registro de nombre, edad, género, sexualidad, neurodivergencias, estilo de
  comunicación, email, fotos, ubicación, intereses y descripción.
- Verificación de email y consejos de seguridad.

`RegisterContext` conserva el estado del wizard y los servicios de auth envían
los pasos al backend. Las fotos usan el flujo de upload de registro.

## Discovery, perfiles y matches

Discovery ofrece filtros, paginación/cache local, tarjetas de perfil, intereses,
preferencias y registro de impresiones/vistos. Perfil permite editar datos,
fotos, privacidad, accesibilidad y atmósfera. Matches y solicitudes aparecen en
mailbox y habilitan conversación cuando se aceptan.

## Chat

El chat soporta:

- Mensajes de texto.
- Audio grabado y reproducido dentro de la conversación.
- Imágenes y visor protegido.
- Reacciones, borrado para todos, leído y entregado.
- Typing, presencia, notificaciones, reportes y bloqueos.
- Transcripción manual de notas de voz.

Los servicios `chat.service.ts`, `realtime.service.ts`, `storage.service.ts` y
`uploadService.ts` coordinan API, media y Socket.IO.

## Notificaciones y almacenamiento

`push-notifications.service.ts` registra y elimina tokens mediante
`/api/notifications/push-token`. `SecureStore` conserva tokens y datos de
sesión; los archivos se suben a través del backend o URLs firmadas, según el
flujo.

## Accesibilidad e internacionalización

El cliente incluye tema claro/oscuro, contraste, tipografías Manrope y Lexend
Deca, reduced motion, haptics controlados, labels nativos y modales accesibles.
Las traducciones viven en `src/i18n/locales`:

| Código | Idioma |
| --- | --- |
| `es` | Español |
| `en` | English |
| `ca` | Català |
| `eu` | Euskara |
| `gl` | Galego |
| `val` | Valencià |

Todo copy nuevo debe añadirse a las seis locales y consumirse mediante
`useI18n`, no con strings dispersos en las pantallas.
