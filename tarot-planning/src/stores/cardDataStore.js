import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import tarotAPI from '@/features/tarotDiaryAPI'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc) // timezone 依賴 utc，順序不能反
dayjs.extend(timezone)

export const useCardStore = defineStore('card', () => {
  const cardData = ref(JSON.parse(localStorage.getItem('cardData') || null))
  const isCardValid = computed(() => {
    if (cardData.value) {
      return dayjs(cardData.value.create_at).isSame(dayjs(), 'd')
    } else {
      return false
    }
  })

  function setCardData(data) {
    cardData.value = { ...data }
  }

  async function fetchCardData() {
    const res = await tarotAPI.GET('/api/tarot/draw')
    const now = dayjs().valueOf()
    setCardData({ ...res.data, create_at: now })
  }

  return { cardData, isCardValid, setCardData, fetchCardData }
})
