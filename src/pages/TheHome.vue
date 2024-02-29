<template>
  <div>
    <header>
      <TheHeader />
    </header>
    <main class="container_home">
      <TheNav />
      <h1>home</h1>
      <RouterLink to="/table">Table</RouterLink>

      <TheApex></TheApex>
    </main>
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
</style>
