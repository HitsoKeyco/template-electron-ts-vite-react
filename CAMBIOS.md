# Cambios realizados en la plantilla Electron + TypeScript + Vite + React

## Problemas resueltos

1. **Error de carga de recursos**: Se corrigió el problema donde Electron intentaba cargar recursos inexistentes en modo desarrollo.
2. **Conflicto de carpetas**: Se separó la salida de Vite (renderer) y Electron para evitar conflictos.
3. **Detección de entorno**: Se mejoró la detección de entorno de desarrollo vs producción.

## Cambios técnicos

### 1. Estructura de directorios
- Se separó la salida de Vite a `dist/renderer/` para evitar conflictos con los archivos de Electron.

### 2. Configuración de Vite
- Se actualizó `vite.config.ts` para usar `base: './'` (rutas relativas).
- Se cambió `outDir` a `dist/renderer` para separar los archivos del renderer.

### 3. Detección de entorno en Electron
- Se reemplazó la dependencia de `NODE_ENV` por `app.isPackaged`.
- Se agregó soporte para la variable `ELECTRON_IS_PACKAGED` para pruebas.
- Se implementó una detección de puertos dinámicos para el servidor de Vite.

### 4. Scripts de npm
- Se actualizó `electron:preview` para usar `cross-env` y simular un entorno empaquetado.

## Cómo funciona ahora

1. **En desarrollo** (`npm run electron:dev`):
   - Vite sirve la aplicación React en `http://localhost:5173` (o puerto alternativo).
   - Electron detecta automáticamente el puerto y carga la aplicación desde ahí.

2. **En producción** (`npm run electron:preview` o `electron-builder`):
   - Vite construye la aplicación en `dist/renderer/`.
   - Electron carga la aplicación desde `dist/renderer/index.html`.

## Notas adicionales

- El warning de Content-Security-Policy es normal en desarrollo y desaparecerá en producción.
- Para mejorar la seguridad en producción, considera agregar una CSP adecuada en el HTML.
