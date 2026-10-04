# Referencia de endpoints

Todas las rutas están prefijadas por `/api`, devuelven JSON salvo uploads y
webhooks, y las rutas autenticadas esperan `Authorization: Bearer <accessToken>`.
Los nombres de campos exactos deben mantenerse alineados con los schemas y
controladores del backend.

## Salud y autenticación

| Método | Ruta | Auth | Uso |
| --- | --- | --- | --- |
| `GET` | `/health` | No | Estado, uptime y entorno |
| `POST` | `/api/auth/check-email` | No | Comprobar disponibilidad de email |
| `GET` | `/api/auth/metadata` | No | Catálogos necesarios para registro |
| `POST` | `/api/auth/registration-photo` | No | Upload de foto de registro |
| `POST` | `/api/auth/registration-photo/prepare` | No | Preparar upload de foto |
| `POST` | `/api/auth/registration-photo/complete` | No | Completar upload de foto |
| `POST` | `/api/auth/register` | No | Guardar paso/datos de registro |
| `POST` | `/api/auth/verify-email` | No | Confirmar código de email |
| `POST` | `/api/auth/resend-verification-code` | No | Reenviar código |
| `POST` | `/api/auth/login` | No | Crear sesión y access token |
| `POST` | `/api/auth/refresh` | Origen confiable | Renovar sesión |
| `POST` | `/api/auth/logout` | Origen confiable | Invalidar sesión |
| `POST` | `/api/auth/forgot-password` | No | Solicitar recuperación |
| `POST` | `/api/auth/reset-password` | No | Cambiar contraseña con token |
| `POST` | `/api/auth/supabase/send-email-hook` | Hook | Enviar email desde integración |

## Catálogos, perfil y discovery

| Método | Ruta | Auth | Uso |
| --- | --- | --- | --- |
| `GET` | `/api/interests` | No | Listar intereses |
| `GET` | `/api/users/profile` | Sí | Obtener perfil propio |
| `PUT` | `/api/users/profile` | Sí | Actualizar perfil |
| `POST` | `/api/users/profile/photos/uploads` | Sí | Preparar upload de foto |
| `POST` | `/api/users/profile/photos/uploads/complete` | Sí | Completar upload de foto |
| `PATCH` | `/api/users/profile/face-verification` | Sí | Actualizar verificación tradicional |
| `POST` | `/api/users/profile/face-liveness/session` | Sí | Crear sesión AWS Face Liveness |
| `POST` | `/api/users/profile/face-liveness/result` | Sí | Cerrar y evaluar sesión |
| `GET` | `/api/users/explore` | Sí | Obtener perfiles paginados |
| `POST` | `/api/users/discovery/seen` | Sí | Registrar perfil visto |
| `POST` | `/api/users/discovery/impression` | Sí | Registrar impresión |
| `GET` | `/api/users/privacy` | Sí | Obtener privacidad |
| `PATCH` | `/api/users/privacy` | Sí | Actualizar privacidad |
| `GET` | `/api/users/accessibility` | Sí | Obtener preferencias |
| `PATCH` | `/api/users/accessibility` | Sí | Actualizar preferencias |
| `PUT` | `/api/users/atmosphere` | Sí | Actualizar atmósfera |
| `GET` | `/api/users/:userId` | Sí | Obtener perfil permitido de otra persona |
| `DELETE` | `/api/users/profile` | Sí | Eliminar cuenta |

## Matches

| Método | Ruta | Auth | Uso |
| --- | --- | --- | --- |
| `POST` | `/api/matches/requests` | Sí | Enviar solicitud |
| `GET` | `/api/matches/requests/incoming` | Sí | Solicitudes recibidas |
| `PATCH` | `/api/matches/requests/:id/respond` | Sí | Aceptar o rechazar |
| `GET` | `/api/matches` | Sí | Matches activos |

## Chat y multimedia

