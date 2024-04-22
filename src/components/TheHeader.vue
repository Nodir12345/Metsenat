<template>
  <header class="the_header">
    <div class="container_header max-w-[1200px] mx-auto py-3 flex items-center justify-between">
      <img :src="logoMetsenat" alt="Logo Metsenat" />

      <div class="hamburger_wrapper relative hidden">
        <button class="cursor-pointer bg-inherit" @click="hamburgerShow = !hamburgerShow">
          <img class="w-[30px] h-[30px]" :src="Hamburger" alt="Hamburger" />
        </button>
        <div
          v-if="hamburgerShow"
          class="hamburger bg-white p-5 rounded-lg absolute top-[30px] right-[30px] z-10 flex flex-col items-center"
        >
          <Language></Language>

          <button
            class="user_box flex items-center gap-2 text-primary font-semibold px-4 py-2 rounded cursor-pointer hover:text-blue-500 hover:bg-gray-100"
          >
            Metsenat
            <div
              class="user_icon_box bg-green-500 w-8 h-8 flex items-center justify-center rounded"
            >
              <img :src="userIcon" alt="Logo Metsenat" />
            </div>
          </button>
          <button
            @click="removeValue"
            class="logout_btn w-8 h-8 rounded cursor-pointer flex items-center justify-center bg-transparent hover:bg-blue-500"
          >
            <img :src="logOut" alt="Logout" />
          </button>
        </div>
      </div>

      <div class="header_left hidden md:flex items-center gap-10">
        <Language></Language>

        <button
          class="user_box flex items-center gap-2 text-primary font-semibold px-4 py-2 rounded cursor-pointer hover:text-blue-500 hover:bg-gray-100"
        >
          Metsenat
          <div class="user_icon_box bg-green-500 w-8 h-8 flex items-center justify-center rounded">
            <img :src="userIcon" alt="Logo Metsenat" />
          </div>
        </button>
        <button
          @click="removeValue"
          class="logout_btn w-8 h-8 rounded cursor-pointer flex items-center justify-center bg-transparent hover:bg-blue-500"
        >
          <img :src="logOut" alt="Logout" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import logoMetsenat from '../assets/img/icons/metsenat.svg'
import userIcon from '../assets/img/userStaticIcon.svg'
import Hamburger from '../assets/img/hamburger.svg'
import logOut from '../assets/img/icons/logOut.svg'
import Language from './TheLanguage.vue'
import { ref } from 'vue'
const removeValue = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  window.location.reload()
}
const hamburgerShow = ref(false)
</script>
