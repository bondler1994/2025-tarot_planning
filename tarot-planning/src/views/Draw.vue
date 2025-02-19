<script setup>
import { ref, onMounted } from 'vue'

const totalCards = 78
const cards = ref([])
const chosenCount = ref(0)

const isDisabled = (isFlip) => {
  return isFlip ? 'none' : ''
}

const clickCard = (id) => {
  if (isDragging) return
  const card = cards.value.find((card) => card.id === id)
  if (!card.isChosen) {
    card.isChosen = true
    card.isFlip = !card.isFlip
  } else {
    card.isFlip = !card.isFlip
  }
}

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

const scroll = (e) => {
  if (!isDown) return
  isDragging = true
  const x = e.pageX - e.currentTarget.offsetLeft
  const walk = x - startX
  e.currentTarget.scrollLeft = scrollLeft - walk
}

const pathRef = ref(null)
const points = ref([])

onMounted(() => {
  if (pathRef.value) {
    const path = pathRef.value
    const totalLength = path.getTotalLength()

    // 取得 78 個等距點
    points.value = Array.from({ length: 78 }, (_, i) => {
      const point = path.getPointAtLength((i / 77) * totalLength)
      return { x: point.x, y: point.y }
    })
  }
  for (let i = 0; i < totalCards; i++) {
    cards.value.push({ id: i, isFlip: false, isChosen: false, choseOrder: 0 })
  }
})

const getRevolutionRotateDeg = ({ isChosen }, index) => {
  const startDeg = 45
  const endDeg = 135

  const range = endDeg - startDeg
  if (isChosen) {
    // return `rotate(${startDeg + (range / 78) * index}deg) translateY(-100px)`
    return `rotate(${startDeg + (range / 78) * index}deg)  translateY(-400px)`
    // return `${startDeg + (range / 78) * index}deg`
  }

  if (isExpanded.value === 1) {
    // return `rotate(${startDeg + (range / 78) * index}deg)`
    // return `rotate(45deg) translateY(-350px)`
    return `rotate(45deg) translateY(-350px)`
    // return `${startDeg + (range / 78) * index}deg`
  } else if (isExpanded.value === 2) {
    // return `rotate(${startDeg + (range / 78) * index}deg)`
    return `rotate(${startDeg + (range / 78) * index}deg) translateY(-350px)`
    // return `${startDeg + (range / 78) * index}deg`
  } else {
    // return `60deg`
    return `rotate(45deg) translateY(-350px)`
  }
}

let isExpanded = ref(0)

const expandCards = () => {
  if(isExpanded.value > 2) {
    isExpanded.value = 0
  }
  isExpanded.value = isExpanded.value + 1
  setTimeout(() => {
    isExpanded.value = isExpanded.value + 1
  }, 1000)
}

const getTransition = (index) => {
  const count = 78
  const time = 1.5
  if (isExpanded.value === 2) {
    return `transform ${(time / count) * index}s ease-out, scale 1s linear, translate 1s linear`
  }
}
</script>

<template>
  <main class="draw-background">
    <div
      class="cards"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseUp"
      @mouseup="handleMouseUp"
      @mousemove="scroll"
    >
      <button @click="expandCards" style="width: 100px; height: 50px" :style="{ display: isExpanded === 1 ? 'none' : 'inline-block'}">Expand</button>
      <div>
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          class="card-container origin"
          :class="{ step1: isExpanded === 0, step2: isExpanded === 1, step3: isExpanded === 2, show: card.isFlip }"
          :style="{
            pointerEvents: isDisabled(card.isFlip),
            transform: isExpanded === 2 && !card.isFlip ? getRevolutionRotateDeg(card, index) : '',
            transition: card.isFlip ? '' : getTransition(index),
          }"
          @click="clickCard(card.id)"
        >
          <div class="card" :class="{ flip: card.isFlip }">
            <div class="front" :class="{ reversed: true}"></div>
            <div class="back"></div>
          </div>
        </div>
      </div>

      <!-- <svg width="200" height="500">
        <path ref="pathRef" d="M 0 0 C 100 100 100 400 0 500" fill="transparent" stroke="black"/>
      </svg>
      <div
        v-for="card in cards" 
        :key="card.id"
        class="card-container"
        :class="{ chosen: card.isChosen }"
        :style="{
          top: getPathPositionY(card),
          left: getPathPositionX(card),
          pointerEvents: isDisabled(card.isFlip),
          transform: card.isChosen ? '' : getRotateDeg(card)
        }"
        @click="clickCard(card.id)"
      >
      
        <div class="card" :class="{ flip: card.isFlip }">
          <div class="front"></div>
          <div class="back"></div>
        </div>
      </div> -->

      <!-- <div
        v-for="card in cards" 
        :key="card.id"
        class="card-container"
        :class="{ chosen: card.isChosen }"
        :style="{
          top: getPosition(card),
          pointerEvents: isDisabled(card.isFlip),
          transform: !card.isChosen ? getRotateDeg(card): ''
        }"
        @click="clickCard(card.id)"
      >
      
        <div class="card" :class="{ flip: card.isFlip }">
          <div class="front"></div>
          <div class="back"></div>
        </div>
      </div> -->
    </div>
    <h3 class="draw-hint">請<br />點<br />擊<br />抽<br />牌<br />！</h3>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/sass/font.scss';

.draw-background {
  background: linear-gradient(90deg, #dee2e6 0%, #dee2e6 50%, white 50%, white 100%);
  height: 100vh;
  position: relative;
}

.cards {
  position: relative;
  width: 100%;
  height: 100vh;
}

.card-container {
  width: 100px;
  height: 160px;
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
  background-image: url(/front.png);
  transform: rotateY(180deg);
}

.front.reversed {
  background-image: url(/front.png);
  transform: rotateY(180deg) rotateZ(180deg);
}

.back {
  background-image: url(/back.png);
}

.card-container:not(.chosen):hover .card:not(.flip) {
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
  transition: rotate 0.5s 2s ease-in-out;
  // animation: spin 2s ease forwards;

}

.chosen {
  // transform: translateX(200px);
  transition: all 1s ease;
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
}

//step1 為停留在畫面中間
.step1 {
  transform: translate(-50%, -50%);
}

//step2 移動到坐上角等待展開
.step2 {
  transform: rotate(45deg) translateY(-350px);
  translate: -400px -100px;
}

//step3 展開！rotate的角度及transition快慢皆由計算產生
.step3 {
  translate: -400px -100px;
}

//展示卡牌
.show {
  transform: rotate(0deg) translate(-50%, -50%) scale(2.5);
  // translate: 0 0;
  // margin: auto;
  translate: 0;
  z-index: 1;
  // inset: 0;
}
</style>
