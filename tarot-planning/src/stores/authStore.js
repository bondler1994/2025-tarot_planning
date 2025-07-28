import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { decodeExp } from '@/features/decodeJWT'
import { ref, computed } from 'vue'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(localStorage.getItem('accessToken') || null)

  const isAuthenticated = computed(() => {
    return !!token.value && dayjs().isBefore(dayjs(decodeExp(token.value)))
  })

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('accessToken', newToken)
  }

  async function refreshIfNeeded() {
    if (!token.value) return
    const remainingSecond = dayjs(decodeExp(token.value)).diff(dayjs(), 's')

    if (remainingSecond < 60) {
      try {
        const newToken = await tarotDiaryAPI.refreshAccess(token.value)
        setToken(newToken)
        return
      } catch (e) {
        removeToken()
        return
      }
    }
  }

  function removeToken() {
    token.value = null
    localStorage.removeItem('accessToken')
  }

  async function logout() {
    await tarotDiaryAPI.POST('/api/auth/logout')
    removeToken()
  }

  return { token, isAuthenticated, setToken, refreshIfNeeded, logout }
})
