import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  MoviesProvider  from './context/MoviesContext.jsx'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <MoviesProvider>
        <App />
      </MoviesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
