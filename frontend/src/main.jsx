import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PpeProvider } from './PpeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PpeProvider>
        <App />
    </PpeProvider>
  </StrictMode>,
)
