<template>
  <div class="login_container">
    <img :src="loginLogo" alt="filter" />
    <form @submit.prevent="onSubmit" class="login_box">
      <h2 class="login_start">Kirish</h2>
      <div class="login_form">
        <label class="login_text" for="login">login</label>
        <input
          required
          minlength="6"
          placeholder="adm8904"
          class="login_input"
          type="text"
          id="login"
        />
      </div>
      <div class="login_form">
        <label class="login_text" for="password">parol</label>
        <input
          required
          minlength="6"
          placeholder="◉◉◉◉◉◉"
          class="login_input"
          type="password"
          id="password"
        />
      </div>
      <button type="submit" class="login_btn">Kirish</button>
    </form>
  </div>
</template>

<script setup>
import loginLogo from '../assets/img/loginMainLogo.png'
import { useRouter } from 'vue-router'
const router = useRouter()
const onSubmit = () => {
  router.push('/home')
}
</script>

<style scoped>
.login_box {
  border: 1px solid rgb(235, 238, 252);
  border-radius: 12px;
  box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.03);
  background: rgb(255, 255, 255);
  padding: 32px;
  margin-top: 48px;
}

.login_start {
  color: rgb(40, 41, 61);
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0%;
}
.login_text {
  color: rgb(29, 29, 31);
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  text-transform: uppercase;
  margin-top: 44px;
  margin-bottom: 8px;
}
.login_input {
  box-sizing: border-box;
  border: 1px solid rgb(224, 231, 255);
  border-radius: 6px;
  background: rgba(224, 231, 255, 0.2);
  padding: 12px 0;
  padding-left: 15px;
  width: 315px;
}

.login_btn {
  border-radius: 6px;
  background-color: rgb(46, 91, 255);
  color: rgb(255, 255, 255);
  font-size: 15px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0px;
  padding: 14px 0;
  text-align: center;
  width: 315px;
  margin-top: 22px;
  cursor: pointer;
}
.login_btn:hover {
  background-color: white;
  color: rgb(46, 91, 255);
  border: 1px solid rgb(46, 91, 255);
  transition-duration: 500ms;
}

.login_container {
  width: 379px;
  margin: 0 auto;
  margin-top: 150px;
}
</style>
