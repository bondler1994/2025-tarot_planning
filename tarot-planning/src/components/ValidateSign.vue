<script setup>
const props = defineProps({
  isStartValidate: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div v-if="!isStartValidate" class="valid-sign"></div>
  <q-icon v-else-if="!hasError" name="check_circle" size="24px" color="positive"></q-icon>
  <q-icon v-else name="highlight_off" size="24px" color="negative"></q-icon>
</template>

<style lang="scss" scoped>
.valid-sign {
  width: 24px;
  height: 24px;
  background-color: $white;
  border-radius: 50%;
}
</style>
