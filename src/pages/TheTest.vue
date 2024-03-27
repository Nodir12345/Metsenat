<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const formData = ref({
  username: '',
  password: ''
})

// watch(()=>formData.value,(value)=>{
//   console.log(formData.value, value)
// }, {deep:true})

function fetchData() {
  axios
    .post('https://club.metsenat.uz/api/v1/auth/login/', formData.value)
    .then((res) => {
      console.log('Ishladi', res)
      router.push('/home')
    })
    .catch((err) => {
      console.log('error', err)
    })
}

// watch(()=> route.path,(newValue)=>{
//   alert('salom Dunyo')
//   console.log(newValue);
// })
</script>

<template>
  <div class="bg-[#F5F5F7] h-screen">
    <div class="container">
      <div class="flex flex-col items-center justify-center">
        <div class="mt-4 mb-12"></div>

        <div class="w-full rounded-xl max-w-[380px] bg-white">
          <div class="p-8">
            <h1 class="text-textDark font-bold text-2xl mb-11 font-proDisplay">Kirish</h1>
            <form class="form-data" @submit.prevent="fetchData">
              <div>
                <label
                  for="login-input font-proDisplay"
                  class="text-textDark font-medium text-xs mb-2 font-proDisplay"
                  >LOGIN</label
                >
                <input
                  id="login-input"
                  type="text"
                  name="user_name"
                  class="myInput text-inputText"
                  placeholder="USERNAME"
                  v-model="formData.username"
                />
              </div>
              <div class="my-[22px]">
                <label
                  for="password-input"
                  class="text-textDark font-medium text-xs mb-2 font-proDisplay"
                  >PAROL</label
                >
                <input
                  id="password-input"
                  type="password"
                  name="user_parol"
                  class="myInput text-inputText"
                  placeholder="PAROL"
                  v-model="formData.password"
                />
              </div>
              <div class="bg-captchBg flex justify-between p-2 my-[22px] rounded-md">
                <div class="flex items-center">
                  <input type="checkbox" class="w-7 h-7" />
                  <p class="text-sm font-normal ml-2 font-roboto">I’m not a robot</p>
                </div>
              </div>
              <button
                type="submit"
                class="w-full bg-mainBlue py-3 text-white rounded-md font-proDisplay"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
