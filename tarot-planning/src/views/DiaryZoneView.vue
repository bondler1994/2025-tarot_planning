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
          <div class="card__body interpretation">
            <span class="interpretation__title">命運之輪</span>
            <div class="interpretation__body">
              從1970年代末到1980年代，盧卡斯出品了《星際大戰》三部曲。他曾説第一部星戰（第四部曲）的人物及故事是參照日本導演黑澤明的《戰國英豪》（隠し砦の三悪人）所創作而成；原三部曲以二戰英德大戰為架構並融入美國西部片及日本武士刀劇的節奏；藴涵了太空冒險、希臘神話的大視野製作。這部太空歌劇中所使用的特效技術重新定義並改變了往後太空科
            </div>
          </div>
        </div>
        <div class="log__body">
          <q-input id="textarea" v-model="text" filled type="textarea" maxlength="500" />
        </div>
      </div>
      <!-- footer -->
      <div class="diary__footer icon">
        <div class="icon__header"></div>
        <div class="icon__body">
          <img src="../../public/shareButton.png" alt="shareButton" />
        </div>
        <div class="icon__footer">
          <img src="../../public/pen.png" alt="pen" />
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
  justify-content: center;
  //   margin-top: 24px;
  width: 322px;
  height: 548px;
  background-color: gray;
  position: relative;

  &__body {
    width: inherit;
    padding: 24px;
  }

  &__footer {
    position: absolute;
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
  &__body {
  }
}

#textarea {
  height: 476px;
  overflow: hidden;
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
