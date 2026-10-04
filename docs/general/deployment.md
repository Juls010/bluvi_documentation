# Despliegue y operación

## Backend en Railway

El backend se compila como TypeScript y se inicia desde `dist`:

```text
Build:  npm run build
Start:  npm start
Health: /health
```

La plataforma debe proporcionar la configuración de base de datos,
autenticación, almacenamiento, caché, orígenes permitidos y proveedores
externos habilitados. En despliegues detrás de proxy también debe preservarse la
IP real para que el rate limiting sea fiable.

Antes de publicar:

1. Ejecutar migraciones en la base de datos objetivo.
2. Verificar `/health` y los logs de arranque.
3. Confirmar los orígenes permitidos para web y móvil.
4. Probar login, refresh, upload, Socket.IO y una operación de chat.

## Frontend en Cloudflare Workers

El frontend se genera con Vite y `wrangler.jsonc` publica `dist` como assets
de un Worker con fallback SPA.

```powershell
npm run build
npm run deploy
```

Los perfiles disponibles son producción y staging:

```powershell
npm run deploy:production
npm run deploy:staging
```

La configuración pública y la conexión con los servicios se define en el
entorno de Cloudflare correspondiente. El Worker de staging se llama
`bluvi-staging`.

## Mobile con EAS

`eas.json` define los perfiles `development`, `preview`, `testing`, `e2e` y
`production`. Los perfiles de testing y E2E apuntan al backend de staging y no
deben usarse contra producción.

```powershell
npm run build:android       # perfil testing, AAB para distribución
npm run build:android:final # perfil production, AAB para tienda
npx eas-cli@latest build --profile e2e --platform android
```

Los builds de desarrollo/preview producen APK de distribución interna; los de
testing/production producen Android App Bundle. EAS incrementa la versión
remotamente mediante `appVersionSource: remote`.

## CI y comprobaciones

El backend tiene GitHub Actions para Node 22, `npm ci`, tests y compilación en
push/PR a `main`. Mobile añade un workflow EAS para construir una APK y
ejecutar Maestro en un emulador Android.

La lista mínima antes de un release es:

```powershell
# backend
npm test
npm run build

# frontend
npm test
npm run lint
npm run build

# mobile
npm test
npm run lint
```

## Rollback y diagnóstico

- Identificar la versión desplegada y la versión EAS de cada release.
- Revisar primero `/health`, logs del backend, conectividad de base de datos,
  CORS, cookies/JWT y estado de Socket.IO.
- Si falla el cliente web, comprobar variables de Cloudflare y el fallback SPA.
- Si falla móvil, comprobar el perfil EAS, la conexión con el backend, permisos
  nativos y el `applicationId` Android.
- No revertir migraciones destructivas sin una copia y un procedimiento de
  recuperación de la base de datos.
