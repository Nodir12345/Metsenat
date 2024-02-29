<template>
  <div>
    <header>
      <TheHeader />
    </header>
    <main class="container_table">
      <TheNav />
      <h1>Table</h1>
      <RouterLink to="/Home">Home</RouterLink>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import TheNav from '@/components/TheNav.vue'
import TheHeader from '@/components/TheHeader.vue'
</script>

<style scoped>
.container_table {
  width: 1200px;
  margin: 0 auto;
}
.nav_filter {
  display: flex;
  align-items: center;
  gap: 20px;
}
.filter_btn {
  border-radius: 5px;
  background-color: rgb(237, 241, 253);
  color: rgb(51, 101, 252);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.35px;
  padding: 8px 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.filter_btn:hover {
  background-color: var(--third-color);
  transition-duration: 500ms;
}
.nav_filter_input {
  border-radius: 5px;
  background: rgb(232, 232, 232);
  padding: 12px 0;
  border: none;
  padding-left: 38px;
  width: 284px;
}

.nav_filter_input::placeholder {
  color: rgb(177, 177, 184);
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0px;
}
.nav_filter_form {
  position: relative;
}

.nav_filter_img {
  position: absolute;
  top: 8px;
  left: 10px;
}

.Nav_checked {
  display: block;
  cursor: pointer;
}

.Nav_checked input {
  display: none;
  cursor: pointer;
}
.checkmark {
  color: rgba(51, 102, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: 1.13px;
  text-align: center;
  text-transform: uppercase;
  border: 2px solid rgb(224, 231, 255);
  border-radius: 6px;
  background: rgb(255, 255, 255);
  padding: 12px 54px;
  cursor: pointer;
}

.Nav_checked:hover input ~ .checkmark {
  background-color: #ccc;
}

.Nav_checked input:checked ~ .checkmark {
  color: rgb(255, 255, 255);
  background-color: var(--main-color);
  transition-duration: 500ms;
}

.Nav_box {
  display: flex;
  align-items: center;
}

nav {
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
