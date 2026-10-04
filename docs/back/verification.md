# Verificación de identidad

Bluvi tiene más de un flujo de verificación. No deben mezclarse sus estados ni
permitir que el cliente decida el resultado.

## Verificación tradicional

`PATCH /api/users/profile/face-verification` actualiza el estado permitido por
el backend después de completar el flujo correspondiente. La app puede mostrar
el estado, pero no fabricar un usuario verificado.

## AWS Face Liveness

1. Mobile solicita `POST /api/users/profile/face-liveness/session`.
2. Backend comprueba usuario, foto privada, rate limit y configuración AWS.
3. Backend crea `CreateFaceLivenessSession` y devuelve `sessionId`, región y
   credenciales temporales mínimas.
4. El detector nativo ejecuta la prueba.
5. Mobile envía solo `{ sessionId }` a
   `POST /api/users/profile/face-liveness/result`.
6. Backend llama a `GetFaceLivenessSessionResults`, compara la imagen de
   referencia con la foto vinculada mediante `CompareFaces` y decide el estado.

Las credenciales AWS deben ser temporales, de corta duración y no formar parte
del bundle del cliente. Una sesión se consume una sola vez y los umbrales se
evalúan en servidor.

## Veriff

`POST /api/verification/session` crea una sesión autenticada y el webhook
`POST /api/verification/veriff/webhook` recibe la decisión del proveedor. El
backend debe validar firma, sesión y usuario antes de persistir el resultado.

## Vía alternativa

Mobile ofrece soporte para personas que no pueden utilizar cámara o liveness.
Las solicitudes se crean en `/api/support/verification` y se resuelven desde
las rutas administrativas de soporte.
