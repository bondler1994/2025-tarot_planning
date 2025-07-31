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
    if (!draftDiary.value.createAt) {
      return false
    } else {
      return dayjs(draftDiary.value.createAt).isSame(dayjs(), 'd')
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
    const todayId = diaries.value.filter(diary => diary.created_at === dayjs().format('YYYY-MM-DD'))[0].id
    const res =  await tarotDiaryAPI.GET(`/api/auth/diaries/${todayId}`)
    todayDiary.value = res.data
  }

  return { draftDiary, isDiaryValid, setDiaryInfo, clearDiary, getDiary, todayDiary }
})
