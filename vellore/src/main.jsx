import { createRoot } from 'react-dom/client'
import queryClient from './services/queryClient.js'
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "react-redux"
import { store } from './redux/index.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
)
