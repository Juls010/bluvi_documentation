# Desarrollo local

## Requisitos

- Node.js compatible con los repositorios; usa Node 22 para igualar el CI del backend.
- npm.
- PostgreSQL/Supabase accesible para el backend.
- Redis o Upstash opcional; el backend puede funcionar con fallback según configuración.
- Android Studio/emulador y Expo/EAS si se trabaja con mobile.

## Backend

```powershell
cd bluvi-backend
npm ci
npm run dev
```

Comandos habituales:

| Comando | Uso |
| --- | --- |
| `npm run dev` | API con variables de desarrollo y watch |
| `npm run build` | Compilación TypeScript a `dist` |
| `npm start` | Arranque del build compilado |
| `npm test` | Suite Node Test Runner |
| `npm run test:coverage` | Suite con cobertura |
| `npm run migrate` | Ejecuta migraciones SQL versionadas |
| `npm run seed:discovery` | Datos de discovery para desarrollo |

La API local escucha por defecto en `http://localhost:3000`; comprueba
`/health` después de arrancarla.

## Frontend web

```powershell
cd bluvi-frontend
npm ci
npm run dev
```

La SPA se sirve normalmente en `http://localhost:5173`.

```powershell
npm run build
npm test
npm run lint
```

El cliente se conecta al backend configurado para el entorno local, staging o
producción correspondiente.

## Mobile

```powershell
cd bluvi-mobile
npm ci
npm start
```

Para Android local:

```powershell
npm run android
```

La aplicación selecciona el backend correspondiente al perfil de desarrollo,
staging o producción. La configuración de cada entorno se gestiona fuera del
código fuente.
