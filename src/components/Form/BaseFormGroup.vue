<template>
  <div class="flex flex-col gap mb-[22px]">
    <BaseLabelVue v-bind="{ label }" />
    <slot />
  </div>
</template>

<script setup>
import BaseLabelVue from './BaseLabel.vue'

defineProps({
  label: {
    type: String,
    requred: true
  }
})
</script>

<style lang="scss" scoped></style>
