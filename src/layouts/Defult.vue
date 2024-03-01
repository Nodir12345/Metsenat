<template>
  <div>
    <header>
      <TheHeader />
    </header>

    <slot></slot>
  </div>
</template>

<script setup>
import TheNav from '@/components/TheNav.vue'
import TheHeader from '@/components/TheHeader.vue'
</script>
<style scoped></style>
