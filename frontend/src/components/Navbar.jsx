import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, isStudent, isAdmin, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        Campus<span>Connect</span>
      </Link>

      <nav className="navbar-links">
        {isStudent && (
          <>
            <Link to="/jobs">Browse Jobs</Link>
            <Link to="/applications">My Applications</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
        {isAdmin && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/companies">Companies</Link>
            <Link to="/admin/jobs">Jobs</Link>
          </>
        )}
      </nav>

      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
            <span className="navbar-user">Hi, {user.name?.split(' ')[0]}</span>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline" to="/login">Student Login</Link>
            <Link className="btn btn-primary" to="/admin/login">Admin Login</Link>
          </>
        )}
      </div>
    </header>
  )
}
