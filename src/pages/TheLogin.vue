<template>
  <div class="login_container">
    <img class="loginlogo" :src="loginLogo" alt="filter" />
    <form @submit.prevent="fetchData" class="login_box">
      <h2 class="login_start">Kirish</h2>
      <div class="login_form">
        <label class="text-xs font-semibold leading-[14px] uppercase mb-2 mt-[22px]" for="login"
          >login</label
        >
        <input
          required
          minlength="6"
          placeholder="login"
          class="login_input"
          type="text"
          id="login"
          v-model="formData.username"
          :class="{ error: isError }"
        />
      </div>
      <div class="login_form">
        <label class="login_text" for="password">parol</label>
        <input
          required
          minlength="6"
          placeholder="parol"
          class="login_input"
          type="password"
          id="password"
          v-model="formData.password"
          :class="{ error: isError }"
        />
      </div>

      <!-- <BaseFormGroup label="parol">
      <BaseInput v-model="formData.password">
        <template #suffix>
          <img
                :src=" eye"
                alt="eye"
              
              />
        </template>
       
      </BaseInput>

    </BaseFormGroup> -->

      <VueRecaptcha
        sitekey="6LcIMaYpAAAAANkcV3TejOufRic9HZV4mVdA3hK6"
        ref="recaptcha"
        @verify="verifyMethod"
        @expired="expireMethod"
      ></VueRecaptcha>

      <button type="submit" class="login_btn">Kirish</button>
    </form>
  </div>
</template>

<script setup>
import loginLogo from '../assets/img/loginMainLogo.png'
import eye from '../assets/img/eye.png'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import axios from 'axios'
import { VueRecaptcha } from 'vue-recaptcha'
import BaseFormGroup from '../components/Form/BaseFormGroup.vue'
import BaseInput from '../components/Form/BasePasswordInput.vue'
const password = ref()
const recaptValid = ref(false)
const isError = ref(false)
watch(
  () => password.value,
  (newValue) => {
    console.log(newValue)
  }
)

const verifyMethod = (token) => {
  console.log(token)
  recaptValid.value = !!token
}
const expireMethod = (e) => {
  console.log('method', e)
}

const router = useRouter()
const formData = ref({
  username: '',
  password: ''
})

function fetchData() {
  if (!recaptValid.value) {
    return
  }

  axios
    .post('https://club.metsenat.uz/api/v1/auth/login/', formData.value)
    .then((res) => {
      localStorage.setItem('refresh', res.data.refresh)
      localStorage.setItem('access', res.data.access)
      if (recaptValid.value) {
        router.push('/home')
      }
    })
    .catch((err) => {
      console.log('error', err)
      isError.value = true
    })
}
</script>

<style scoped>
.login_form {
  margin: 22px 0;
}

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
  margin-bottom: 44px;
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
  margin-top: 8px;
}

.login_input:focus {
  outline: none;
}

.error {
  border-color: red; /* Add error border color */
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

.loginlogo {
  margin: 0 30px;
}
</style>
