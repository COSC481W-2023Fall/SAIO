import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

{/* Importing Context File */}
import { ContextProvider } from './contexts/ContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
)
