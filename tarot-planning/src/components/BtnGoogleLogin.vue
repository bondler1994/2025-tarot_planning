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
  <QBtn padding="md" no-caps @click="loginGoogle">
    <QIcon left size="1.5em" name="fa-brands fa-google"></QIcon>
    <div>使用 Google 帳戶登入</div>
  </QBtn>
</template>

<style></style>
