<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import html2canvas from 'html2canvas'
</script>

<template>
  <div class="container">
    <!-- <div class="header"></div> -->
    <div class="container__body easter-egg">
      <div class="easter-egg__header">{{}}</div>
      <div class="easter-egg__body">{{}}</div>
    </div>
    <div class="container__footer">
      <q-btn label="分享" rounded @click="captureScreenshot" class="shareButton"></q-btn>
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
  }
}
</style>
