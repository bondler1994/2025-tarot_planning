import { defineStore } from 'pinia'
import { ref } from 'vue'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'

export const useProfileStore = defineStore('profileStore', () => {
  // fake data for testing
  const profile = ref(JSON.parse(localStorage.getItem('profile') || null))

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

    localStorage.setItem('profile', JSON.stringify(profile.value))
  }

  async function updateProfile(data) {
    const res = await tarotDiaryAPI.PUT('/api/user/update', data)
    setProfile(res.data)
  }

  function clearProfile() {
    localStorage.removeItem('profile')
  }

  return {
    profile,
    getProfile,
    setProfile,
    updateProfile,
    clearProfile,
  }
})
