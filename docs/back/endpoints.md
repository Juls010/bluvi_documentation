# API Endpoints y Autenticación

Este documento describe la interfaz de programación (API REST) del backend de **Bluvi**, los mecanismos de seguridad integrados y la especificación de rutas.

---

## 1. Mecanismo de Autenticación (JWT)

Bluvi utiliza un sistema de autenticación seguro basado en **doble token JWT (JSON Web Tokens)**:

- **Access Token**: Token de corta duración (ej. 15 minutos) firmado y retornado en el cuerpo de la respuesta JSON tras un inicio de sesión exitoso. El frontend lo almacena en memoria de la sesión (no en `localStorage`) para evitar ataques XSS. Se inyecta en la cabecera `Authorization: Bearer <token>` en cada petición HTTP.
- **Refresh Token**: Token de larga duración (ej. 7 días) almacenado en una cookie de solo lectura HTTP.
  - **Atributos de Cookie**: `httpOnly=true` (no accesible por scripts JavaScript del cliente), `secure=true` (transmitida únicamente por HTTPS), y `SameSite=None` / `Lax` para evitar ataques CSRF.
  - **Rotación**: Al expirar el Access Token, el frontend realiza una petición a `/api/auth/refresh`. El backend valida el Refresh Token de la cookie y genera un nuevo par de tokens.

---

## 2. Protección contra Fuerza Bruta y Limitación de Peticiones

Para asegurar la API en producción frente a escaneos y ataques automatizados, se han integrado middlewares de rate-limiting (`express-rate-limit`):

- **Límites Generales**: 180 peticiones por minuto por dirección IP.
- **Límites de Autenticación**: Las rutas bajo `/api/auth/*` están restringidas a un máximo de 40 peticiones cada 15 minutos.
- **Bloqueo de Login (Login Guard)**:
  - Si un correo acumula más de 5 intentos fallidos desde una misma IP en menos de 15 minutos, esa combinación queda bloqueada por 20 minutos.
  - Si un correo acumula más de 12 intentos fallidos distribuidos en cualquier IP, el correo se bloquea temporalmente por 40 minutos en el sistema para evitar secuestros de cuentas.

---

## 3. Catálogo de Endpoints REST

La API responde en formato JSON y utiliza códigos de estado HTTP estándar (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `429 Too Many Requests`, `500 Server Error`).

### Módulo de Autenticación (`/api/auth`)

| Método | Endpoint | Autenticado | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | No | Registra una cuenta nueva temporal. Inicia el envío de código OTP de verificación. |
| `POST` | `/api/auth/login` | No | Autentica credenciales (email y contraseña). Retorna el Access Token y escribe la Cookie de Refresh. |
| `POST` | `/api/auth/refresh` | No | Lee la cookie de Refresh, la valida y emite un nuevo Access Token. |
| `POST` | `/api/auth/logout` | Sí | Invalida la sesión actual en base de datos y borra la cookie del navegador. |
| `GET` | `/api/auth/metadata` | No | Obtiene configuraciones globales necesarias para el cliente. |

### Módulo de Gestión de Usuarios y Perfiles (`/api/users`)

| Método | Endpoint | Autenticado | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Sí | Retorna la información completa del perfil del usuario autenticado. |
| `PUT` | `/api/users/profile` | Sí | Actualiza campos del perfil (intereses, neurodivergencia, configuraciones de accesibilidad). |
| `DELETE` | `/api/users/profile` | Sí | Borrado seguro y en cascada de la cuenta de usuario completa. |
| `GET` | `/api/users/profile/:id`| Sí | Obtiene el perfil público de otro usuario específico. |
| `POST` | `/api/users/verify-face`| Sí | Procesa la verificación facial biométrica del usuario cargando una selfie. |
| `GET` | `/api/users/explore` | Sí | Retorna perfiles recomendados aplicando filtros inteligentes de matching. |

### Módulo de Conexiones y Chats (`/api/matches` y `/api/chats`)

| Método | Endpoint | Autenticado | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/matches` | Sí | Envía una solicitud de conexión o responde a una solicitud recibida (Aceptar/Rechazar). |
| `GET` | `/api/matches` | Sí | Obtiene el listado de conexiones activas (Matches). |
| `GET` | `/api/chats` | Sí | Lista los canales de conversación del usuario con sus mensajes recientes. |
| `POST` | `/api/chats/messages` | Sí | Envía un mensaje de texto o archivo de audio a un chat existente. |

---

## 4. Eventos en Tiempo Real (Socket.io)

El servidor levanta un canal de WebSockets para dar soporte interactivo a la mensajería instantánea:

- **Eventos de entrada (Emitidos por el Servidor)**:
  - `message:received`: Notifica la llegada de un nuevo mensaje de texto o nota de voz.
  - `user:typing`: Avisa que un contacto está escribiendo.
  - `user:online`: Actualiza el indicador de presencia de un contacto.
- **Eventos de salida (Emitidos por el Cliente)**:
  - `message:send`: Envía un payload de chat de forma síncrona.
  - `typing:start` / `typing:stop`: Modifican el estado de escritura en la sala del chat receptor.
