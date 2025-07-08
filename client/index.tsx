import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router/dom'
import { createBrowserRouter } from 'react-router'
import { Auth0Provider } from '@auth0/auth0-react'

// Import CSS for dark mode support
import './styles/App.css'

import routes from './routes.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter(routes)
// 🔐 Auth0 config values
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const redirectUri = 'http://localhost:5173'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
      ,
    </Auth0Provider>,
  )
})
