<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import tarotAPI from '@/features/tarotDiaryAPI'
import { useCardStore } from '@/stores/cardDataStore'

const cardData = ref({})
const cardStore = useCardStore()

const fetchCardData = async () => {
  cardData.value = await tarotAPI.GET('/api/tarot-draw')
  cardStore.setCardData(cardData.value.tarot_card)
}

fetchCardData()

const isUpRight = computed(() => {
  return cardData.value.tarot_card?.is_upright ? '正位' : '逆位'
})

const router = useRouter()

const totalCards = 78
const cards = ref([])

const isDisabled = (isFlip) => {
  return isFlip ? 'none' : ''
}

let hintShow = ref(false)

let isDown = false
let startX
let scrollLeft
let isDragging = false

const handleMouseDown = (e) => {
  isDown = true
  startX = e.pageX - e.currentTarget.offsetLeft
  scrollLeft = e.currentTarget.scrollLeft
}

const handleMouseUp = () => {
  isDown = false
  setTimeout(() => {
    isDragging = false
  }, 50)
}

const hoverTarget = ref(null)

const scroll = (e) => {
  if (!isDown) return
  isDragging = true
  const x = e.pageX - e.currentTarget.offsetLeft
  const walk = x - startX
  e.currentTarget.scrollLeft = scrollLeft - walk

  if (e.touches && isExpanded.value === 3) {
    const position = e.targetTouches[0].pageY / window.outerHeight
    const targetCard = parseInt(78 * position)
    hoverTarget.value = targetCard
  }
}

const isChosen = ref(false)
const clickCard = async (id) => {
  if (isDragging) return
  const card = cards.value.find((card) => card.id === id)
  card.isChosen = true
  card.isFlip = !card.isFlip
  isChosen.value = true

  hoverTarget.value = null

  setTimeout(() => {
      hintShow.value = true
  }, 3000)
}

onMounted(() => {
  for (let i = 0; i < totalCards; i++) {
    cards.value.push({ id: i, isFlip: false, isChosen: false })
  }
})

const getRevolutionRotateDeg = (index) => {
  // const startDeg = 45
  // const endDeg = 135
  const startDeg = 80
  const endDeg = 100

  const range = endDeg - startDeg

  if (isExpanded.value === 1) {
    // return `rotate(60deg) translateY(-350px)`
    return `rotate(80deg) translateY(-2000px)`
  } else if (isExpanded.value >= 2) {
    // return `rotate(${startDeg + (range / 78) * index}deg) translateY(-350px)`
    return `rotate(${startDeg + (range / 78) * index}deg) translateY(-2000px)`
  } else {
    // return `rotate(45deg) translateY(-350px)`
    return `rotate(80deg) translateY(-2000px)`
  }
}

let isExpanded = ref(0)

const expandCards = () => {
  isExpanded.value = isExpanded.value + 1
  setTimeout(() => {
    isExpanded.value = isExpanded.value + 1
  }, 1000)

  setTimeout(() => {
    isExpanded.value = isExpanded.value + 1
  }, 2500)
}

const getTransition = (index) => {
  const count = 78
  const time = 1.5
  if (isExpanded.value >= 2) {
    return `transform ${(time / count) * index}s ease-out, scale 1s linear, translate 1s linear, opacity 0.5s linear`
  }
}


const opacityTransition = ref(false)
const toCreateDiary = () => {
  opacityTransition.value = true
  setTimeout(() => {
    router.push({ name: 'WriteDiary' })
  }, 2000)
}
</script>

