<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import html2canvas from 'html2canvas'

// import api from '@/features/tarotDiaryAPI.js'

// 設定時間
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

// 設定擷取時間得前段 前段＝日期 中斷＝T 後段＝時間
const todayString = computed(() => {
  return now.value.toISOString().split('T')
})

// 提供給解析用的fn，目前內容為假資料。因為沒有 id，所以用擷取日期得方式偵測最新得卡牌內容
const interpretations = ref([
  {
    created_at: '2024-05-05',
    user_entry_text: '今天遇到了一個挑戰，我學會了如何應對。',
    tarot_card: {
      image: 'https://example.com/card-image.jpg',
      name: '愚者',
      is_upright: 'true',
      blessing_message: '勇敢地踏出新的步伐，這是充滿可能性的時刻。',
    },
  },
  {
    created_at: new Date().toISOString().split('T')[0],
    user_entry_text: '今天學到了如何克服困難。',
    tarot_card: {
      image: 'https://example.com/another-card-image.jpg',
      name: '力量',
      is_upright: 'true',
      blessing_message: '面對挑戰時，保持冷靜和堅定。',
    },
  },
])

// 透過此段獲取API內容
const fetchInterpretation = async () => {
  try {
    // const response = api.GET('/api/diaries')
    interpretations.value = await interpretations.value.filter(
      (entry) => entry.created_at === todayString.value[0],
    )
  } catch (error) {
    console.error('獲取資料失敗', error)
    alert('無法載入')
  }
}

onMounted(fetchInterpretation)

//當api來時 判斷api內容之一得isUpright 如果是就正 如果不是就逆
const isUpright = computed(() => {
  return interpretations.value[0].tarot_card.is_upright === 'true' ? '正位' : '逆位'
})

// 編輯日誌專用
const isEditing = ref(false)
const tempEdtingLog = ref('')

const startEditing = () => {
  isEditing.value = true
  return tempEdtingLog.value === interpretations.value[0].user_entry_text
}

const cancelEditing = () => {
  isEditing.value = false
  return tempEdtingLog.value === interpretations.value[0].user_entry_text
}

const saveEditing = async () => {
  try {
    // cosnt response = await api.GET('null')
    interpretations.value[0].user_entry_text = tempEdtingLog.value
    isEditing.value = false
  } catch (error) {
    console.error('儲存失敗', error)
    alert('無法儲存')
  }
}

// 截圖專用
const isCapturing = ref(false)

const captureScreenshot = async () => {
  isCapturing.value = true

  await nextTick()

  // 只選擇 .diary__body 作為截圖範圍
  const targetElement = document.querySelector('.diary__body')

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
</script>

<template>
  <div class="container">
    <!-- date -->
    <div class="header date">
      <div class="date__header">{{ getYear }}</div>
      <div class="date__body">{{ `${getDate[0]} 月 ${getDate[1]} 日` }}</div>
      <div class="date__footer">{{ `(${getWeekday})` }}</div>
    </div>
    <!-- diary -->
    <div class="body diary">
      <!-- body -->
      <div class="diary__body log">
        <div class="log__header card">
          <div class="card__header"></div>
          <div
            class="card__body interpretation"
            v-for="(interpretation, index) in interpretations"
            :key="interpretation.id || index"
          >
            <span class="interpretation__title">{{
              `${interpretation.tarot_card.name} - ${isUpright}`
            }}</span>
            <div class="interpretation__body">
              {{ interpretation.tarot_card.blessing_message }}
            </div>
          </div>
        </div>
        <div class="log__body">
          <q-input
            v-if="isEditing"
            v-model="tempEdtingLog"
            class="textarea"
            input-class="white__text fixed-height"
            type="textarea"
            maxlength="300"
            color="white"
            borderless
            bg-color="transparent"
            resize="none"
            autogrow
            :rows="1"
            :dense="true"
          />
          <p v-else class="log__text">{{ interpretations[0].user_entry_text }}</p>
        </div>
      </div>
      <!-- footer -->
      <div class="diary__footer icon">
        <div class="icon__header"></div>
        <div class="icon__body">
          <img
            v-if="!isEditing"
            @click="captureScreenshot"
            src="../../public/shareButton.png"
            alt="shareButton"
          />
        </div>
        <div class="icon__footer">
          <img v-if="!isEditing" @click="startEditing" src="../../public/pen.png" alt="pen" />
        </div>
        <div v-if="isEditing" class="edit-actions">
          <q-btn label="取消" unelevated rounded @click="cancelEditing" color="grey" />
          <q-btn label="儲存" unelevated rounded @click="saveEditing" color="primary" />
        </div>
      </div>
    </div>
    <!-- backward -->
    <div class="footer backward">
      <router-link to="/member/diary/overview" class="backward__link">
        <div class="backward__header">
          <q-icon name="fa-solid fa-arrow-left" />
        </div>
        <div class="backward__body">
          <span>月曆一覽</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/font.scss';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 36px 0;
  gap: 24px;
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

.diary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  //   margin-top: 24px;
  // position: relative;

  &__body {
    width: 322px;
    height: inherit;

    background-color: gray;
    padding: 24px;
  }

  &__footer {
    // position: absolute;
    bottom: 0;
    height: 48px;
    width: 100%;
    bottom: 0;
    background-color: white;
  }

  //   icon
  .icon {
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__header,
    &__body > img,
    &__footer > img {
      width: 27px;
    }
  }
}
.log {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__text {
    word-break: break-all;
    color: #fff;
  }

  :deep(.white__text) {
    color: #fff;
  }
}

.textarea {
  height: 476px;
  overflow: hidden;
}

.edit-actions {
  display: flex;
  justify-content: space-between;
}

.card {
  display: flex;
  gap: 24px;
  &__header {
    background-image: url('../../public/front.png');
    background-size: 100% 100%; /* 讓圖片填滿 div，可能會裁切 */
    background-position: center; /* 置中顯示 */
    background-repeat: no-repeat; /* 不重複 */
    background-color: white;
    min-width: 64px;
    width: 64px;
    height: 128px;
  }
  &__body {
    height: 128px;
    // overflow: auto;
  }
}
.interpretation {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__title {
    white-space: 0;
    font-size: $custom-h4;
    color: #fff;
  }
  &__body {
    height: 107px;
    color: #fff;
    line-height: 1.6;
    overflow: auto;
  }
  &__body::-webkit-scrollbar {
    width: 3px; /* 垂直滾動條的寬度 */
    height: 1px; /* 水平滾動條的高度 */
  }

  /* 設定滾動條軌道（背景）的顏色 */
  &__body::-webkit-scrollbar-track {
    // background: #f1f1f1; /* 滾動條背景顏色 */
    border-radius: 10px; /* 讓軌道邊角圓滑 */
  }

  /* 設定滾動條的顏色 */
  &__body::-webkit-scrollbar-thumb {
    background: #ffffff; /* 滾動條的顏色 */
    border-radius: 10px; /* 讓滾動條邊角圓滑 */
  }

  /* 滾動條 thumb (按鈕) 在滑動時的顏色 */
  &__body::-webkit-scrollbar-thumb:hover {
    background: #5a2f2f; /* 滑鼠懸停時的顏色 */
  }
}

.backward {
  // font-size: ;
  &__link {
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: $custom-h6;
    // margin-top: 24px;
    width: 322px;
    height: 48px;
  }
  &__body {
    margin-left: 8px;
  }
}
</style>
