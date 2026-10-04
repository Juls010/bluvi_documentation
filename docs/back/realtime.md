# Tiempo real con Socket.IO

## Conexión

El cliente abre Socket.IO contra el origen del backend y envía el access token
en `auth.token` o en `Authorization: Bearer`. El servidor valida el token,
asigna `socket.data.userId` y une la conexión a `user:<id>`.

Si el access token se renueva, el cliente envía `auth:refresh`. Si el token no
corresponde al usuario original, el servidor emite `auth:error` y desconecta.

## Eventos de cliente

| Evento | Payload conceptual | Uso |
| --- | --- | --- |
| `auth:refresh` | `{ token }` | Renovar auth de socket |
| `client:reconnected` | ninguno | Señalar reconexión |
| `chat:typing` | usuario destino + estado | Comenzar typing |
| `chat:typing:stop` | usuario destino | Detener typing |

El backend limita eventos de typing y verifica que exista una relación
permitida y no bloqueada antes de reenviarlos.

## Eventos de servidor

| Evento | Uso |
| --- | --- |
| `user:status:initial` | Usuarios online al conectar |
| `user:online` / `user:offline` | Cambios de presencia |
| `chat:typing` / `chat:typing:stop` | Indicador de escritura |
| `chat:message:new` | Nuevo mensaje |
| `chat:messages:read` | Mensajes leídos |
| `chat:messages:delivered` | Mensajes entregados |
| `chat:message:deleted` | Mensaje eliminado |
| `chat:message:reaction` | Reacción añadida o eliminada |
| `match:request:new` | Nueva solicitud de match |
| `match:accepted` | Match aceptado |
| `auth:error` / `auth:refreshed` | Estado de autenticación |

La persistencia se realiza por HTTP/controlador antes o junto con la emisión.
Los clientes deben tolerar reconexión, eventos duplicados y recuperación por
HTTP al volver a una pantalla.
