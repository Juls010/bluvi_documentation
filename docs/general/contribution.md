# Lanzamiento en Local y Variables de Entorno

Este documento sirve como guía para desarrolladores y contribuidores que deseen levantar el stack de **Bluvi** en su entorno de desarrollo local.

---

## 1. Requisitos de Software

Antes de iniciar, asegúrate de tener instalado en tu máquina de desarrollo:
- **Node.js**: Versión 22 o superior para el backend; versión 18 o superior para el frontend.
- **Docker & Docker Compose**: Necesario para levantar la base de datos (PostgreSQL) y la caché (Redis) de manera rápida en local.
- **Git**: Para el control de versiones.

---

## 2. Lanzamiento del Stack de Base de Datos (Docker)

El backend de Bluvi está preparado para ejecutarse localmente con el apoyo de Docker para orquestar la persistencia y la caché. El archivo `docker-compose.yml` en la raíz del backend define los servicios de base de datos PostgreSQL y caché Redis.

### Instrucciones para levantar los contenedores:
1. Abre tu terminal en el directorio raíz de `bluvi-backend`.
2. Ejecuta el comando:
   ```bash
   docker-compose up -d
   ```
   *Esto descargará y levantará en segundo plano PostgreSQL en el puerto `5432` y Redis en el puerto `6379`.*

### Comandos de control de contenedores:
- **Verificar logs activos**: `docker-compose logs -f`
- **Detener servicios**: `docker-compose down`

---

## 3. Instalación e Inicio de Aplicaciones

### Paso 1: Levantar el Backend
1. Navega a la carpeta del backend:
   ```bash
   cd bluvi-backend
   ```
2. Instala las dependencias de desarrollo y producción:
   ```bash
   npm install
   ```
3. Crea tu archivo de variables de entorno `.env` copiando la plantilla:
   ```bash
   cp .env.example .env
   ```
   *(Asegúrate de configurar los valores locales; ver la sección de variables de entorno más abajo).*
4. Inicia el servidor en modo desarrollo con recarga automática:
   ```bash
   npm run dev
   ```
   *El servidor backend se ejecutará en http://localhost:3000.*

### Paso 2: Levantar el Frontend
1. Abre una nueva pestaña de terminal y navega al directorio del frontend:
   ```bash
   cd bluvi-frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea el archivo de variables `.env` del frontend:
   - Crea un archivo con nombre `.env` en la raíz del frontend.
   - Configura las variables para apuntar al backend local (ver valores recomendados abajo).
4. Lanza el servidor de desarrollo Vite:
   ```bash
   npm run dev
   ```
   *La SPA estará accesible en http://localhost:5173 (o la URL que te indique Vite).*

---

## 4. Configuración de Variables de Entorno

### Backend (Archivo `bluvi-backend/.env`)

Debes crear el archivo `.env` en la raíz del proyecto backend basándote en la siguiente tabla de variables críticas:

| Variable | Tipo / Valor Local | Descripción |
| :--- | :--- | :--- |
| `PORT` | `3000` | Puerto en el que escucha la API. |
| `NODE_ENV` | `development` | Entorno de ejecución (`development` o `production`). |
| `DATABASE_URL` | `postgresql://bluvi_user:bluvi_password@localhost:5432/bluvi_database` | Cadena de conexión al PostgreSQL (local Docker). |
| `REDIS_URL` | `redis://localhost:6379` | URL de conexión de la instancia de Redis local. |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Origen del frontend para permitir peticiones CORS. |
| `JWT_ACCESS_SECRET` | *Generar string aleatorio largo* | Secreto de cifrado para generar tokens de acceso de corta duración. |
| `JWT_REFRESH_SECRET` | *Generar string aleatorio largo* | Secreto de cifrado para firmar tokens de refresco de larga duración. |
| `ACCESS_TOKEN_EXPIRY` | `15m` | Tiempo de vida del token de acceso. |
| `REFRESH_TOKEN_EXPIRY` | `7d` | Tiempo de vida del token de refresco. |
| `EMAIL_USER` | *Tu usuario SMTP (ej: Gmail/Sendgrid)* | Usuario de correo electrónico para notificaciones de registro. |
| `EMAIL_PASS` | *Tu contraseña SMTP o App Password* | Contraseña de autenticación de correo. |

#### Variables para APIs de terceros (Opcional en desarrollo local)
- **Inferencia de Transcripción (Hugging Face / Whisper)**:
  - `HUGGINGFACE_API_TOKEN`: Token personal de la API de Hugging Face. Si falta, las notas de voz no podrán transcribirse.
  - `HUGGINGFACE_TRANSCRIPTION_MODEL`: Por defecto `openai/whisper-large-v3`.
- **Almacenamiento en la nube (Supabase)**:
  - `SUPABASE_URL`: Endpoint de tu bucket de Supabase.
  - `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`: Claves de autenticación de Supabase. Si no se proveen, la subida de imágenes y audios se saltará o dará error.

### Frontend (Archivo `bluvi-frontend/.env`)

| Variable | Valor Recomendado | Descripción |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | `http://localhost:3000` | URL base del servidor de API backend al que se conectará el cliente. |
| `VITE_SUPABASE_URL` | *Tu URL de Supabase* | Necesario para resoluciones de URLs públicas de archivos multimedia. |
| `VITE_SUPABASE_ANON_KEY` | *Tu clave Anon de Supabase* | Para consultas públicas directas a Supabase si aplica. |
