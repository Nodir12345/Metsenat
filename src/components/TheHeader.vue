<template>
  <div class="the_header">
    <div class="container_header">
      <img :src="logoMetsenat" alt="Logo Metsenat" />
      <div class="header_left">
        <Language></Language>

        <button class="user_box">
          {{ $t('msg') }}
          <div class="user_icon_box">
            <img :src="userIcon" alt="Logo Metsenat" />
          </div>
        </button>
        <button @click="removeValue" class="logout_btn">
          <img :src="logOut" alt="Logout" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import logoMetsenat from '../assets/img/logoMetsenat.png'
import userIcon from '../assets/img/userStaticIcon.svg'
import logOut from '../assets/img/logOut.png'
import Language from './TheLanguage.vue'
const removeValue = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  window.location.reload()
}
</script>

<style scoped>
.container_header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.user_box {
  display: flex;
  align-items: center;
  gap: 28px;
  color: rgb(40, 41, 61);
  font-size: 13px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.35px;
  border: none;
  padding: 4px 0;
  padding-left: 20px;
  padding-right: 4px;
  border-radius: 6px;
  cursor: pointer;
}

.user_box:hover {
  transition-duration: 200ms;
  color: rgb(51, 101, 252);
  background: rgb(237, 241, 253);
}

.user_icon_box {
  background-color: #00ae69;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 4px;
}
.logout_btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  background-color: inherit;
}

.logout_btn:hover {
  background-color: var(--third-color);
  transition-duration: 500ms;
}

.header_left {
  display: flex;
  align-items: center;
  gap: 40px;
}
</style>
