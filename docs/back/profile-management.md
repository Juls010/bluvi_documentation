# Perfiles, privacidad y discovery

## Perfil propio

`GET /api/users/profile` devuelve el perfil autenticado con sus preferencias,
fotos, intereses, estilos y estado de verificación. `PUT /api/users/profile`
valida el payload y actualiza las colecciones relacionadas dentro de un flujo
transaccional.

Las fotos usan el patrón prepare/complete para uploads directos cuando el
cliente lo soporta. El backend conserva la autoridad sobre path, propietario,
tipo y permisos de acceso.

## Perfil de otra persona

`GET /api/users/:userId` aplica las reglas de privacidad y conexión. El cliente
no debe asumir que un perfil visto en discovery puede consultarse con detalle:
el backend puede ocultar datos, exigir una relación permitida o responder con
error.

## Discovery

`GET /api/users/explore` combina filtros de compatibilidad, paginación/cursor,
privacidad y exclusiones. `seen` e `impression` registran el comportamiento de
descubrimiento. El caché se invalida cuando cambia un perfil o una preferencia
que afecte a su visibilidad.

## Privacidad y accesibilidad

Los endpoints separados permiten modificar visibilidad, estado online,
preferencias de mensajes, contraste, tamaño de fuente, movimiento y otras
opciones de accesibilidad sin mezclar esos datos con el formulario general.

## Eliminación

`DELETE /api/users/profile` requiere autenticación y validaciones del
controlador. Debe tratarse como operación destructiva: elimina relaciones
dependientes y registra la operación de auditoría cuando la configuración lo
habilita. Los objetos físicos de storage deben gestionarse de forma coherente
con la política de retención.
