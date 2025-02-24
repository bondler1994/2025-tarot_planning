<script setup>
const emits = defineEmits(['update:disable'])
</script>

<template>
  <q-icon
    class="edit-btn"
    name="fa-solid fa-pen"
    size="24px"
    color="black"
    @click="emits('update:disable', false)"
  ></q-icon>
</template>

<style lang="scss" scoped>
.edit-btn {
  cursor: pointer;
}
</style>
