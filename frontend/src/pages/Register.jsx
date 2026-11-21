import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const BRANCHES = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIML', 'AIDS']

const initialForm = {
  name: '', email: '', password: '', branch: 'CSE',
  cgpa: '', tenthPercentage: '', twelfthPercentage: '', skills: '', projects: '', phone: '',
}

export default function Register() {
  const { registerStudent } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.name.trim()) return 'Name is required'
    if (!form.email.trim()) return 'Email is required'
    if (form.password.length < 6) return 'Password must be at least 6 characters'
    if (form.cgpa && (form.cgpa < 0 || form.cgpa > 10)) return 'CGPA must be between 0 and 10'
    if (form.tenthPercentage && (form.tenthPercentage < 0 || form.tenthPercentage > 100)) return '10th % must be 0-100'
    if (form.twelfthPercentage && (form.twelfthPercentage < 0 || form.twelfthPercentage > 100)) return '12th % must be 0-100'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setLoading(true)
    try {
      const payload = {
        ...form,
        cgpa: form.cgpa ? parseFloat(form.cgpa) : null,
        tenthPercentage: form.tenthPercentage ? parseFloat(form.tenthPercentage) : null,
        twelfthPercentage: form.twelfthPercentage ? parseFloat(form.twelfthPercentage) : null,
      }
      await registerStudent(payload)
      navigate('/jobs')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card auth-card-wide" onSubmit={handleSubmit}>
        <h2>Create Student Account</h2>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-grid">
          <div>
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Deepanshu Tolani" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@srmist.edu.in" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="min 6 characters" />
          </div>
          <div>
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" />
          </div>
          <div>
            <label>Branch</label>
            <select name="branch" value={form.branch} onChange={handleChange}>
              {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label>CGPA (out of 10)</label>
            <input type="number" step="0.01" name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="8.5" />
          </div>
          <div>
            <label>10th Percentage</label>
            <input type="number" step="0.01" name="tenthPercentage" value={form.tenthPercentage} onChange={handleChange} placeholder="92" />
          </div>
          <div>
            <label>12th Percentage</label>
            <input type="number" step="0.01" name="twelfthPercentage" value={form.twelfthPercentage} onChange={handleChange} placeholder="88" />
          </div>
        </div>

        <label>Skills (comma separated)</label>
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Java, React, Spring Boot, SQL" />

        <label>Projects</label>
        <textarea name="projects" value={form.projects} onChange={handleChange} rows={3}
          placeholder="Short description of key projects" />

        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}
