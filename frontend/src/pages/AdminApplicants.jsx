import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import StatusBadge from '../components/StatusBadge'

const STATUS_OPTIONS = ['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED']

export default function AdminApplicants() {
  const { jobId } = useParams()
  const [applicants, setApplicants] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchApplicants = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/admin/applications/job/${jobId}`)
      setApplicants(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchApplicants() }, [jobId])

  const handleStatusChange = async (applicationId, status) => {
    setUpdatingId(applicationId)
    try {
      await api.put(`/admin/applications/${applicationId}/status`, { status })
      await fetchApplicants()
    } catch (err) {
      setError(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="page-container">
      <Link to="/admin/jobs">&larr; Back to Jobs</Link>
      <h1>Applicants</h1>
      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="page-loading">Loading...</div>
      ) : applicants.length === 0 ? (
        <p className="empty-state">No one has applied to this job yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Student</th><th>Email</th><th>CGPA</th><th>Current Status</th><th>Update Status</th></tr>
            </thead>
            <tbody>
              {applicants.map((a) => (
                <tr key={a.id}>
                  <td>{a.studentName}</td>
                  <td>{a.studentEmail}</td>
                  <td>{a.studentCgpa ?? '-'}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td>
                    <select
                      value={a.status}
                      disabled={updatingId === a.id}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
