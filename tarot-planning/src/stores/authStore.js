import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { decodeExp } from '@/features/decodeJWT'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { apiClient } from '@/lib/http'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(localStorage.getItem('accessToken') || null)

  const router = useRouter()

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('accessToken', newToken)
  }

  function removeToken() {
    token.value = null
    localStorage.removeItem('accessToken')
  }

  async function logout(force = false) {
    try {
      if (!force) {
        await apiClient.post(
          '/api/auth/refresh',
          {},
          {
            headers: { Authorization: `Bearer ${token.value}` },
          },
        )
      }
    } catch (e) {
      throw new Error(e)
    } finally {
      removeToken()
      router.push({ name: 'login' })
    }
  }

  return { token, isAuthenticated, setToken, removeToken, logout }
})
