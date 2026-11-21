import React, { createContext, useContext, useState, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('cc_user')
    return stored ? JSON.parse(stored) : null
  })

  const persistSession = useCallback((authResponse) => {
    const sessionUser = {
      userId: authResponse.userId,
      name: authResponse.name,
      role: authResponse.role,
    }
    localStorage.setItem('cc_token', authResponse.token)
    localStorage.setItem('cc_user', JSON.stringify(sessionUser))
    setUser(sessionUser)
  }, [])

  const loginStudent = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/student/login', { username: email, password })
    persistSession(data)
    return data
  }, [persistSession])

  const registerStudent = useCallback(async (payload) => {
    const { data } = await api.post('/auth/student/register', payload)
    persistSession(data)
    return data
  }, [persistSession])

  const loginAdmin = useCallback(async (username, password) => {
    const { data } = await api.post('/auth/admin/login', { username, password })
    persistSession(data)
    return data
  }, [persistSession])

  const logout = useCallback(() => {
    localStorage.removeItem('cc_token')
    localStorage.removeItem('cc_user')
    setUser(null)
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    isStudent: user?.role === 'STUDENT',
    isAdmin: user?.role === 'ADMIN',
    loginStudent,
    registerStudent,
    loginAdmin,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
