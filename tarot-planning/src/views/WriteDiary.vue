<script setup>
import { ref, nextTick } from 'vue'
import html2canvas from 'html2canvas'

const text = ref('')

const isCapturing = ref(false)
const isSharing = ref(false)

const captureScreenshot = async () => {
  isCapturing.value = true

  await nextTick()

  const canvas = await html2canvas(document.querySelector('.diary-block'))
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
    link.download = 'aaa'
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

  isCapturing.value = false
}
</script>

<template>
  <div class="layout">
    <main>
      <div class="diary-block">
        <div class="card">
          <div class="card__img">
            <img src="/front.png" alt="" />
          </div>
          <div class="card__info info">
            <h4 class="info__title">命運之輪 - 正位</h4>
            <p class="info__content">雞湯文字雞湯文字雞湯文字雞湯文字</p>
          </div>
        </div>
        <div class="diary">
          <div class="q-pa-md">
            <p v-if="isCapturing" class="fake-content">{{ text }}</p>
            <q-input
              v-else
              class="textarea"
              type="textarea"
              input-class="my-textarea"
              v-model="text"
              placeholder="寫下自己今天的心情吧！"
              :filled="false"
              borderless
              autogrow
              maxlength="300"
            />
          </div>
        </div>
      </div>
      <div class="">
        <q-btn @click="captureScreenshot" class="save-btn" color="blue-5"
          ><h4>儲存並分享 ></h4></q-btn
        >
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/font.scss' as *;
@use '@/assets/sass/button.scss' as *;

.layout {
  height: 100dvh;
  position: relative;
  background-color: $blue-2;
}

main {
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}
.diary-block {
  width: 322px;
  border: 8px solid $blue-7;
  border-radius: 16px;
  margin: auto;
  background-color: $yellow-1;
  overflow: hidden;
}

.card {
  box-sizing: border-box;
  display: flex;
  gap: 16px;
  padding: 8px 16px;
  background-color: $yellow-3;

  &__img {
    flex: 1 1 40%;

    img {
      width: 100%;
    }
  }

  &__info {
    h4,
    p {
      margin: 0;
    }

    h4 {
      font-size: $custom-h4;
      font-weight: $semi-bold;
    }

    p {
      margin-top: 8px;
    }
  }
}

.diary {
  .textarea {
    font-size: $custom-h6;
    font-weight: 400;
  }

  :deep(.my-textarea) {
    resize: none;
    padding: 0;
  }

  .fake-content {
    font-size: $custom-h6;
    line-height: 18px;
    font-weight: 400;
    letter-spacing: 0.00937em;
    margin: 0;
  }
}

.save-btn {
  margin: auto;
  @include button;

  h4 {
    margin: 0;
    font-size: $custom-h4;
    font-weight: $semi-bold;
  }
}
</style>
