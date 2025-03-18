import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UserProvider } from './UserContext'
import {NotificationContextProvider} from './NotificationContext';
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserProvider>
  </QueryClientProvider>
)
