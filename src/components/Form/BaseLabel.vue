<template>
<label>
  {{ label }}
</label>
</template>

<script setup>

defineProps({
  label:{
    type:String,
    required: true,
  }
})

</script>
