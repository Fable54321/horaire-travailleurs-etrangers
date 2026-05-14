import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './100--App/App.tsx'
import Lists from './110--Lists/Lists.tsx'
import { WorkerScheduleProvider } from './Contexts/WorkerScheduleContext.tsx'
import { PersistentAuthProvider } from './Contexts/AuthContext.tsx'
import ProtectedRoute from './Components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
  <ProtectedRoute>
    <App />
 </ProtectedRoute>
  ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
        <Lists />
        </ProtectedRoute>
      ),
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistentAuthProvider>
    <WorkerScheduleProvider>
      <RouterProvider router={router} />
    </WorkerScheduleProvider>
    </PersistentAuthProvider>
  </StrictMode>,
)
