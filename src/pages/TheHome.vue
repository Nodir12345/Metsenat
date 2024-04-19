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
</script>

<style scoped>
.container_home {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.main {
  background-color: #e3e3e3;
}
</style>
