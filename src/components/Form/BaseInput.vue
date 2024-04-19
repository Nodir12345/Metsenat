<template>
  <div class="border border-[#E0E7ff] px-4 py-3 rounded-md flex items-center">
    <slot name="prefix"></slot>
    <input
      v-model="value"
      type="text"
      placeholder="parol"
      class="focus:outline-none w-full rounded-md text-[#2E384D] text-[15px]"
    />
    <span class="inline-block">
      <slot name="suffix" @click="hide"></slot>
    </span>
  </div>
</template>

<script setup>
import { defineModel } from 'vue'
const value = defineModel({ default: '' })

console.log(value.value)
</script>
