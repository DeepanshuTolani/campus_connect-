import React from 'react'

export default function JobCard({ job, onApply, applying, alreadyApplied }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3>{job.title}</h3>
          <p className="job-company">{job.companyName}</p>
        </div>
        {job.eligibleForCurrentStudent ? (
          <span className="badge badge-eligible">Eligible</span>
        ) : (
          <span className="badge badge-not-eligible">Not Eligible</span>
        )}
      </div>

      <p className="job-description">{job.description}</p>

      <div className="job-meta">
        <span>📍 {job.location || 'Not specified'}</span>
        {job.packageLpa && <span>💰 {job.packageLpa} LPA</span>}
        {job.deadline && <span>⏳ Apply by {job.deadline}</span>}
      </div>

      <div className="job-criteria">
        <small>
          Min CGPA: {job.minCgpa ?? 'N/A'} | 10th: {job.minTenthPercentage ?? 'N/A'}% | 12th:{' '}
          {job.minTwelfthPercentage ?? 'N/A'}% | Branches: {job.eligibleBranches || 'All'}
        </small>
      </div>

      <div className="job-card-footer">
        {alreadyApplied ? (
          <button className="btn btn-outline" disabled>Already Applied</button>
        ) : (
          <button
            className="btn btn-primary"
            disabled={!job.eligibleForCurrentStudent || applying}
            onClick={() => onApply(job.id)}
            title={!job.eligibleForCurrentStudent ? "You don't meet the eligibility criteria" : ''}
          >
            {applying ? 'Applying...' : 'Apply Now'}
          </button>
        )}
      </div>
    </div>
  )
}
