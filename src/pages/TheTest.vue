<template>
  <div>
    <h2>test</h2>

    <TestChild :prop="prop"> </TestChild>
  </div>
</template>

<script setup>
import TestChild from '@/components/TheTestingChild.vue'
import { ref } from 'vue'
const prop = ref({})
fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => (prop.value = json))
console.log(prop.value)
</script>

<style lang="scss" scoped></style>
