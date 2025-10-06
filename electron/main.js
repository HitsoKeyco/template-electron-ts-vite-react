"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
// Suprimir advertencias de seguridad en desarrollo
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
// Mantener referencia global al objeto window
let mainWindow = null;
function createWindow() {
    // Crear la ventana del navegador
    mainWindow = new electron_1.BrowserWindow({
        width: 900,
        height: 670,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    // Detectar si estamos en desarrollo o producción
    const isDev = !electron_1.app.isPackaged && process.env.ELECTRON_IS_PACKAGED !== 'true';
    if (isDev) {
        // En desarrollo, carga desde el servidor de Vite
        // No aplicamos CSP estricta en desarrollo para permitir HMR
        const tryLoadURL = async () => {
            const ports = [5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180];
            for (const port of ports) {
                try {
                    const url = `http://localhost:${port}`;
                    console.log(`Intentando cargar desde ${url}`);
                    if (mainWindow) {
                        await mainWindow.loadURL(url);
                        console.log(`Cargado correctamente desde ${url}`);
                        return true;
                    }
                }
                catch (err) {
                    console.log(`No se pudo cargar desde el puerto ${port}`);
                }
            }
            return false;
        };
        tryLoadURL().then(success => {
            if (!success) {
                console.error('No se pudo conectar a ningún servidor de desarrollo de Vite');
            }
            // Las DevTools ya no se abren automáticamente
        });
    }
    else {
        // En producción, carga desde los archivos compilados
        mainWindow.loadFile(path.join(__dirname, '../dist/renderer/index.html'));
    }
    // Manejar el cierre de la ventana
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
// Crear ventana cuando la app esté lista
electron_1.app.whenReady().then(createWindow);
// En macOS es común recrear una ventana cuando
// se hace clic en el icono del dock
electron_1.app.on('activate', () => {
    if (mainWindow === null)
        createWindow();
});
// Salir cuando todas las ventanas estén cerradas (excepto en macOS)
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// Ejemplo de comunicación IPC
electron_1.ipcMain.on('mensaje-al-main', (_event, arg) => {
    console.log('Mensaje recibido en main:', arg);
    // Enviar respuesta al renderer
    mainWindow?.webContents.send('respuesta-del-main', `Recibido: ${arg}`);
});
//# sourceMappingURL=main.js.map