import React, { useEffect, useState } from 'react'
import api from '../services/api'
import StatusBadge from '../components/StatusBadge'

const STAGES = ['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'SELECTED']

export default function MyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/applications/my')
      .then(({ data }) => setApplications(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loading">Loading applications...</div>

  return (
    <div className="page-container">
      <h1>My Applications</h1>
      {error && <div className="alert alert-error">{error}</div>}

      {applications.length === 0 ? (
        <p className="empty-state">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="application-card-header">
                <div>
                  <h3>{app.jobTitle}</h3>
                  <p className="job-company">{app.companyName}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>

              <div className="status-tracker">
                {STAGES.map((stage, idx) => {
                  const currentIdx = STAGES.indexOf(app.status)
                  const isRejected = app.status === 'REJECTED'
                  const isDone = !isRejected && currentIdx >= idx
                  return (
                    <React.Fragment key={stage}>
                      <div className={`tracker-step ${isDone ? 'tracker-step-done' : ''} ${isRejected ? 'tracker-step-rejected' : ''}`}>
                        <span className="tracker-dot" />
                        <span className="tracker-label">{stage}</span>
                      </div>
                      {idx < STAGES.length - 1 && <div className={`tracker-line ${isDone ? 'tracker-line-done' : ''}`} />}
                    </React.Fragment>
                  )
                })}
              </div>

              <p className="applied-date">
                Applied on {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
