# Datos, migraciones y proveedores

## PostgreSQL

El pool vive en `src/config/db.ts`. La base almacena usuarios, preferencias,
intereses, fotos, matches, conversaciones, mensajes, reportes, bloqueos,
tokens y catálogos. Las operaciones multi-entidad usan transacciones y las
consultas deben filtrar siempre por el usuario autenticado cuando corresponda.

## Migraciones

Las migraciones SQL están en `migrations/` y se ejecutan con:

```powershell
npm run migrate
```

También existen scripts específicos para migrar media de chat y fotos de
perfil. En staging/producción, ejecuta migraciones con una copia de seguridad y
verifica compatibilidad hacia atrás antes de desplegar el nuevo código.

## Caché

El servicio de caché puede usar Redis local o Upstash REST. Discovery, metadata,
rate limiting y datos temporales tienen TTL o invalidación explícita. Una caída
de Redis no debe convertir datos temporales en persistencia permanente.

## Storage y servicios externos

- Supabase proporciona PostgreSQL y almacenamiento en los flujos configurados.
- S3/R2 se utiliza en servicios de media cuando el runtime lo habilita.
- AWS y Veriff participan en verificación.
- Hugging Face/Whisper se utiliza para transcripción manual.
- Email transaccional se gestiona mediante el servicio configurado.

Las claves de proveedores se cargan desde el entorno del backend y nunca se
envían al bundle web ni a la app móvil.
