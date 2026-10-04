# Builds y releases con EAS

## Perfiles

| Perfil | Entorno | Distribución | Artefacto |
| --- | --- | --- | --- |
| `development` | development | interna | APK + development client |
| `preview` | preview | interna | APK |
| `testing` | preview | store/testing | AAB |
| `e2e` | preview | interna | APK |
| `production` | production | store | AAB |

Los perfiles `testing` y `e2e` llevan la URL de staging configurada en EAS.
Guarda credenciales E2E en variables del entorno EAS, nunca en el repositorio.

## Comandos

```powershell
npx eas-cli@latest build --profile development --platform android
npx eas-cli@latest build --profile preview --platform android
npx eas-cli@latest build --profile testing --platform android
npx eas-cli@latest build --profile production --platform android
```

Los perfiles de tienda generan AAB y usan incremento automático remoto. Antes de
publicar revisa `app.json`, configuración de servicios, permisos, API objetivo,
iconos, splash y backend configurado.

## Checklist

- Tests y lint superados para la versión a distribuir.
- Backend desplegado y compatible con el cliente.
- URL correcta para el entorno.
- Notificaciones y permisos comprobados en un dispositivo limpio.
- Smoke E2E ejecutado para staging.
- La configuración del cliente no contiene credenciales privadas.
