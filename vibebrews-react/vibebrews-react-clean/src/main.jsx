import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Disable browser scroll restoration - we handle it manually
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// Using HashRouter for better compatibility with static file hosting
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
