<template>
  <div>
    <TheNav />

    <div class="main">
      <main class="container_home">
        <RouterView />
      </main>
    </div>
  </div>
</template>
<script setup>
import TheNav from '@/components/TheNav.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheApex from '@/components/TheApex.vue'
</script>

<style scoped>
.container_home {
  width: 1200px;
  margin: 0 auto;
}
.main {
  background-color: #e3e3e3;
}
</style>
