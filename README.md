# Plantilla Electron + TypeScript + Vite + React

Una plantilla moderna y optimizada para desarrollar aplicaciones de escritorio con Electron, React, TypeScript y Vite.

## Características

- ⚡️ **Vite** - Desarrollo ultrarrápido con Hot Module Replacement (HMR)
- ⚛️ **React 19** - La última versión de React con hooks y características modernas
- 📝 **TypeScript** - Tipado estático para código más seguro y mejor experiencia de desarrollo
- 🔌 **Electron** - Crea aplicaciones de escritorio multiplataforma con tecnologías web
- 🔄 **IPC** - Comunicación entre procesos principal y renderer ya configurada
- 🔒 **Seguridad** - Context Isolation y Content Security Policy implementadas

## Estructura del Proyecto

```
/
├── electron/           # Código de Electron
│   └── src/
│       ├── main.ts     # Proceso principal
│       └── preload.ts  # Script de preload
├── src/                # Código de React (renderer)
│   ├── assets/         # Imágenes y recursos estáticos
│   ├── App.tsx         # Componente principal de React
│   └── main.tsx        # Punto de entrada de React
├── dist/               # Archivos compilados
│   └── renderer/       # Aplicación React compilada
├── package.json        # Dependencias y scripts
└── tsconfig.json       # Configuración de TypeScript
```

## Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar en modo desarrollo
npm run electron:dev
```

Esto iniciará:
- Un servidor de desarrollo Vite para React
- Compilación TypeScript en modo watch para Electron
- La aplicación Electron conectada al servidor de desarrollo

### Producción

```bash
# Construir para producción
npm run electron:build
```

Esto generará:
- Archivos optimizados de React en `dist/renderer/`
- Archivos JavaScript compilados de Electron
- Instaladores para tu aplicación en la carpeta `release/`

### Previsualización

```bash
# Previsualizar la versión de producción
npm run electron:preview
```

## Comunicación IPC

La comunicación entre el proceso principal (main) y el renderer (React) ya está configurada:

### En React (renderer)

```typescript
// Enviar mensaje al proceso principal
window.electronAPI.enviarMensaje('Hola desde React');

// Recibir respuesta del proceso principal
const removeListener = window.electronAPI.recibirRespuesta((mensaje) => {
  console.log('Respuesta recibida:', mensaje);
});

// Limpiar listener cuando ya no sea necesario
removeListener();
```

### En Electron (main)

```typescript
// Recibir mensaje del renderer
ipcMain.on('mensaje-al-main', (_event, arg) => {
  console.log('Mensaje recibido:', arg);
  
  // Enviar respuesta al renderer
  mainWindow?.webContents.send('respuesta-del-main', `Recibido: ${arg}`);
});
```

## Personalización

### Configuración de Vite

Edita `vite.config.ts` para personalizar la configuración de Vite.

### Configuración de Electron

Edita `electron/src/main.ts` para personalizar la ventana de Electron y otras opciones.

### Configuración de TypeScript

Edita los archivos `tsconfig.*.json` para personalizar la configuración de TypeScript.

## Scripts Disponibles

- `npm run dev` - Inicia solo el servidor de desarrollo de Vite
- `npm run build` - Construye solo la aplicación React
- `npm run electron:dev` - Inicia la aplicación en modo desarrollo
- `npm run electron:build` - Construye la aplicación para distribución
- `npm run electron:preview` - Previsualiza la aplicación en modo producción

## Licencia

MIT# template-electron-ts-vite-react
