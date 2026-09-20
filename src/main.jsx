import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { PostProvider } from './context/PostContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AuthProvider>
          <PostProvider>
            <AppRoutes />
          </PostProvider>
        </AuthProvider>
  </StrictMode>
)
