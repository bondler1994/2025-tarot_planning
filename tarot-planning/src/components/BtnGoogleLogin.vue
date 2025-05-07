<script setup>
import tarotDiaryAPI from '@/features/tarotDiaryAPI'

async function loginGoogle() {
  try {
    const res = await tarotDiaryAPI.GET('/api/oauth/google/redirect')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <q-btn class="btn" color="grey-7" no-caps unelevated @click="loginGoogle">
    <q-icon class="btn__icon" left size="24px" name="fa-brands fa-google"></q-icon>
    <div class="btn__text">以google帳號建立新會員</div>
  </q-btn>
</template>

<style lang="scss" scoped>
@use '@/assets/sass/font.scss';

.btn {
  width: 243px;
  height: 40px;
  border-radius: 24px;

  &__text {
    font-size: 15px;
  }
}

:deep(.btn.q-btn:before) {
  box-shadow: none;
}

:deep(.btn__icon.on-left) {
  margin-right: 10px;
}
</style>
