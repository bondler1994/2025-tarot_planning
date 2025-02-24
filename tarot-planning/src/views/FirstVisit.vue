<script setup>
import { ref } from 'vue'
const carousel = ref(null)

const toNextSlide = () => {
  carousel.value.next()
}

const slide = ref('first')
const summaryFirstTop = '歡迎來到塔羅聊癒日記'
const summaryFirstBottom = '一個結合塔羅牌與日記的網站'
const summarySecondTop = '每天你可以抽一張塔羅牌'
const summarySecondBottom = '來代表你今天的運勢'
const summaryThirdTop = '並且可以撰寫你的心情日記'
const summaryThirdBottom = '時時刻刻可以回來瀏覽'
const summaryLast = '開始撰寫你的塔羅聊癒日記吧'
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
            transition-duration="800"
            swipeable
            animated
            control-color="yellow-5"
            navigation
            navigation-position="bottom"
            arrows="false"
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
          class=""
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
          @click="$router.push({ name: 'Draw' })"
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

  color: $blue-7;
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
  padding: 5px 24px;
}

:deep(.q-carousel__navigation.absolute) {
  bottom: -6px;
}
</style>
