# Repositorios y responsabilidades

Bluvi se organiza como un sistema multirepositorio. Cada repositorio tiene una
responsabilidad clara y un ciclo de entrega independiente, pero todos forman
parte del mismo producto.

| Componente | Responsabilidad | Integraciones principales |
| --- | --- | --- |
| Frontend web | SPA pública, área autenticada y administración | API REST, Socket.IO, Supabase, Cloudflare |
| Backend | Reglas de negocio, persistencia, autenticación y tiempo real | PostgreSQL, Redis, storage y proveedores externos |
| Mobile | Cliente nativo para Android/iOS | API REST, Socket.IO, cámara, audio, push y EAS |
| Documentación | Arquitectura, contratos, flujos y operación técnica | Docusaurus |

## Contratos compartidos

Los clientes consumen la API del backend mediante HTTP y Socket.IO. Los cambios
en autenticación, perfiles, discovery, matches, chat, multimedia o verificación
deben mantener compatibilidad entre web y mobile.

El backend es la autoridad para:

- Identidad, permisos y sesiones.
- Privacidad, matches, bloqueos y moderación.
- Persistencia y consistencia de datos.
- Resultados de verificación y operaciones sensibles.

Los clientes son responsables de presentación, navegación, accesibilidad,
cacheado local y adaptación a las capacidades de cada plataforma.

## Organización del código

- La web agrupa pantallas en `pages`, composición en `components` y acceso a
  datos en `services`.
- El backend separa rutas, controladores, middleware, servicios y configuración.
- Mobile separa rutas Expo, componentes, contextos, servicios, tipos y módulos
  nativos.
- La documentación sigue las mismas áreas: general, backend, frontend y mobile.
