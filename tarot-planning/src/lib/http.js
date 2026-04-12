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
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    //當請求失敗時攔截response
    const authStore = useAuthStore()
    const original = err.config

    //如果本來是發refresh但失敗，就強制登出
    if (original.url?.includes('/api/auth/refresh')) {
      await authStore.logout(true)
      return Promise.reject(err)
    }

    //錯誤回401可能代表token到期，嘗試發refresh
    if (err.response?.status === 401 && !original.__isRetryRequest) {
      //在原請求標記以嘗試發過refresh，下次發原請求就不會再嘗試refresh
      original.__isRetryRequest = true

      try {
        const { data } = await apiClient.post(
          '/api/auth/refresh',
          {},
          {
            headers: { Authorization: `Bearer ${authStore.token}` },
          },
        )
        authStore.setToken(data.token)

        //成功後重新發原請求
        return apiClient(original)
      } catch (refreshErr) {
        //失敗強制登出
        await authStore.logout(true)
        return Promise.reject(refreshErr)
      }
    }
    return Promise.reject(err)
  },
)
