# Smoke E2E Android con Maestro

El flujo `.maestro/smoke.yml` valida onboarding, login, discovery, perfil,
ajustes, mensajes, chat, envío de un mensaje y logout.

## Preparar staging

El flujo necesita dos cuentas, un match aceptado y una conversación preparados
en staging. El entorno debe disponer de un seed idempotente para crear esos
datos de prueba. Nunca se debe preparar este escenario contra producción.

El seed debe ser idempotente, estar limitado a staging y ejecutarse mediante el
procedimiento operativo del entorno.

## Ejecutar localmente

Genera e instala una APK E2E en un emulador Android y ejecuta el flujo:

```powershell
maestro test .maestro/smoke.yml
```

## Workflow EAS

`.eas/workflows/e2e.yml` construye el perfil `e2e` y ejecuta Maestro en un
emulador Android con `com.bluvi.mobile`. El workflow utiliza las credenciales
de prueba administradas por el sistema de CI, registra pantalla y permite un
reintento.
