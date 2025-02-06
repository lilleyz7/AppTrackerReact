import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router'
import { LoginPage } from './pages/LoginPage'
import { RegistrationPage } from './pages/RegistrationPage'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  </BrowserRouter>,
)
