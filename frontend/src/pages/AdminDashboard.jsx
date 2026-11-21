
import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/admin/dashboard/stats')
      .then(({ data }) => setStats(data))
      .catch((err) => setError(err.message))
  }, [])

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  if (error) return <div className="alert alert-error">{error}</div>
  if (!stats) return <div className="page-loading">Loading dashboard...</div>

  const cards = [
    { label: 'Total Students', value: stats.totalStudents, icon: '🎓', color: 'stat-blue' },
    { label: 'Partner Companies', value: stats.totalCompanies, icon: '🏢', color: 'stat-purple' },
    { label: 'Active Job Postings', value: stats.totalJobs, icon: '💼', color: 'stat-orange' },
    { label: 'Total Applications', value: stats.totalApplications, icon: '📄', color: 'stat-teal' },
    { label: 'Shortlisted', value: stats.shortlistedCount, icon: '📋', color: 'stat-yellow' },
    { label: 'In Interview', value: stats.interviewCount, icon: '🗣️', color: 'stat-indigo' },
    { label: 'Selected', value: stats.selectedCount, icon: '✅', color: 'stat-green' },
    { label: 'Rejected', value: stats.rejectedCount, icon: '✖️', color: 'stat-red' },
  ]

  const placementRate = stats.totalApplications > 0
    ? ((stats.selectedCount / stats.totalApplications) * 100).toFixed(1)
    : '0.0'

  return (
    <div className="page-container">
      <div className="dash-banner">
        <div>
          <p className="dash-eyebrow">Training & Placement Cell</p>
          <h1>Admin Dashboard</h1>
          <p className="dash-date">{today}</p>
        </div>
        <div className="dash-rate-card">
          <span className="dash-rate-value">{placementRate}%</span>
          <span className="dash-rate-label">Selection Rate</span>
        </div>
      </div>

      <div className="stats-grid">
        {cards.map((c) => (
          <div key={c.label} className={`stat-card ${c.color}`}>
            <span className="stat-icon">{c.icon}</span>
            <div>
              <span className="stat-value">{c.value}</span>
              <span className="stat-label">{c.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-footer-note">
        <span className="dash-dot" /> Live data · Updates automatically as students apply and statuses change
      </div>
    </div>
  )
}