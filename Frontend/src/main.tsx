import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.ts'
import { Toaster } from 'react-hot-toast'
import { IonIcon } from '@ionic/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
     <App />
     <Toaster />
     <IonIcon />
    </Provider>
  </React.StrictMode>,
)
