"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Exponer APIs seguras al proceso renderer
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // Enviar mensaje al proceso principal
    enviarMensaje: (mensaje) => {
        electron_1.ipcRenderer.send('mensaje-al-main', mensaje);
    },
    // Recibir respuesta del proceso principal
    recibirRespuesta: (callback) => {
        const listener = (_event, respuesta) => callback(respuesta);
        electron_1.ipcRenderer.on('respuesta-del-main', listener);
        // Función para eliminar el listener cuando ya no sea necesario
        return () => {
            electron_1.ipcRenderer.removeListener('respuesta-del-main', listener);
        };
    }
});
// Notificar que el preload ha sido cargado
console.log('Script de preload cargado');
//# sourceMappingURL=preload.js.map