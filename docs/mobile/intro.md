---
sidebar_position: 1
---

# Introducción a Bluvi Mobile

`bluvi-mobile` es el cliente móvil de Bluvi desarrollado con Expo, React
Native y TypeScript. Comparte la API con la web, pero implementa navegación,
permisos, almacenamiento seguro, notificaciones y verificación nativa.

## Stack

- Expo SDK 56 y Expo Router 56.
- React Native 0.85 y React 19.
- TypeScript, NativeWind/Tailwind y estilos de tema propios.
- Axios, TanStack Query y Socket.IO Client.
- Expo SecureStore para el access token y datos de sesión.
- Expo Audio, Image Picker, Notifications, Speech, Haptics y Camera.
- `@expo/ui`, React Native Reanimated, Vision Camera y módulos nativos.
- EAS Build para APK/AAB y workflows EAS.

## Guías

- [Arquitectura y navegación](./architecture)
- [Funcionalidades y servicios](./features)
- [Desarrollo local y configuración](./development)
- [Verificación y Face Liveness](./verification)
- [Build y releases EAS](./release)
- [Smoke E2E con Maestro](./e2e)
