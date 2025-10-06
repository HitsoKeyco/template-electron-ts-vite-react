import { contextBridge, ipcRenderer } from 'electron';

// Exponer APIs seguras al proceso renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Enviar mensaje al proceso principal
  enviarMensaje: (mensaje: string) => {
    ipcRenderer.send('mensaje-al-main', mensaje);
  },
  
  // Recibir respuesta del proceso principal
  recibirRespuesta: (callback: (respuesta: string) => void) => {
    const listener = (_event: any, respuesta: string) => callback(respuesta);
    ipcRenderer.on('respuesta-del-main', listener);
    
    // Función para eliminar el listener cuando ya no sea necesario
    return () => {
      ipcRenderer.removeListener('respuesta-del-main', listener);
    };
  }
});

// Notificar que el preload ha sido cargado
console.log('Script de preload cargado');
