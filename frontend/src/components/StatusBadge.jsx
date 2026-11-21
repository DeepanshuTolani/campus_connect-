import React from 'react'

const STATUS_STYLES = {
  APPLIED: 'badge badge-applied',
  SHORTLISTED: 'badge badge-shortlisted',
  INTERVIEW: 'badge badge-interview',
  SELECTED: 'badge badge-selected',
  REJECTED: 'badge badge-rejected',
}

export default function StatusBadge({ status }) {
  return <span className={STATUS_STYLES[status] || 'badge'}>{status}</span>
}
