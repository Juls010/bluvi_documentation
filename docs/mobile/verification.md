# Verificación facial y soporte

## Responsabilidades

La app móvil inicia la cámara y presenta estados accesibles. El backend crea la
sesión, entrega credenciales temporales limitadas, consulta AWS y decide el
resultado. Nunca se debe marcar una persona como verificada a partir de un
valor enviado desde el móvil.

## Flujo AWS Face Liveness

1. El usuario abre el modal de verificación desde su perfil.
2. Mobile solicita `POST /api/users/profile/face-liveness/session`.
3. El backend devuelve `sessionId`, región y credenciales temporales.
4. `AwsFaceLivenessCamera` ejecuta el detector nativo Android.
5. La app envía `{ sessionId }` a
   `POST /api/users/profile/face-liveness/result`.
6. El backend evalúa liveness y coincidencia con la foto privada.
7. Mobile muestra `verified`, `needs_resubmission` u otro estado permitido por
   el contrato.

El módulo `modules/bluvi-face-liveness` y el plugin
`plugins/withFaceLiveness` conectan la parte nativa. Las credenciales no se
persisten ni forman parte del bundle del cliente.

## Alternativa y soporte

La pantalla mantiene una cámara local/alternativa y una vía de soporte para
personas que no puedan completar la cámara. El soporte envía el mensaje al
backend y no modifica directamente el estado de verificación.

Consulta también el [contrato backend de verificación](../back/verification).
