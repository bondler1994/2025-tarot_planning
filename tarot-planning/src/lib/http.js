import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const API_URL = 'https://api-tarotdiary.codeteches.com/'

export const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    const authStore = useAuthStore()
    await authStore.refreshIfNeeded()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const refreshClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
