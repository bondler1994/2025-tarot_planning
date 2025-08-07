import { ref } from 'vue'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'
import dayjs from 'dayjs'

export function useUserProfile() {
  const isLoading = ref(false)
  const error = ref(null)
  const profile = ref({
    name: '',
    email: '',
    birth_date: '',
    gender: '',
  })

  async function fetchProfile() {
    isLoading.value = true
    error.value = null

    try {
      const { data } = await tarotDiaryAPI.GET('/api/user/me')
      profile.value = {
        name: data.name || '',
        email: data.email || '',
        birth_date: formatBirthday(data.birth_date),
        gender: data.gender || '',
      }
    } catch (err) {
      error.value = err.message || '無法取得使用者資料'
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(payload) {
    const { data } = await tarotDiaryAPI.PUT('/api/user/update', payload)
    profile.value = {
      name: data.name || '',
      email: data.email || '',
      birth_date: formatBirthday(data.birth_date),
      gender: data.gender || '',
    }
  }

  function formatBirthday(birthday) {
    return birthday ? dayjs(birthday).format('YYYY-MM-DD') : ''
  }

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  }
}
