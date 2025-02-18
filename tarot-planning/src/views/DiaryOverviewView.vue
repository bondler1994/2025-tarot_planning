<script setup>
import { reactive, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import addDays from 'date-fns/addDays'

const date = ref(new Date())
const dateNames = ref(['日', '一', '二', '三', '四', '五', '六'])
const minDate = ref(new Date(2024, 11, 14))
const markers = ref([
  {
    date: addDays(new Date('2025-02-01'), 0),
    type: 'dot',
  },
])
const backToToday = reactive({
  text: '回到今天',
  setter: () => {
    date.value = new Date()
  },
})
</script>
<template>
  <div class="daily-overview">
    <VueDatePicker
      v-model="date"
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
    />
    <div></div>
    <button @click="backToToday.setter">{{ backToToday.text }}</button>
  </div>
</template>

<style lang="scss">
  :root {
    --dp-border-radius: 0;
    --dp-cell-border-radius: 50%;
    --dp-marker-color: red;
    --dp-row-margin: 0px;
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

</style>
