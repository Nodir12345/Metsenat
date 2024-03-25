<template>
  <div>
    <h1>TestingChild</h1>
    <div>{{ prop }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  prop: {
    type: Object
  }
})

console.log(props.prop)
</script>

<style lang="scss" scoped>
/* Your styles here */
</style>
