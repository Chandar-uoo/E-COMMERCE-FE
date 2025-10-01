import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { AppStore } from './store/AppStore.jsx'
import ErrorBoundary from './pages/common/ErrorBoundry.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={AppStore}>
   <ErrorBoundary>
     <App />
   </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
