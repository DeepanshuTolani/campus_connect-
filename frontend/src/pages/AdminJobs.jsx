import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const emptyForm = {
  id: null, companyId: '', title: '', description: '', location: '', packageLpa: '',
  minCgpa: '', minTenthPercentage: '', minTwelfthPercentage: '', eligibleBranches: '', deadline: '', active: true,
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState([])
  const [companies, setCompanies] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [jobsRes, companiesRes] = await Promise.all([
        api.get('/admin/jobs'),
        api.get('/admin/companies'),
      ])
      setJobs(jobsRes.data)
      setCompanies(companiesRes.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.companyId) { setError('Please select a company'); return }
    if (!form.title.trim()) { setError('Job title is required'); return }

    setSaving(true)
    setError('')
    try {
      const payload = {
        ...form,
        companyId: parseInt(form.companyId, 10),
        packageLpa: form.packageLpa ? parseFloat(form.packageLpa) : null,
        minCgpa: form.minCgpa ? parseFloat(form.minCgpa) : null,
        minTenthPercentage: form.minTenthPercentage ? parseFloat(form.minTenthPercentage) : null,
        minTwelfthPercentage: form.minTwelfthPercentage ? parseFloat(form.minTwelfthPercentage) : null,
        deadline: form.deadline || null,
      }
      if (form.id) {
        await api.put(`/admin/jobs/${form.id}`, payload)
      } else {
        await api.post('/admin/jobs', payload)
      }
      setForm(emptyForm)
      await fetchAll()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (job) => setForm({ ...job, companyId: job.companyId, deadline: job.deadline || '' })

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job posting?')) return
    try {
      await api.delete(`/admin/jobs/${id}`)
      await fetchAll()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-container">
      <h1>Manage Job Openings</h1>

      <form className="card form-card" onSubmit={handleSubmit}>
        <h3>{form.id ? 'Edit Job' : 'Post New Job'}</h3>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-grid">
          <div>
            <label>Company</label>
            <select name="companyId" value={form.companyId} onChange={handleChange}>
              <option value="">Select company</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label>Job Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Software Engineer" />
          </div>
          <div>
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Bangalore" />
          </div>
          <div>
            <label>Package (LPA)</label>
            <input type="number" step="0.1" name="packageLpa" value={form.packageLpa} onChange={handleChange} placeholder="6.5" />
          </div>
          <div>
            <label>Application Deadline</label>
            <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
          </div>
          <div>
            <label>Min CGPA</label>
            <input type="number" step="0.01" name="minCgpa" value={form.minCgpa} onChange={handleChange} placeholder="7.0" />
          </div>
          <div>
            <label>Min 10th %</label>
            <input type="number" step="0.01" name="minTenthPercentage" value={form.minTenthPercentage} onChange={handleChange} placeholder="80" />
          </div>
          <div>
            <label>Min 12th %</label>
            <input type="number" step="0.01" name="minTwelfthPercentage" value={form.minTwelfthPercentage} onChange={handleChange} placeholder="80" />
          </div>
          <div>
            <label>Eligible Branches (comma separated, blank = all)</label>
            <input name="eligibleBranches" value={form.eligibleBranches} onChange={handleChange} placeholder="CSE, IT, AIML" />
          </div>
        </div>

        <label>Job Description</label>
        <textarea name="description" rows={3} value={form.description} onChange={handleChange} />

        <label className="checkbox-label">
          <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
          Active (accepting applications)
        </label>

        <div className="form-actions">
          <button className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update Job' : 'Post Job'}
          </button>
          {form.id && (
            <button type="button" className="btn btn-outline" onClick={() => setForm(emptyForm)}>Cancel</button>
          )}
        </div>
      </form>

      <h2>All Jobs</h2>
      {loading ? (
        <div className="page-loading">Loading...</div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Title</th><th>Company</th><th>Package</th><th>Status</th><th>Applicants</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td>{j.title}</td>
                  <td>{j.companyName}</td>
                  <td>{j.packageLpa ? `${j.packageLpa} LPA` : '-'}</td>
                  <td>{j.active ? 'Active' : 'Closed'}</td>
                  <td><Link to={`/admin/jobs/${j.id}/applicants`}>{j.applicantCount} applicants</Link></td>
                  <td className="table-actions">
                    <button className="btn btn-small btn-outline" onClick={() => handleEdit(j)}>Edit</button>
                    <button className="btn btn-small btn-danger" onClick={() => handleDelete(j.id)}>Delete</button>
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
