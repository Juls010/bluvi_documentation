# Decisiones de diseño

## Accesibilidad cognitiva

Bluvi divide los flujos largos en pasos pequeños, utiliza copy explícito,
estados de carga previsibles y ofrece preferencias de contraste, tamaño de
fuente, reducción de movimiento y narración. Web usa React Aria donde aporta
controles accesibles; mobile expone roles, labels y estados nativos de
accesibilidad.

## Clientes separados

La web y mobile comparten contratos de backend, pero no componentes. Esto
permite que cada plataforma respete sus patrones de navegación, permisos y
almacenamiento seguro. La app móvil no modifica la carpeta web.

## PostgreSQL y transacciones

Perfiles, matches, conversaciones, moderación y preferencias requieren
integridad relacional. Las operaciones que afectan varias tablas se agrupan en
transacciones y las relaciones usan restricciones de integridad y cascadas
cuando corresponde.

## Caché con fallback

Redis/Upstash acelera metadatos, discovery y datos temporales. El backend debe
invalidar entradas relacionadas cuando cambian perfiles, privacidad o
discovery. El servicio de caché contempla una degradación controlada si Redis
no está disponible.

## Verificación en servidor

El cliente solo inicia la experiencia de cámara y recibe identificadores
opacos. El backend crea y consume sesiones de AWS Face Liveness, valida el
usuario, compara la imagen de referencia y decide el estado final. El cliente
no puede enviar `status`, `confidence` ni resultados de proveedor como
autoridad.

## Tiempo real con Socket.IO

HTTP sigue siendo la fuente de persistencia y recuperación inicial. Socket.IO
complementa ese flujo con eventos de presencia, typing, mensajes, lectura,
entrega y reacciones. Cada conexión se autentica con access token y el backend
comprueba autorización antes de reenviar eventos sensibles.
