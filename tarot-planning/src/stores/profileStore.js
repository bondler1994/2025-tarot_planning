import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profileStore', () => {
  // fake data for testing
  const profile = ref({
    email: '15t@example.com',
    name: '邱蓋',
    password: 'Pass1234',
    gender: 'other',
    birthdate: '1990-05-15',
  })

  function updateProfile(data) {
    // 之後應該要改成從 API 回來的資料
    profile.value = {...profile.value, ...data}
  }

  return {
    profile,
    updateProfile
  }
})
