import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from "./App"
import { ErrorBoundary } from "react-error-boundary";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
      
        <App />
      
    </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
