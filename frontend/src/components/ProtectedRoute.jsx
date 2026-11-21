import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Guards a route by role. Usage:
 *   <ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>
 */
export default function ProtectedRoute({ role, children }) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }
  return children
}
