import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/student/profile')
      .then(({ data }) => setProfile(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value })

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const payload = {
        ...profile,
        cgpa: profile.cgpa ? parseFloat(profile.cgpa) : null,
        tenthPercentage: profile.tenthPercentage ? parseFloat(profile.tenthPercentage) : null,
        twelfthPercentage: profile.twelfthPercentage ? parseFloat(profile.twelfthPercentage) : null,
      }
      const { data } = await api.put('/student/profile', payload)
      setProfile(data)
      setMessage('Profile updated successfully')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="page-loading">Loading profile...</div>
  if (!profile) return <div className="alert alert-error">{error || 'Could not load profile'}</div>

  return (
    <div className="page-container">
      <h1>My Profile</h1>
      <form className="card form-card" onSubmit={handleSave}>
        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="form-grid">
          <div>
            <label>Name</label>
            <input name="name" value={profile.name || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Email</label>
            <input value={profile.email || ''} disabled />
          </div>
          <div>
            <label>Branch</label>
            <input name="branch" value={profile.branch || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Phone</label>
            <input name="phone" value={profile.phone || ''} onChange={handleChange} />
          </div>
          <div>
            <label>CGPA</label>
            <input type="number" step="0.01" name="cgpa" value={profile.cgpa ?? ''} onChange={handleChange} />
          </div>
          <div>
            <label>10th Percentage</label>
            <input type="number" step="0.01" name="tenthPercentage" value={profile.tenthPercentage ?? ''} onChange={handleChange} />
          </div>
          <div>
            <label>12th Percentage</label>
            <input type="number" step="0.01" name="twelfthPercentage" value={profile.twelfthPercentage ?? ''} onChange={handleChange} />
          </div>
        </div>

        <label>Skills</label>
        <input name="skills" value={profile.skills || ''} onChange={handleChange} />

        <label>Projects</label>
        <textarea name="projects" rows={3} value={profile.projects || ''} onChange={handleChange} />

        <button className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
