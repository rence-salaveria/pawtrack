import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AppRouter} from "./routing/router.tsx";
import {Toaster} from "react-hot-toast";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position='bottom-right'/>
    <AppRouter/>
    <App/>
  </React.StrictMode>,
)
