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

  return {
    profile,
  }
})
