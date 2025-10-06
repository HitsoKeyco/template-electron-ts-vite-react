import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

// Suprimir advertencias de seguridad en desarrollo
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

// Mantener referencia global al objeto window
let mainWindow: BrowserWindow | null = null;

function createWindow() {
    // Crear la ventana del navegador
    mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Detectar si estamos en desarrollo o producción
    const isDev = !app.isPackaged && process.env.ELECTRON_IS_PACKAGED !== 'true';

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
                } catch (err) {
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
    } else {
        // En producción, carga desde los archivos compilados
        mainWindow.loadFile(path.join(__dirname, '../dist/renderer/index.html'));
    }

    // Manejar el cierre de la ventana
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Crear ventana cuando la app esté lista
app.whenReady().then(createWindow);

// En macOS es común recrear una ventana cuando
// se hace clic en el icono del dock
app.on('activate', () => {
    if (mainWindow === null) createWindow();
});

// Salir cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Ejemplo de comunicación IPC
ipcMain.on('mensaje-al-main', (_event, arg) => {
    console.log('Mensaje recibido en main:', arg);

    // Enviar respuesta al renderer
    mainWindow?.webContents.send('respuesta-del-main', `Recibido: ${arg}`);
});
