import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/Store.ts'
import { GeneralContextProvider } from './contexts/GeneralContext.tsx'
import { LanguageContextProvider } from './contexts/LanguageContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <GeneralContextProvider>
          <LanguageContextProvider>
            <App />
          </LanguageContextProvider>
        </GeneralContextProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
)