| Método | Ruta | Auth | Uso |
| --- | --- | --- | --- |
| `GET` | `/api/chats` | Sí | Conversaciones |
| `GET` | `/api/chats/blocked` | Sí | Usuarios bloqueados |
| `GET` | `/api/chats/:userId/images` | Sí | Imágenes de conversación |
| `GET` | `/api/chats/:userId/messages` | Sí | Mensajes paginados |
| `GET` | `/api/chats/:userId/online` | Sí | Estado online |
| `POST` | `/api/chats/:userId/messages` | Sí | Mensaje de texto |
| `POST` | `/api/chats/:userId/media/uploads` | Sí | Preparar media |
| `POST` | `/api/chats/:userId/media/uploads/complete` | Sí | Completar media |
| `POST` | `/api/chats/:userId/messages/audio` | Sí | Audio multipart, máximo 8 MB |
| `POST` | `/api/chats/:userId/messages/image` | Sí | Imagen multipart, máximo 5 MB |
| `PATCH` | `/api/chats/messages/:messageId/delete` | Sí | Borrar para todos |
| `PUT` | `/api/chats/messages/:messageId/reaction` | Sí | Añadir reacción |
| `DELETE` | `/api/chats/messages/:messageId/reaction` | Sí | Quitar reacción |
| `PATCH` | `/api/chats/:userId/read` | Sí | Marcar leído |
| `PATCH` | `/api/chats/:userId/delivered` | Sí | Marcar entregado |
| `PATCH` | `/api/chats/:userId/media-permission` | Sí | Cambiar permiso multimedia |
| `PATCH` | `/api/chats/:userId/notifications` | Sí | Preferencias de notificación |
| `DELETE` | `/api/chats/:userId` | Sí | Eliminar conversación |
| `POST` | `/api/chats/:userId/report` | Sí | Reportar usuario en chat |
| `POST` | `/api/chats/:userId/block` | Sí | Bloquear usuario |
| `DELETE` | `/api/chats/:userId/block` | Sí | Desbloquear usuario |
| `GET` | `/api/chats/reports` | Sí | Mis reportes |
| `POST` | `/api/transcriptions` | Sí | Transcribir audio manualmente |
| `POST` | `/api/storage/signed-url` | Sí | Obtener URL firmada |

## Verificación, lugares, notificaciones y soporte

| Método | Ruta | Auth | Uso |
| --- | --- | --- | --- |
| `POST` | `/api/verification/veriff/webhook` | Proveedor | Recibir decisión Veriff |
| `POST` | `/api/verification/session` | Sí | Crear sesión Veriff |
| `GET` | `/api/verification/session/:sessionId` | Sí | Consultar sesión Veriff |
| `GET` | `/api/places/search` | No | Buscar lugares |
| `POST` | `/api/notifications/push-token` | Sí | Registrar token push |
| `DELETE` | `/api/notifications/push-token` | Sí | Eliminar token push |
| `POST` | `/api/support/verification` | Sí | Crear solicitud de soporte |
| `GET` | `/api/support/verification-requests` | Admin | Listar solicitudes |
| `PATCH` | `/api/support/verification-requests/:requestId` | Admin | Resolver solicitud |

## Administración

Todas estas rutas requieren access token y `requireAdmin`:

| Método | Ruta |
| --- | --- |
| `GET` | `/api/admin/overview` |
| `GET` | `/api/admin/metrics` |
| `GET` | `/api/admin/runtime-metrics` |
| `GET` | `/api/admin/users` |
| `GET` | `/api/admin/users/:userId/verification-evidence` |
| `POST` | `/api/admin/users` |
| `PATCH` | `/api/admin/users/:userId` |
| `DELETE` | `/api/admin/users/:userId` |
| `GET` | `/api/admin/reports` |
| `PATCH` | `/api/admin/reports/:reportId/dismiss` |
| `PATCH` | `/api/admin/reports/:reportId/warn` |
| `PATCH` | `/api/admin/reports/:reportId/remove-content` |
| `GET` | `/api/admin/blocks` |

## Seguridad operativa

El backend aplica rate limiting global y específico, validación de origen para
refresh/logout, límites de tamaño en multimedia, CORS allow-list y headers
Helmet. Los límites pueden variar por ruta y configuración de entorno; no se
deben copiar números históricos de documentación antigua sin revisar el
middleware actual.
