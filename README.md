# Documentación de Bluvi

Documentación técnica y operativa de Bluvi: frontend web, backend API y aplicación móvil.
El sitio está construido con [Docusaurus](https://docusaurus.io/).

## Instalación

```bash
npm ci
```

## Desarrollo local

```bash
npm run start
```

El comando inicia un servidor local con recarga automática.

## Build

```bash
npm run build
```

Genera el contenido estático en `build`.

## Despliegue

En local, el sitio se sirve desde `/`. Para GitHub Pages, utiliza la ruta del
proyecto al desplegar:

```powershell
$env:DOCUSAURUS_BASE_URL = '/bluvi_documentation/'
npm run deploy
```

La fuente técnica son los repositorios `bluvi-frontend`,
`bluvi-backend` y `bluvi-mobile`.
