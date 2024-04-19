<template>
  <div
    class="border border-[#E0E7ff] px-4 py-3 rounded-md flex items-center bg-[#rgba(224, 231, 255, 0.2)]"
  >
    <slot name="prefix"></slot>
    <input
      v-model="displayedValue"
      type="text"
      placeholder="parol"
      class="focus:outline-none w-full rounded-md text-[#2E384D] text-[15px] bg-inherit"
    />
    <span class="inline-block" @click="toggleValue">
      <slot name="suffix"></slot>
    </span>
  </div>
</template>

<script setup>
import { defineModel, ref, watch } from 'vue'

const displayedValue = ref()
let isHidden = false
let originalValue = ref('')

watch(displayedValue, (newValue, oldValue) => {
  console.log('Input qiymati:', oldValue)
  originalValue.value = oldValue
})

function toggleValue() {
  isHidden = !isHidden
  displayedValue.value = isHidden ? '****' : originalValue.value
}
</script>
