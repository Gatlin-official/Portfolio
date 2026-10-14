import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { installTextures } from './textures.js'
import App from './App.jsx'
import '@fontsource/press-start-2p/400.css'
import '@fontsource/vt323/400.css'
import './styles.css'

installTextures()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
