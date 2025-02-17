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
  <q-btn padding="md" no-caps @click="loginGoogle">
    <q-icon left size="1.5em" name="fa-brands fa-google"></q-icon>
    <div>使用 Google 帳戶登入</div>
  </q-btn>
</template>

<style></style>