<template>
  <main class="draw-background">
    <div
      class="cards"
      :class="{ 'card-hide': hintShow }"
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"
      @mouseleave="handleMouseUp"
      @touchend="handleMouseUp"
      @mouseup="handleMouseUp"
      @mousemove="scroll"
      @touchmove="scroll"
    >
      <div
        class="screen"
        @click.once="expandCards"
        :style="{ display: isExpanded < 3 ? 'inline-block' : 'none' }"
      ></div>
      <div>
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="card-container"
          :class="{
            step1: isExpanded === 0,
            step2: isExpanded === 1,
            step3: isExpanded >= 2,
            show: card.isFlip,
          }"
          :style="{
            pointerEvents: isDisabled(isChosen),
            transform: isExpanded >= 2 && !card.isFlip ? getRevolutionRotateDeg(index) : '',
            transition: card.isFlip ? '' : getTransition(index),
          }"
          @click="clickCard(card.id)"
        >
          <div class="card" :class="{ 'hover-effect': hoverTarget === index, flip: card.isFlip }">
            <div class="front" :class="{ reversed: !cardData.tarot_card?.is_upright }"></div>
            <div class="back"></div>
          </div>
        </div>
      </div>
    </div>
    <h3 class="draw-hint" :class="{ 'card-hide': hintShow }">
      請<br />點<br />擊<br />抽<br />牌<br />！
    </h3>
    <div
      class="tarot-hint"
      :style="{ zIndex: hintShow ? '1' : '-1', opacity: hintShow && !opacityTransition ? '1' : '0', transition: opacityTransition ? 'opacity 1s ease' : '' }"
    >
      <h4>{{ cardData.tarot_card?.name }} - {{ isUpRight }}</h4>
      <div class="hint-card"></div>
      <p>{{ cardData.tarot_card?.blessing_message }}</p>
      <q-btn @click="toCreateDiary" class="write-diary-btn">撰寫日記</q-btn>
    </div>
  </main>
  <!-- <pre>{{ cardData }}</pre> -->
</template>

<style scoped lang="scss">
@use '@/assets/sass/font.scss' as *;
@use '@/assets/sass/button.scss' as *;

.screen {
  width: 100%;
  height: 100%;
  // background-color: transparent;
  z-index: 2;
  position: absolute;
}

.draw-background {
  height: 100dvh;
  position: relative;
  overflow: hidden;
}
.cards {
  position: relative;
  width: 100%;
  height: 100dvh;
  touch-action: none;
}

.card-container {
  width: 120px;
  height: 200px;
  position: absolute;
  perspective: 500px;
  transition: all 1s ease;
  top: 50px;
  /* transform: rotate(90deg); */
  inset: 50% auto auto 50%;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.05s ease;
  transform-style: preserve-3d;
  position: relative;
  transform: rotate(0deg);
}

.front,
.back {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  backface-visibility: hidden;
}
.front {
  background-image: url(/front.png); //todo: 到時候換成API圖片網址
  transform: rotateY(180deg);
}

.front.reversed {
  background-image: url(/front.png); //todo: 到時候換成API圖片網址
  transform: rotateY(180deg) rotateZ(180deg);
}

.back {
  background-image: url(/back.png); //todo: 到時候換成API圖片網址
}

.card-container:hover .card:not(.flip) {
  transform: rotate(-5deg) translateY(-10px);
}

@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(900deg);
  }
}

.flip {
  // transform: rotateY(900deg); //在電腦版會被簡化成180deg
  rotate: y 540deg; //新語法，注意支援度
  transition: rotate 0.6s 2s ease-in-out;
  // animation: spin 2s ease forwards;
}

.draw-hint {
  font-size: $custom-h3;
  font-weight: $semi-bold;
  height: fit-content;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 57px;
  margin: auto;
  z-index: -1;
}

//step1 為停留在畫面中間
.step1 {
  transform: translate(-50%, -50%);
}

//step2 移動到坐上角等待展開
.step2 {
  // transform: rotate(45deg) translateY(-350px);
  // translate: -400px -100px;
  transform: rotate(80deg) translateY(-2000px);
  translate: -2170px -100px;
}

//step3 展開！rotate的角度及transition快慢皆由計算產生
.step3 {
  // translate: -400px -100px;
  translate: -2170px -100px;

  &:not(.show) .hover-effect {
    transform: rotate(-5deg) translateY(-100px);
  }
}

//展示卡牌
.show {
  translate: 0;
  transform: rotate(0deg) translate(-50%, -50%) scale(2.5);
  z-index: 1;

  transition: translate 1s, transform 1s 0.5s;
}

.hint-card {
  width: 64px;
  height: 128px;
  background-image: url(/front.png);
  background-size: cover;
}

.tarot-hint {
  width: 322px;
  // height: 472px;
  height: fit-content;
  border: 8px solid $blue-7;
  border-radius: 36px;
  position: absolute;
  background-color: $yellow-3;
  inset: 0;
  margin: auto;

  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;

  transition: all 2s 2s ease-out;

  h4 {
    margin: 0;
    white-space: nowrap;
    font-size: $custom-h4;
    font-weight: $semi-bold;
  }

  p {
    margin: 0;
  }
}

.write-diary-btn {
  @include button;
  background-color: $blue-5;
  color: $white;
  font-size: $custom-h4;
  font-weight: $semi-bold;
  width: fit-content;
  min-height: 0;
}

.card-hide {
  opacity: 0;
  transition: opacity 1s 0.5s ease;
}
</style>
