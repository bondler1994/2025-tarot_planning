<script setup>
import { ref, computed, onMounted } from 'vue'
import { screenshotAndDownload } from '@/utils/screenshot'

//截圖
const isCapturing = ref(false)

const captureScreenshot = async () => {
  isCapturing.value = true

  try{
    await screenshotAndDownload('.easter-egg', 'egg-share')
  } catch (e) {
    alert('截圖失敗\n' + e)
  }

  isCapturing.value = false
}

//api
const statistics = ref(null)

const fakeApiResponse = {
  status: 'success',
  data: {
    message: '查詢成功',
    accumulated_days: 15,
    encouragement_message:
      '恭喜你累積撰寫了 15 天日記！最近是不是感覺自己變得更加自信呢？繼續保持！',
  },
}

// 透過此段獲取API內容
const fetchStatistics = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    statistics.value = fakeApiResponse
  } catch (error) {
    console.error('獲取資料失敗', error)
    alert('無法載入')
  }
}

onMounted(fetchStatistics)
</script>

<template>
  <div class="container">
    <!-- <div class="header"></div> -->
    <div class="container__body easter-egg">
      <div class="easter-egg__header">{{}}</div>
      <div v-if="statistics" class="easter-egg__body">
        <span>{{ statistics.data.encouragement_message }}</span>
      </div>
    </div>
    <div class="container__footer">
      <q-btn class="shareButton" unelevated label="分享" rounded @click="captureScreenshot"></q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/font.scss';

.container {
  margin: 36px 0 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.easter-egg {
  &__header,
  &__body {
    width: 322px;
    height: 300px;
  }

  &__header {
    background-color: gray;
  }
  &__body {
    background-color: white;
    display: flex;
    align-items: center;
    padding: 49px;
    text-align: justify;
    line-height: 1.6;
  }
}

.shareButton {
  width: 98px;
  height: 40px;
  background-color: #495057;
  color: white;
}
</style>
