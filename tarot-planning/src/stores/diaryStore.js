import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'

dayjs.extend(utc) // timezone 依賴 utc，順序不能反
dayjs.extend(timezone)

export const useDiaryStore = defineStore('diary', () => {
  const draftDiary = ref(JSON.parse(localStorage.getItem('draftDiary') || 'null'))
  const diaries = ref([])
  const todayDiary = ref({})

  const isDiaryValid = computed(() => {
    if (draftDiary.value) {
      return dayjs(draftDiary.value.created_at).isSame(dayjs(), 'd')
    } else {
      return false
    }
  })

  function setDiaryInfo(data) {
    draftDiary.value = { ...data }
    localStorage.setItem('draftDiary', JSON.stringify(data))
  }

  function clearDiary() {
    draftDiary.value = null
    localStorage.removeItem('draftDiary')
  }

  async function getDiary() {
    const data = await tarotDiaryAPI.GET('/api/auth/diaries/1')
    diaries.value = data.data.month_diaries
    const resTodayDiary = diaries.value.filter(
      (diary) => diary.created_at === dayjs().format('YYYY-MM-DD'),
    )[0]

    if (resTodayDiary) {
      const res = await tarotDiaryAPI.GET(`/api/auth/diaries/${resTodayDiary.id}`)
      todayDiary.value = { ...res.data, id: resTodayDiary.id }
    }
  }

  async function createDiary({ tarot_card: { tarot_id }, user_entry_text }) {
    const res = await tarotDiaryAPI.POST('/api/auth/diaries', {
      tarot_id,
      user_entry_text,
    })
  }

  async function updateDiary({ id, user_entry_text }) {
    const res = await tarotDiaryAPI.PUT(`/api/auth/diaries/${id}`, { user_entry_text })
  }
  return {
    draftDiary,
    isDiaryValid,
    diaries,
    setDiaryInfo,
    clearDiary,
    getDiary,
    todayDiary,
    createDiary,
    updateDiary,
  }
})
