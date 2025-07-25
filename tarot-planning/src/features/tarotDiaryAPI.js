import axios from 'axios'
import { decodeExp } from './decodeJWT'
import dayjs from 'dayjs'
import router from '@/router'

const API_URL = 'https://api-tarotdiary.codeteches.com/'

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken')

    if (!token) return config

    const expirationTime = decodeExp(token)
    const remainingSecond = expirationTime.diff(dayjs(), 's')

    if (remainingSecond >= 60) {
      config.headers.Authorization = `Bearer ${token}`
    } else if (remainingSecond < 60) {
      const newToken = await refreshAccess(token)
      config.headers.Authorization = `Bearer ${newToken}`
    } else {
      throw new Error('Unknown error!')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const refreshClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

async function refreshAccess(oldToken) {
  try {
    const { data } = await refreshClient.post(
      '/api/auth/refresh',
      {},
      {
        headers: { Authorization: `Bearer ${oldToken}` },
      },
    )
    localStorage.setItem('accessToken', data.token)
    return data.token
  } catch (e) {
    localStorage.removeItem('accessToken')
    router.replace({ name: 'login' })
    throw e
  }
}

export default {
  async GET(url) {
    const res = await apiClient.get(url)
    return res.data
  },
  async POST(url, data) {
    const res = await apiClient.post(url, data)
    return res.data
  },
  async PUT(url, data) {
    const res = await apiClient.put(url, data)
    return res.data
  },
}
