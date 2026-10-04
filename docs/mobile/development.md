# Desarrollo local y configuración

## Instalación

```powershell
cd bluvi-mobile
npm ci
npm start
```

Scripts disponibles:

| Comando | Uso |
| --- | --- |
| `npm start` | Servidor Expo |
| `npm run android` | Ejecutar Android nativo |
| `npm run ios` | Ejecutar iOS nativo |
| `npm run web` | Ejecutar versión web Expo |
| `npm test` | Vitest |
| `npm run lint` | Expo lint |
| `npm run build:android` | Build EAS testing |
| `npm run build:android:final` | Build EAS production |

## Backend objetivo

El cliente selecciona el backend local, de staging o de producción según el
perfil de ejecución. El código añade el prefijo de API para REST y usa el
origen correspondiente para Socket.IO; la configuración de cada entorno se
gestiona fuera del código fuente.

## Permisos nativos

`app.json` declara cámara, micrófono, galería y notificaciones. Android usa el
application id `com.bluvi.mobile`; iOS tiene un bundle identifier separado.
Comprueba permisos y mensajes de consentimiento cuando cambies audio, cámara o
fotos.

## Convenciones

- TypeScript estricto y sin `any`.
- Reutilizar componentes existentes.
- Mantener paridad de copy en las seis traducciones.
- Añadir pruebas para servicios, utilidades y estados delicados.
- Ejecutar lint antes de cerrar una tarea.
