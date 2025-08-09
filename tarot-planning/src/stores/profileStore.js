import { defineStore } from 'pinia'
import { ref } from 'vue'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'

export const useProfileStore = defineStore('profileStore', () => {
  // fake data for testing
  const profile = ref(null)

  async function getProfile() {
    const { data } = await tarotDiaryAPI.GET('/api/user/me')
    setProfile(data)
  }

  function setProfile({ email, name, gender, birth_date }) {
    profile.value = {
      email,
      name,
      gender,
      birth_date,
    }
  }

  async function updateProfile(payload) {
    const { data } = await tarotDiaryAPI.PUT('/api/user/update', payload)
    setProfile(data)
  }

  function clearProfile() {
    profile.value = null
  }

  return {
    profile,
    getProfile,
    setProfile,
    updateProfile,
    clearProfile,
  }
})
