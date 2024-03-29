<template>
  <div>
<div>defrgt</div>
    <div class="user_box">
      <div class="user_about">
        <h2>Homiy haqida</h2>
        <button><img :src="custumUser" alt="custumUser"> Tahrirlash</button>
      </div>
      <div class="user_title">
        <img :src="userLogo" alt="userLogo">
        <p>{{ user?.data.full_name }}</p>
      </div>
      <div class="user_end">
        <div>
          <p>telefon raqam</p>
          <h3>{{ user?.data.phone}}</h3>
        </div>
        <div>
          <p>Homiylik summasi</p>
          <h3>{{ user?.data.sum}} <span>UZS</span></h3>
        </div>
  
  
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import userLogo from '../assets/img/userLogo.png'
import custumUser from '../assets/img/custumUser.png'

const route = useRoute()
const user = ref()
const FeachUser = () => {
  const UserId = route.params.id
  axios(`https://metsenatclub.xn--h28h.uz/api/v1/sponsor-detail/${UserId}`).then(
    (res) => (user.value = res)
  )
}
onBeforeMount(() => {
  FeachUser()
})
</script>
<style lang="scss" scoped>
.user_box{
border: 1px solid rgb(235, 238, 252);
border-radius: 12px;
box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.03);
background-color: rgb(255, 255, 255);
width: 793px;
height: 259px;
margin: 40px auto;
}
</style>
