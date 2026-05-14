import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './100--App/App.tsx'
import Lists from './110--Lists/Lists.tsx'
import { WorkerScheduleProvider } from './Contexts/WorkerScheduleContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Lists />,
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkerScheduleProvider>
      <RouterProvider router={router} />
    </WorkerScheduleProvider>
  </StrictMode>,
)
