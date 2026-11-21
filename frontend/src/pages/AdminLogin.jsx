import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { loginAdmin } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginAdmin(form.username, form.password)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <div className="alert alert-error">{error}</div>}

        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} placeholder="admin" />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />

        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="auth-switch"><small>Default seed: admin / admin123</small></p>
      </form>
    </div>
  )
}
