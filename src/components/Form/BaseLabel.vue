<template>
  <label class="text-xs font-semibold leading-[14px] uppercase mb-2 mt-[22px]">
    {{ label }}
  </label>
</template>
<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>
