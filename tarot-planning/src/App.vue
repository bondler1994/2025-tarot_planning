<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <QLayout view="hHh lpr fff">
    <QPageContainer>
      <QPage padding>
        <RouterView />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<style scoped></style>
