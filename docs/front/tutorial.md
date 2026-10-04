# Guía funcional y de desarrollo

## Flujo de usuario

1. La persona entra en `/` y puede consultar información y documentos legales.
2. En `/register` completa el wizard y sube fotos mediante los endpoints de
   registro.
3. Tras verificar el email accede al área privada.
4. En Discovery consulta perfiles, registra vistos e inicia solicitudes de
   match.
5. Los matches aceptados habilitan conversaciones y eventos de tiempo real.
6. Perfil y ajustes permiten editar datos, privacidad, accesibilidad,
   preferencias de atmósfera, reportes y eliminación de cuenta.

## Integración con backend

Los servicios de `src/services` deben usar la instancia Axios centralizada y
tipar las respuestas. Las páginas no deben construir URLs de backend
manualmente. Para operaciones sensibles:

- Mostrar errores de API en copy comprensible.
- No confiar en datos del cliente para permisos o verificación.
- Invalidar caché después de cambios de perfil, match o conversación.
- Mantener estados de carga y reintento explícitos.

## Chat

La pantalla recupera conversaciones y mensajes por HTTP y después escucha
Socket.IO para typing, mensajes nuevos, lectura, entrega, reacciones, presencia
y borrado. Las imágenes y audios utilizan los servicios de multimedia y pueden
pasar por URLs firmadas; la transcripción es una acción manual.

## Desarrollo de una pantalla

1. Localiza el dominio en `pages`, `components`, `services` y `types`.
2. Reutiliza layout, tema, toast y controles accesibles existentes.
3. Define estados loading/empty/error/success.
4. Conecta la mutación al servicio y actualiza/invalida TanStack Query.
5. Añade pruebas en `src/tests` o junto al flujo de registro.
6. Ejecuta `npm run lint`, `npm test` y `npm run build`.
