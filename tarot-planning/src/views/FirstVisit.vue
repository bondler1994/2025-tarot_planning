<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const slide = ref('first')
const carousel = ref(null)

const summaryFirstTop = '歡迎來到塔羅聊癒日記'
const summaryFirstBottom = '一個結合塔羅牌與日記的網站'
const summarySecondTop = '每天你可以抽一張塔羅牌'
const summarySecondBottom = '來代表你今天的運勢'
const summaryThirdTop = '並且可以撰寫你的心情日記'
const summaryThirdBottom = '時時刻刻可以回來瀏覽'
const summaryLast = '開始撰寫你的塔羅聊癒日記吧'

const toNextSlide = () => {
  carousel.value.next()
}

const updateNavigation = () => {
  // 找出所有navigation的點
  if (carousel.value && carousel.value.$el) {
    const navDots = carousel.value.$el.querySelectorAll('.q-carousel__navigation-icon')
    const activeIndex = ['first', 'second', 'third', 'last'].indexOf(slide.value)

    // 重置所有navigation的點
    navDots.forEach((dot, index) => {
      dot.style.width = '16px'
      dot.style.height = '16px'
      dot.style.borderRadius = '50%'
      dot.style.backgroundColor = 'rgba(253, 241, 196, 1)'
      dot.style.opacity = '1'

      // 設置當前的navigation的點
      if (index === activeIndex) {
        dot.style.width = '40px'
        dot.style.height = '16px'
        dot.style.borderRadius = '8px'
        dot.style.backgroundColor = 'rgba(250, 214, 137, 1)'
      }
    })
  }
}

// carousel變化時更新navigation
watch(() => slide.value, updateNavigation)

onMounted(async () => {
  await nextTick()
  setTimeout(updateNavigation, 0)
})
</script>

<template>
  <div class="first-visit-container">
    <main class="introduce-container">
      <div class="text-center">
        <h1 class="title">塔羅聊癒日記</h1>
      </div>
      <!-- carousel -->
      <div>
        <div class="q-gutter-md">
          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            transition-duration="1200"
            swipeable
            animated
            control-color="yellow-5"
            navigation
            navigation-position="bottom"
            height="340px"
            class="custom-carousel bg-transparent text-white rounded-borders"
            ref="carousel"
          >
            <q-carousel-slide name="first" class="carousel__slide column no-wrap">
              <q-card class="content-card">
                <img src="https://cdn.quasar.dev/img/parallax1.jpg" />

                <q-card-section class="bg-grey-2 text-black text-center">
                  {{ summaryFirstTop }}<br />{{ summaryFirstBottom }}
                </q-card-section>
              </q-card>
            </q-carousel-slide>
            <q-carousel-slide name="second" class="carousel__slide column no-wrap">
              <q-card class="content-card">
                <img src="https://cdn.quasar.dev/img/parallax2.jpg" />

                <q-card-section class="bg-grey-2 text-black text-center">
                  {{ summarySecondTop }}<br />{{ summarySecondBottom }}
                </q-card-section>
              </q-card>
            </q-carousel-slide>
            <q-carousel-slide name="third" class="carousel__slide column no-wrap">
              <q-card class="content-card">
                <img src="https://cdn.quasar.dev/img/parallax1.jpg" />

                <q-card-section class="bg-grey-2 text-black text-center">
                  {{ summaryThirdTop }}<br />{{ summaryThirdBottom }}
                </q-card-section>
              </q-card>
            </q-carousel-slide>
            <q-carousel-slide name="last" class="carousel__slide column no-wrap">
              <q-card class="content-card">
                <img src="https://cdn.quasar.dev/img/parallax2.jpg" />

                <q-card-section class="bg-grey-2 text-black text-center">
                  {{ summaryLast }}
                </q-card-section>
              </q-card>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
      <div class="button-container">
        <q-btn
          v-if="slide !== 'last'"
          unelevated
          rounded
          no-caps
          color="blue-5"
          label="Next"
          dense
          @click="toNextSlide"
        />
        <q-btn
          v-else
          unelevated
          rounded
          color="blue-5"
          label="抽牌"
          dense
          @click="router.push({ name: 'Draw' })"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/font.scss' as *;
@use '@/assets/sass/_base.scss' as *;

.first-visit-container {
  padding: 123px 40px;

  background-color: $blue-2;
}
.introduce-container {
  background-color: $yellow-1;

  border: 8px solid $blue-7;
  border-radius: 36px;

  padding: 32px 33px;
  margin: 0 auto;

  max-width: 322px;
}
.title {
  font-size: $custom-h1;
  font-weight: $semi-bold;
  white-space: nowrap;
  line-height: 1;
  color: $blue-7;

  margin: 0 0 36px 0;
}

.q-carousel {
  display: flex;
  justify-content: center;

  &__slide {
    padding: 0;
  }
}

.content-card {
  width: 100%;
  max-width: 240px;

  border-radius: 16px;
}

.q-card__section {
  min-height: 72px;
  line-height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  height: 100%;
}

.rounded-borders {
  border-radius: 16px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.q-btn {
  font-size: $custom-h4;
  padding: 3px 20px;
}

:deep(.q-carousel__navigation.absolute) {
  bottom: 3px;
}

:deep(.q-carousel__navigation .q-carousel__navigation-icon) {
  font-size: 0 !important; /* 防止 Quasar 預設覆蓋 */
  transition: all 0.3s ease;
}
</style>
