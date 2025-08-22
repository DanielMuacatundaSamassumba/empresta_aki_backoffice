import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import './index.css'
import { routes } from "@/routes/Routes"
import { ThemeProvider } from './context/ThemeProvider'

async function deferRander() {

  if (import.meta.env.DEV) {
    const module = await import('@/mocks/browser');
    const { server } = module;
    return server.start()
  }
}

deferRander().then(() => (
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </StrictMode>
  )
))
