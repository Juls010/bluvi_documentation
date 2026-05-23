# Decisiones de Diseño

Este documento expone las principales decisiones técnicas y de diseño arquitectónico tomadas durante el desarrollo de **Bluvi**, justificando el uso de determinadas tecnologías o patrones para resolver retos específicos del proyecto.

---

## 1. Diseño para la Neurodiversidad (Accesibilidad Cognitiva)

La principal directriz de diseño de Bluvi es la empatía y accesibilidad para usuarios neurodivergentes (por ejemplo, personas dentro del espectro autista). Esto motivó las siguientes decisiones en el frontend:

- **Interfaces de Calma**: Se descartaron colores vibrantes y saturados que pudieran generar estrés o fatiga sensorial. En su lugar, se configuró una paleta de tonos pastel y neutros suaves que favorecen la calma visual.
- **Reducción de Movimiento y Transparencias**: A través de la configuración del perfil, los usuarios pueden desactivar transiciones complejas (respetado globalmente por Framer Motion) y aumentar la opacidad de los contenedores para evitar distracciones durante la lectura.
- **Asistente de Registro Predecible (14 pasos)**: Rellenar perfiles en aplicaciones convencionales suele generar ansiedad debido al tamaño de los formularios. Se optó por un wizard fragmentado de 14 pasos con un indicador segmentado de progreso claro, lo que reduce la carga mental paso a paso.
- **Componentes con React Aria**: Se prefirió `React Aria` para componentes interactivos críticos (como selectores de fecha y menús interactivos) debido a su estricto cumplimiento de accesibilidad (a11y), garantizando compatibilidad con navegadores por teclado y lectores de pantalla.

---

## 2. Robustez de Persistencia: Transacciones ACID en PostgreSQL

En el backend, la gestión del borrado de cuentas y la verificación de datos requiere la máxima integridad referencial. Se optó por **PostgreSQL** y se implementaron transacciones SQL explícitas debido a:

- **Prevención de Perfiles Corruptos**: El borrado de una cuenta de usuario (`DELETE /api/users/profile`) implica eliminar registros en múltiples tablas (usuarios, perfiles, matches, mensajes, sesiones). El uso de transacciones ACID nativas (`BEGIN`, `COMMIT`, `ROLLBACK`) asegura que, si ocurre un fallo al borrar un mensaje o archivo físico en Supabase, el borrado completo se revierte, impidiendo estados huérfanos o inconsistencias en la base de datos.
- **Borrado en Cascada Estricto**: Se definieron restricciones de clave ajena con `ON DELETE CASCADE` directamente en el esquema relacional, permitiendo a la base de datos limpiar de forma segura relaciones asociadas (como tokens de refresco y chats).

---

## 3. Caché de Alta Disponibilidad con Redis

Para optimizar las consultas repetitivas de descubrimiento de perfiles (`GET /api/users/explore`), se introdujo una capa de almacenamiento en caché usando **Redis**:

- **Caché Reactivo e Invalidation**: Las búsquedas con filtros complejos se almacenan en Redis con un TTL corto (hasta 30 segundos) para mitigar cargas del servidor en picos de tráfico. Sin embargo, la caché es reactiva: si un usuario actualiza su perfil, cambia su estado de privacidad, o marca a otros usuarios como "vistos", el backend invalida inmediatamente las claves de caché correspondientes para garantizar que los datos mostrados sigan siendo precisos.
- **Persistencia Temporal de Registro**: Redis almacena los metadatos temporales de registro y los códigos de verificación OTP con TTLs autolimitados. De esta forma, evitamos saturar las tablas de PostgreSQL con cuentas que nunca llegaron a completar su verificación de correo electrónico.

---

## 4. Mecanismo de Lazy Schema Migration (Automigración)

Durante fases de desarrollo activo, la sincronización entre los cambios del código backend y el esquema de base de datos local o en la nube puede causar caídas. Se implementó una lógica de **automigración en tiempo de ejecución**:

- **Verificación de Tablas**: Al arrancar el servidor backend, se ejecutan queries SQL de verificación (como `ensureMatchTable` o `ensureMessageTable`). Si una tabla necesaria no existe, el propio código ejecuta las sentencias de creación correspondientes de forma transparente.
- **Escalabilidad inicial**: Aunque para proyectos grandes se recomiendan herramientas de migración tradicionales (como Prisma o Flyway), este enfoque de lazy migration en desarrollo simplifica enormemente el despliegue rápido y reduce la fricción de configuración para nuevos contribuidores del TFG.
