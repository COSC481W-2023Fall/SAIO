/* React */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "react-big-calendar/lib/css/react-big-calendar.css";

/* Components */
import App from './App.jsx'

/* Styles */
import './style/index.css'
import './style/App.css'
import './style/Navbar.css'

{/* Importing Context File */}
import { ContextProvider } from './contexts/ContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>
)