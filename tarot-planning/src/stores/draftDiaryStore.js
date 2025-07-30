import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc) // timezone 依賴 utc，順序不能反
dayjs.extend(timezone)

export const useDraftDiaryStore = defineStore('diary', () => {
  const diaryInfo = ref(null)

  const isDiaryValid = computed(() => {
    if (!diaryInfo.value.createAt) {
      return false
    } else {
      return dayjs(diaryInfo.value.createAt).isSame(dayjs(), 'd')
    }
  })

  function setDiaryInfo(data) {
    diaryInfo.value = { ...data }
    localStorage.setItem('diaryInfo', JSON.stringify(data))
  }

  function clearDiary() {
    diaryInfo.value = null
    localStorage.removeItem('diaryInfo')
  }

  return { diaryInfo, isDiaryValid, setDiaryInfo, clearDiary }
})
