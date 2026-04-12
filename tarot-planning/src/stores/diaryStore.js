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
  const todayDiary = ref(null)

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
    const { data } = await tarotDiaryAPI.GET('/api/auth/diaries/1')
    diaries.value = data.month_diaries
    //diaries中只有每天日記的摘要，並沒有內容，所以這邊取得今天日記的摘要
    const todayDiarySummary = diaries.value.find(
      (diary) => diary.created_at === dayjs().format('YYYY-MM-DD'),
    )

    //如果有找到今天的摘要，就用今天的id去打今天的詳細日記，沒有就維持null
    if (todayDiarySummary) {
      const { data } = await tarotDiaryAPI.GET(`/api/auth/diaries/${todayDiarySummary.id}`)
      todayDiary.value = { ...data, id: todayDiarySummary.id }
    } else {
      todayDiary.value = null
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
    todayDiary,
    setDiaryInfo,
    clearDiary,
    getDiary,
    createDiary,
    updateDiary,
  }
})
