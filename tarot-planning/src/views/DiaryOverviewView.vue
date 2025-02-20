<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import addDays from 'date-fns/addDays'
import tarotDiaryAPI from '@/features/tarotDiaryAPI'

onBeforeMount(() => {
  fetchDairyData()
})
async function fetchDairyData() {
  try {
    // const res = await tarotDiaryAPI.GET('/api/diaries/{diaryId}?cursor={cursor}')
    // console.log('res,', res)
    // dairyData.value = res
    dairyData.value = fakeDairyData.value
  } catch (error) {
    console.log(error)
  }
}
const dairyData = ref([])
// 先弄假資料
const fakeDairyData = ref([
  {
    created_at: '2025-02-01',
    user_entry_text: '今天遇到了一個挑戰，我學會了如何應對。',
    tarot_card: {
      image: 'https://example.com/card-image.jpg',
      name: '愚者',
      is_upright: 'true',
      blessing_message: '勇敢地踏出新的步伐，這是充滿可能性的時刻。',
    },
  },
  {
    created_at: '2025-02-02',
    user_entry_text: '今天學到了如何克服困難。',
    tarot_card: {
      image: 'https://example.com/another-card-image.jpg',
      name: '力量',
      is_upright: 'false',
      blessing_message: '面對挑戰時，保持冷靜和堅定。',
    },
  },
])

// const date = ref(new Date())
const dateNames = ref(['日', '一', '二', '三', '四', '五', '六'])
const minDate = ref(new Date(2024, 4, 5))
const markers = ref([
  {
    date: addDays(new Date('2025-02-01'), 0),
    type: 'dot',
  },
  {
    date: addDays(new Date('2025-02-02'), 0),
    type: 'dot',
  },
])
const backToToday = reactive({
  text: '回到今天',
  setter: () => {
    selectedDate.value = new Date()
  },
})

const selectedDate = ref(new Date())
const lastMonth = ref(selectedDate.value.getMonth().toString().padStart(2, '0'))
const nextMonth = ref((selectedDate.value.getMonth() + 2).toString().padStart(2, '0'))

const userSelectedData = reactive({})
const handleDate = (modelData) => {
  selectedDate.value = modelData
  const selectedDateFormat = selectedDate.value.toISOString().split('T')[0]
  userSelectedData.value = dairyData.value.find((item) => item.created_at === selectedDateFormat)
  if (userSelectedData.value == undefined) return
}

// TODO: 月份變動時
const handleMonthYear = ({ instance, month, year }) => {
  // month 是當前月份 0 是 1 月，11 是 12 月
  if (month === 0) {
    lastMonth.value = '12'
    nextMonth.value = '02'
  } else {
    lastMonth.value = month.toString().padStart(2, '0') // 轉成 "01"-"12"
    nextMonth.value = ((month + 2) % 12 || 12).toString().padStart(2, '0')
  }
}
</script>
<template>
  <div class="daily-overview column full-width">
    <VueDatePicker
      class="full-width vue-date-picker"
      v-model="selectedDate"
      @update:model-value="handleDate"
      :inline="{ input: false }"
      auto-apply
      :min-date="minDate"
      :max-date="new Date()"
      :enable-time-picker="false"
      month-name-format="long"
      locale="zh-Hant"
      :action-row="{ showNow: true }"
      :day-names="dateNames"
      week-start="0"
      :markers="markers"
      disable-year-select
      @update-month-year="handleMonthYear"
    >
      <template #arrow-left>
        <img class="slot-icon" src="@/images/arrow-left.png" />
        <span>{{ lastMonth }}月</span>
      </template>
      <template #arrow-right>
        <span>{{ nextMonth }}月</span>
        <img class="slot-icon" src="@/images/arrow-right.png" />
      </template>
    </VueDatePicker>

    <div class="daily-tarot row q-pa-sm">
      <div class="col-4 q-mx-auto">
        <div class="daily-tarot-img-box">
          <img
            class="full-width full-height"
            :src="userSelectedData.value?.tarot_card.image"
            :alt="userSelectedData.value?.tarot_card.name"
          />
        </div>
      </div>
      <div class="col-8">
        <p>{{ userSelectedData.value?.tarot_card.name }}</p>
        <span>{{ userSelectedData.value?.tarot_card.blessing_message }}</span>
      </div>
    </div>
    <router-link class="text-center" to="">閱讀今天日記</router-link>
    <a class="q-mt-custom24 full-width text-center" @click="backToToday.setter">{{
      backToToday.text
    }}</a>
  </div>
</template>

<style lang="scss">
@import '@/assets/sass/font.scss';

:root {
  --dp-border-radius: 0;
  --dp-cell-border-radius: 50%;
  --dp-marker-color: red;
  --dp-row-margin: 0px;
  --dp-month-year-row-button-size: 63px;
  --dp-cell-size: 48px;
  --dp-font-family: 'Inter', serif;
}
.dp__calendar_header {
  gap: 4px;
}
.dp__calendar_header_item {
  background: red;
}
.dp__calendar_row {
  gap: 4px;
}
.dp__month_year_wrap.dp__year_disable_select {
  justify-content: center;
  align-items: center;
  font-size: $custom-h2;
  word-break: keep-all;
}
.dp__inner_nav {
  span {
    flex-grow: 1;
  }
}
.dp__menu_inner .dp__calendar {
  font-size: $custom-h4;
}
.dp__calendar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dp__calendar_header_separator {
  display: none;
}

.daily-overview {
  width: 372px;
}
.daily-tarot-img-box {
  width: 64px;
  height: 128px;
  border-radius: 8px;
}
.slot-icon {
  width: 15.8px;
}
</style>
