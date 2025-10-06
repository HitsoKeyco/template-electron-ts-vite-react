import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import electronLogo from './assets/electron-logo.svg'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [respuesta, setRespuesta] = useState<string | null>(null)

  // Configurar listener para respuestas de Electron
  useEffect(() => {
    // Solo configurar si estamos en Electron
    if (window.electronAPI) {
      const removeListener = window.electronAPI.recibirRespuesta((mensaje) => {
        setRespuesta(mensaje)
      })
      
      // Limpiar listener al desmontar
      return () => {
        removeListener()
      }
    }
  }, [])

  // Enviar mensaje al proceso principal de Electron
  const enviarMensaje = () => {
    if (window.electronAPI && mensaje.trim()) {
      window.electronAPI.enviarMensaje(mensaje)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://electronjs.org" target="_blank">
          <img src={electronLogo} className="logo electron" alt="Electron logo" width="100" />
        </a>
      </div>
      <h1>Vite + React + Electron</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
        {/* Interfaz para comunicación con Electron */}
        <div className="electron-section">
          <h3>Comunicación con Electron</h3>
          <div className="electron-controls">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe un mensaje para Electron"
            />
            <button onClick={enviarMensaje}>
              Enviar a Electron
            </button>
          </div>
          {respuesta && (
            <div className="electron-response">
              <p>Respuesta: {respuesta}</p>
            </div>
          )}
        </div>
      </div>
      <p className="read-the-docs">
        Click en los logos para aprender más
      </p>
    </>
  )
}

export default App
