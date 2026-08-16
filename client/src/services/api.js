// Base URL adapts to VITE_API_URL in production or defaults to relative /api for proxy / same-domain routing
const apiBase = import.meta.env.VITE_API_URL 
  ? (import.meta.env.VITE_API_URL.endsWith('/api') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/api`)
  : '/api';

export const api = axios.create({
  baseURL: apiBase,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: inject token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pkestate_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pkestate_token')
    }
    return Promise.reject(error)
  }
)

// ─── Property API ─────────────────────────────────────────────────────────
export const propertyApi = {
  getAll: (params) => api.get('/properties', { params }),
  getFeatured: () => api.get('/properties/featured'),
  getById: (id) => api.get(`/properties/${id}`),
  getStats: () => api.get('/properties/stats'),
  create: (data) => api.post('/properties', data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`),
}

// ─── Agent API ────────────────────────────────────────────────────────────
export const agentApi = {
  getAll: () => api.get('/agents'),
  getById: (id) => api.get(`/agents/${id}`),
}

// ─── Inquiry API ──────────────────────────────────────────────────────────
export const inquiryApi = {
  create: (data) => api.post('/inquiries', data),
  getAll: (params) => api.get('/inquiries', { params }),
  markAsRead: (id) => api.patch(`/inquiries/${id}/read`),
  delete: (id) => api.delete(`/inquiries/${id}`),
}

// ─── Auth API ─────────────────────────────────────────────────────────────
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  me: () => api.get('/auth/me'),
}
