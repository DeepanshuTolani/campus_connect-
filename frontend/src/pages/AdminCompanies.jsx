import React, { useEffect, useState } from 'react'
import api from '../services/api'

const emptyForm = { id: null, name: '', description: '', website: '', industry: '' }

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchCompanies = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/companies')
      setCompanies(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCompanies() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('Company name is required'); return }
    setSaving(true)
    setError('')
    try {
      if (form.id) {
        await api.put(`/admin/companies/${form.id}`, form)
      } else {
        await api.post('/admin/companies', form)
      }
      setForm(emptyForm)
      await fetchCompanies()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (company) => setForm(company)

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this company? All its jobs will also be removed.')) return
    try {
      await api.delete(`/admin/companies/${id}`)
      await fetchCompanies()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-container">
      <h1>Manage Companies</h1>

      <form className="card form-card" onSubmit={handleSubmit}>
        <h3>{form.id ? 'Edit Company' : 'Add New Company'}</h3>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="form-grid">
          <div>
            <label>Company Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Cognizant" />
          </div>
          <div>
            <label>Industry</label>
            <input name="industry" value={form.industry} onChange={handleChange} placeholder="IT Services" />
          </div>
          <div>
            <label>Website</label>
            <input name="website" value={form.website} onChange={handleChange} placeholder="https://cognizant.com" />
          </div>
        </div>
        <label>Description</label>
        <textarea name="description" rows={2} value={form.description} onChange={handleChange} />

        <div className="form-actions">
          <button className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : form.id ? 'Update Company' : 'Add Company'}
          </button>
          {form.id && (
            <button type="button" className="btn btn-outline" onClick={() => setForm(emptyForm)}>Cancel</button>
          )}
        </div>
      </form>

      <h2>All Companies</h2>
      {loading ? (
        <div className="page-loading">Loading...</div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Industry</th><th>Website</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.industry}</td>
                  <td>{c.website}</td>
                  <td className="table-actions">
                    <button className="btn btn-small btn-outline" onClick={() => handleEdit(c)}>Edit</button>
                    <button className="btn btn-small btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
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
