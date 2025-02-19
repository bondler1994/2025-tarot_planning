<script setup>
// import {ref, reactive} from "vue"
</script>

<template>
  <div class="container">
    <div class="header date">
      <div class="date__header"></div>
      <div class="date__body"></div>
      <div class="date__footer"></div>
    </div>
    <div class="body draw">
      <q-btn class="draw__header" unelevated rounded color="primary" label="本日抽牌" />

      <div class="draw__body">S</div>
    </div>
    <div class="footer backward">
      <div class="backward__header">
        <q-icon name="fa-solid fa-arrow-left" />
      </div>
      <div class="backward__body">
        <span>月曆一覽</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 36px 0 36px 0;
}

.date {
  width: 322px;
  height: 40px;
  background-color: aqua;
}

.draw {
  margin: 24px;
  width: 322px;
  height: 548px;
  background-color: gray;
  position: relative;

  &__header {
    width: 96px;
  }

  &__body {
    position: absolute;
    bottom: 0;
    height: 48px;
    width: 100%;
    bottom: 0;
    background-color: white;
  }
}

.backward {
  // font-size: ;
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  width: 322px;
  height: 48px;
  background-color: aqua;
  &__body {
    margin-left: 8px;
  }
}
</style>
