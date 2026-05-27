import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
import Lesson from './pages/Lesson'

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="text-4xl animate-float">🧠</span>
        <p className="text-slate-500 text-sm font-body">Loading...</p>
      </div>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role && !(role === 'teacher' && user.role === 'admin')) {
    return <Navigate to={user.role === 'student' ? '/lesson' : '/dashboard'} replace />
  }
  return children
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <span className="text-4xl animate-float">🧠</span>
    </div>
  )

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={user.role === 'student' ? '/lesson' : '/dashboard'} replace /> : <Login />} />
      <Route path="/lesson" element={<ProtectedRoute role="student"><Lesson /></ProtectedRoute>} />
      <Route path="/chat" element={<Navigate to="/lesson" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute role="teacher"><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={user ? (user.role === 'student' ? '/lesson' : '/dashboard') : '/login'} replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
