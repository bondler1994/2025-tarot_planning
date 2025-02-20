<script setup>
import { ref, computed } from 'vue'

const now = ref(new Date())

const getYear = computed(() => {
  return now.value.getFullYear()
})

const getDate = computed(() => {
  const options = { month: '2-digit', day: '2-digit' }
  return now.value.toLocaleDateString('zh-TW', options).split('/')
})

const getWeekday = computed(() => {
  const options = { weekday: 'short' }
  return now.value.toLocaleDateString('zh-TW', options)[1]
})
</script>

<template>
  <div class="container">
    <div class="header date">
      <div class="date__header">{{ getYear }}</div>
      <div class="date__body">{{ `${getDate[0]} 月 ${getDate[1]} 日` }}</div>
      <div class="date__footer">{{ `(${getWeekday})` }}</div>
    </div>
    <div class="body draw">
      <q-btn class="draw__header" unelevated rounded color="primary" label="本日抽牌" />

      <div class="draw__body"></div>
    </div>
    <div class="footer backward">
      <div class="backward__header">
        <q-icon name="fa-solid fa-arrow-left" />
      </div>
      <div class="backward__body">
        <span>月曆一覽</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/font.scss';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 36px 0 36px 0;
}

.date {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 322px;
  height: 40px;

  &__body {
    margin: 0 14px;
    font-size: $custom-h2;
  }

  &__header,
  &__footer {
    font-size: $custom-h6;
  }
}

.draw {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  width: 322px;
  height: 548px;
  background-color: gray;
  position: relative;

  &__header {
    width: 96px;
    position: absolute;
    bottom: 96px;
  }

  &__body {
    position: absolute;
    bottom: 0;
    height: 48px;
    width: 100%;
    bottom: 0;
    background-color: white;
  }
}

.backward {
  // font-size: ;
  font-size: $custom-h6;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 24px;
  width: 322px;
  height: 48px;
  &__body {
    margin-left: 8px;
  }
}
</style>
