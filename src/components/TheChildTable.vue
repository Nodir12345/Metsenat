<template>
  <div>
    <pre class="space">.</pre>
    <div class="user_box">
      <div class="user_about">
        <h2>Homiy haqida</h2>
        <button><img :src="custumUser" alt="custumUser" /> Tahrirlash</button>
      </div>
      <div class="user_title">
        <img :src="userLogo" alt="userLogo" />
        <p>{{ user?.data.full_name.slice(0, 30) }}</p>
      </div>
      <div class="user_end">
        <div>
          <p>telefon raqam</p>
          <h3>{{ user?.data.phone }}</h3>
        </div>
        <div>
          <p>Homiylik summasi</p>
          <h3>{{ user?.data.sum }} <span>UZS</span></h3>
        </div>
      </div>
    </div>
    <div class="userBack"></div>
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




  //  window.location.reload();
</script>
<style lang="scss" scoped>
.user_box {
  border: 1px solid rgb(235, 238, 252);
  border-radius: 12px;
  box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.03);
  background-color: rgb(255, 255, 255);
  width: 793px;
  height: 259px;
  margin: 40px auto;
  padding: 32px;
  padding-top: 24px !important;
}
.user_about {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > h2 {
    color: rgb(40, 41, 61);
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0%;
  }
  > button {
    border-radius: 5px;
    background: rgb(237, 241, 253);
    padding: 8px 32px 8px 32px;
    color: rgb(51, 101, 252);
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    gap: 8px;
    display: flex;
    align-items: center;
  }
}

.user_title {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 24px 0;
  > p {
    color: rgb(33, 33, 33);
    font-size: 16px;
    font-weight: 500;
    line-height: 130%;
    letter-spacing: -1%;
    max-width: 163px;
  }
}

.user_end {
  display: flex;
  align-items: center;
  gap: 220px;
  div {
    max-width: 170px;
    > p {
      color: rgb(181, 181, 195);
      font-family: Rubik;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      letter-spacing: 1.13px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    > h3 {
      color: rgb(33, 33, 33);
      font-size: 16px;
      font-weight: 500;
      line-height: 130%;
      letter-spacing: -1%;
      > span {
        color: rgb(33, 33, 33);
        font-size: 16px;
        font-weight: 500;
        line-height: 130%;
        letter-spacing: -1%;
      }
    }
  }
}

.space {
  opacity: 0;
}

.userBack{
background-image: url("../assets/img/userBack.png");
background-repeat: no-repeat;
width: 820px;
height: 400px;
margin: 0 auto;

}
</style>
