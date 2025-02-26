<script setup>
const props = defineProps({
  signStatus: {
    type: String,
    required: true,
    validator(value) {
      return ['pending', 'checked', 'error'].includes(value)
    },
  },
})
</script>

<template>
  <div v-if="signStatus === 'pending'" class="valid-sign"></div>
  <q-icon
    v-else-if="signStatus === 'checked'"
    name="check_circle"
    size="24px"
    color="positive"
  ></q-icon>
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
