<template>
  <div>
<h2>table</h2>
<pre>{{ user?.data }}</pre>


  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

const route = useRoute()
const user = ref()
const FeachUser =()=>{
  const UserId = route.params.id
  axios(`https://metsenatclub.xn--h28h.uz/api/v1/sponsor-detail/${UserId}`).then(res=>user.value = res)
  
}
onBeforeMount(()=>{
  FeachUser()
})
</script>
<style lang="scss" scoped>

</style>