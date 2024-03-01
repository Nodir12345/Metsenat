<template>
  <main>
    <component :is="activeLayout">
      <RouterView />
    </component>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from './layouts/Auth.vue'
import DefultLayout from './layouts/Defult.vue'
const route = useRoute()

const layouts = {
  auth: AuthLayout,
  default: DefultLayout
}
const activeLayout = computed(() => {
  return layouts[route.meta.layout ?? 'default']
})
</script>
<style scoped></style>
