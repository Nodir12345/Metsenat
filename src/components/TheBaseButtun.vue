<template>
  <button
    class="flex items-center gap-2.5 rounded-[5px] px-8 py-[9px]"
    :class="buttonStyle.wrapper"
  >
    <slot name="icon"> </slot>
    <slot>
      <span class="font-medium text-sm leading-[24px]" :class="buttonStyle.text">
        {{ text }}
      </span>
    </slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Button'
  },
  variant: {
    type: String,
    default: 'primary'
  }
})

const wrapperStyle = {
  primary: 'bg-blue',
  secondary: 'bg-[#EDF1FD]'
}

const textStyle = {
  primary: 'text-white',
  secondary: 'text-blue'
}
const buttonStyle = computed(() => ({
  wrapper: wrapperStyle[props.variant],
  text: textStyle[props.variant]
}))
</script>

<style lang="scss" scoped></style>
