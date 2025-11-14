import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' })

// attach token automatically
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const fetchNotes = (params) => API.get('/notes', { params }).then(r => r.data)
export const createNote = (note) => API.post('/notes', note).then(r => r.data)
export const updateNote = (id, note) => API.put(`/notes/${id}`, note).then(r => r.data)
export const deleteNote = (id) => API.delete(`/notes/${id}`).then(r => r.data)
export const login = (payload) => API.post('/auth/login', payload).then(r => r.data)
export const signup = (payload) => API.post('/auth/signup', payload).then(r => r.data)
export default API
