import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { isAuthenticated, isStudent, isAdmin } = useAuth()

  return (
    <div className="hero">
      <h1>Welcome to CampusConnect</h1>
      <p>The one-stop placement portal to browse jobs, check eligibility instantly, and track every application from Applied to Selected.</p>

      {!isAuthenticated && (
        <div className="hero-actions">
          <Link className="btn btn-primary btn-large" to="/register">Get Started as Student</Link>
          <Link className="btn btn-outline btn-large" to="/admin/login">Admin Login</Link>
        </div>
      )}
      {isStudent && (
        <div className="hero-actions">
          <Link className="btn btn-primary btn-large" to="/jobs">Browse Jobs</Link>
        </div>
      )}
      {isAdmin && (
        <div className="hero-actions">
          <Link className="btn btn-primary btn-large" to="/admin">Go to Dashboard</Link>
        </div>
      )}

      <div className="hero-features">
        <div className="feature-card">
          <h3>🎯 Automatic Eligibility</h3>
          <p>CGPA, 10th/12th and branch criteria are validated instantly and re-checked by the backend on every apply.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Live Status Tracking</h3>
          <p>Follow every application through Applied → Shortlisted → Interview → Selected/Rejected.</p>
        </div>
        <div className="feature-card">
          <h3>🛠️ Full Admin Control</h3>
          <p>Manage companies, post jobs, set eligibility rules, and review applicants from one dashboard.</p>
        </div>
      </div>
    </div>
  )
}
