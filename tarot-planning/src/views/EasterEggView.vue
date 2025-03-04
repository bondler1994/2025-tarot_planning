<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import html2canvas from 'html2canvas'

//截圖
const isCapturing = ref(false)

const captureScreenshot = async () => {
  isCapturing.value = true

  await nextTick()

  // 只選擇 .shareButton 作為截圖範圍
  const targetElement = document.querySelector('.easter-egg')

  if (targetElement) {
    const canvas = await html2canvas(targetElement)
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
    const date = new Date()
    const file = new File(
      [blob],
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.png`,
      { type: 'image/png' },
    )

    const isDesktop = !/Mobi|Android/i.test(navigator.userAgent)

    if (isDesktop) {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_tarot`
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: '今日塔羅',
          text: '來看看我今天抽到了什麼吧！',
          files: [file],
        })
        console.log('分享成功！')
      } else {
        console.error('不支援分享此類型的內容')
      }
    }
  } else {
    console.error('.diary__body 元素未找到')
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
