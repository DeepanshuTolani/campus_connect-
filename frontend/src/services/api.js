import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: BASE_URL,
})

// Attach JWT to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cc_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Central error unwrapping so components can just read err.message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong'

    if (error.response?.status === 401 || error.response?.status === 403) {
      // token missing/expired/invalid -> force re-login
      const isAuthCall = error.config?.url?.includes('/auth/')
      if (!isAuthCall) {
        localStorage.removeItem('cc_token')
        localStorage.removeItem('cc_user')
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(new Error(message))
  }
)

export default api
