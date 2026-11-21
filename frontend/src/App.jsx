import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/AdminLogin'
import Profile from './pages/Profile'
import Jobs from './pages/Jobs'
import MyApplications from './pages/MyApplications'
import AdminDashboard from './pages/AdminDashboard'
import AdminCompanies from './pages/AdminCompanies'
import AdminJobs from './pages/AdminJobs'
import AdminApplicants from './pages/AdminApplicants'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Student-only routes */}
          <Route path="/profile" element={<ProtectedRoute role="STUDENT"><Profile /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute role="STUDENT"><Jobs /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute role="STUDENT"><MyApplications /></ProtectedRoute>} />

          {/* Admin-only routes */}
          <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/companies" element={<ProtectedRoute role="ADMIN"><AdminCompanies /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute role="ADMIN"><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/jobs/:jobId/applicants" element={<ProtectedRoute role="ADMIN"><AdminApplicants /></ProtectedRoute>} />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  )
}
