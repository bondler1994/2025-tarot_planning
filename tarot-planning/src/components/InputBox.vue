<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="input-box">
    <div class="input-box__label">
      <p class="q-mb-sm">{{ props.title }}</p>
    </div>
    <div class="input__body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-box {
  &__label {
  }

  &__body {
  }
}
</style>
