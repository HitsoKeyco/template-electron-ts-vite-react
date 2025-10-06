/**
 * Declaración de tipos para las APIs de Electron expuestas al renderer
 */
interface ElectronAPI {
  /**
   * Envía un mensaje al proceso principal de Electron
   * @param mensaje El mensaje a enviar
   */
  enviarMensaje: (mensaje: string) => void;
  
  /**
   * Registra un callback para recibir respuestas del proceso principal
   * @param callback Función que se ejecutará cuando se reciba una respuesta
   * @returns Función para eliminar el listener
   */
  recibirRespuesta: (callback: (respuesta: string) => void) => () => void;
}

declare interface Window {
  /**
   * API de Electron expuesta por el script de preload
   */
  electronAPI: ElectronAPI;
}
