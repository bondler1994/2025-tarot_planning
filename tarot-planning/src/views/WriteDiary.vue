<script setup>
import { ref, computed } from 'vue'
import { useCardStore } from '@/stores/cardDataStore'
// import html2canvas from 'html2canvas'
// import { nextTick } from 'vue'

const cardStore = useCardStore()

const isUpRight = computed(() => {
  return cardStore.cardData.is_upright ? '正位' : '逆位'
})

const text = ref('')

const isCapturing = ref(false)

const register = ref(false)

const captureScreenshot = async () => {
  // isCapturing.value = true

  // await nextTick()

  // const canvas = await html2canvas(document.querySelector('.diary-block'))
  // const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  // const date = new Date()
  // const file = new File(
  //   [blob],
  //   `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.png`,
  //   { type: 'image/png' },
  // )

  // const isDesktop = !/Mobi|Android/i.test(navigator.userAgent)

  // try {
  //   if (isDesktop) {
  //     const url = URL.createObjectURL(blob)
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.download = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_tarot`
  //     link.style.display = 'none'
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //     URL.revokeObjectURL(url)
  //   } else {
  //     if (navigator.canShare && navigator.canShare({ files: [file] })) {
  //       await navigator.share({
  //         title: '今日塔羅',
  //         text: '來看看我今天抽到了什麼吧！',
  //         files: [file],
  //       })
  //       console.log('分享成功！')
  //     } else {
  //       console.error('不支援分享此類型的內容')
  //     }
  //   }
  // } catch(error) {
  //   console.log(error)
  // }

  // isCapturing.value = false
  //todo: 流程預設是不給分享，直接跳出註冊會員

  register.value = true
}
</script>

<template>
  <div class="layout">
    <main>
      <div class="diary-block">
        <div class="card">
          <div class="card__img" :class="cardStore.cardData.is_upright ? '' : 'reversed'">
            <img src="/front.png" alt="" />
            <!-- todo: 到時候換成API圖片網址 -->
          </div>
          <div class="card__info info">
            <h4 class="info__title">{{ cardStore.cardData.name }} - {{ isUpRight }}</h4>
            <p class="info__content">{{ cardStore.cardData.blessing_message }}</p>
          </div>
        </div>
        <div class="diary">
          <div class="q-pa-md">
            <p v-if="isCapturing" class="fake-content">{{ text ? text : '以下空白' }}</p>
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
              label-color="white"
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
    <q-dialog v-model="register">
      <div class="register">
        <p class="register__content">
          不想遺漏你的日記嗎？<br />加入會員就可以每天瀏覽過去的日記，更可以跟大家分享你每天的生活喔！
        </p>
        <div class="register__button">
          <q-btn class="btn" color="blue-5" @click="$router.push({ name: 'register' })"
            ><h4>加入會員</h4></q-btn
          >
          <q-btn class="btn" color="grey-2" v-close-popup><h4>取消</h4></q-btn>
        </div>
      </div>
    </q-dialog>
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
    flex: 0 1 64px;

    &.reversed {
      transform: rotate(180deg);
    }

    img {
      width: 100%;
    }
  }

  &__info {
    flex: 1 1 60%;

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
    min-height: 52px;
    margin: 2.5px 0 2.5px;
    word-break: break-word;
    white-space: pre-wrap;
  }
}

.save-btn {
  @include button;

  h4 {
    margin: 0;
    font-size: $custom-h4;
    font-weight: $semi-bold;
  }
}

.register {
  width: 272px;
  padding: 33px 28px 16px;
  background-color: $blue-2;
  border: 8px solid $blue-7;
  border-radius: 16px;
  text-align: center;

  &__content {
    font-size: $custom-h6;
    line-height: 24px;
    margin: 0 0 50px;
  }

  &__button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .btn {
      @include button;

      padding: 0;
      width: 128px;
      height: 40px;

      h4 {
        font-size: $custom-h4;
        font-weight: $semi-bold;
        margin: 0;
      }
    }
  }
}
</style>
