<template>
  <div class="dropdown" tabindex="0">
    <button @click="toggleDropdown" id="dropdown-btn">
      <img :src="selectedLocale.flagSrc" />
      {{ selectedLocale.label }}
      <span class="arrow-down"></span>
    </button>
    <ul class="dropdown-content" v-show="isOpen" id="dropdown-content">
      <li v-for="locale in locales" :key="locale.value" @mousedown="setSelectedLocale(locale)">
        <img :src="locale.flagSrc" />
        {{ locale.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Eng from '../assets/img/eng.jpg'
import Uzb from '../assets/img/uzb.jpg'
import Rus from '../assets/img/rus.jpg'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const locales = ref([
  { value: 'uz', label: 'Uzb', flagSrc: Uzb },
  { value: 'en', label: 'Eng', flagSrc: Eng },
  { value: 'ru', label: 'Rus', flagSrc: Rus }
])

const isOpen = ref(false)
const selectedLocale = ref({ value: 'uz', label: 'Uzb', flagSrc: Uzb })

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const setSelectedLocale = (locales) => {
  selectedLocale.value = locales
  isOpen.value = false
  locale.value = locales.value
}

const getFlagSrc = (countryCode) => {
  return /^[A-Z]{2}$/.test(countryCode)
    ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
    : ''
}
</script>

<style>
.dropdown button {
  background-color: #3366ff;
  min-width: 130px;
  width: max-content;
  height: 40px;
  border-radius: 5px;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dropdown button img {
  margin-right: 5px;
  width: 28px;
}

.dropdown-content {
  display: none;
  position: absolute;
  margin-top: 1px;
  padding: 0;
  background-color: #f5f5f5;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  overflow-y: auto;
  max-height: 315px;
}

.dropdown-content li {
  color: black;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.dropdown-content li img {
  margin-right: 20px;
  width: 28px;
}

.dropdown-content li:hover {
  background-color: #f1f1f1;
  color: blue;
  border-radius: 5px;
}

.dropdown button:hover {
  background-color: #3c5b77;
}

.arrow-down {
  width: 0;
  height: 0;
  display: inline-block;
  vertical-align: middle;
  border-style: solid;
  border-width: 4px 4px 0 4px;
  border-color: #fff transparent transparent transparent;
  margin-left: 5px;
}

.dropdown:focus-within .dropdown-content {
  display: block;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-content {
  animation: slideIn 0.3s ease-out;
}

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #c2c9d2;
}
</style>
