import { defineStore } from 'pinia'
import { ref } from 'vue'
import tarotAPI from '@/features/tarotDiaryAPI'

export const useCardStore = defineStore('card', () => {
  const cardData = ref({})

  async function fetchCardDate() {
    const res = await tarotAPI.GET('/api/tarot/draw')
    console.log(res)
    cardData.value = res.data
  }

  return { cardData, fetchCardDate }
})
