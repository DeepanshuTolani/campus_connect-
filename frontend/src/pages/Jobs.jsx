import React, { useEffect, useState, useCallback } from 'react'
import api from '../services/api'
import JobCard from '../components/JobCard'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [myApplications, setMyApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applyingId, setApplyingId] = useState(null)

  const [filters, setFilters] = useState({ keyword: '', location: '', minPackage: '', onlyEligible: false })

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (filters.keyword) params.keyword = filters.keyword
      if (filters.location) params.location = filters.location
      if (filters.minPackage) params.minPackage = filters.minPackage
      if (filters.onlyEligible) params.onlyEligible = true

      const [jobsRes, appsRes] = await Promise.all([
        api.get('/jobs', { params }),
        api.get('/applications/my'),
      ])
      setJobs(jobsRes.data)
      setMyApplications(appsRes.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => { fetchJobs() }, [fetchJobs])

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  const handleApply = async (jobId) => {
    setApplyingId(jobId)
    setError('')
    try {
      await api.post(`/applications/apply/${jobId}`)
      await fetchJobs()
    } catch (err) {
      setError(err.message)
    } finally {
      setApplyingId(null)
    }
  }

  const appliedJobIds = new Set(myApplications.map((a) => a.jobId))

  return (
    <div className="page-container">
      <h1>Browse Jobs</h1>

      <form className="filter-bar" onSubmit={handleSearch}>
        <input name="keyword" placeholder="Search by title or company" value={filters.keyword} onChange={handleFilterChange} />
        <input name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} />
        <input name="minPackage" type="number" placeholder="Min package (LPA)" value={filters.minPackage} onChange={handleFilterChange} />
        <label className="checkbox-label">
          <input type="checkbox" name="onlyEligible" checked={filters.onlyEligible} onChange={handleFilterChange} />
          Only show jobs I'm eligible for
        </label>
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="page-loading">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <p className="empty-state">No jobs match your filters right now.</p>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              applying={applyingId === job.id}
              alreadyApplied={appliedJobIds.has(job.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
