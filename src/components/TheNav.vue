<template>
  <div>
    <div v-if="!isUserRoute" class="templete_nav">
      <nav>
        <div class="Nav_box">
  
          <button @click="onSubmitApex()">
            <label class="Nav_checked">
              <input type="radio" checked="checked" name="radio" />
              <span class="checkmark">Dashboard</span>
            </label>
          </button>
          <button @click="onSubmitSponsors()" to="/home/apex">
            <label class="Nav_checked">
              <input type="radio" name="radio" />
              <span class="checkmark2">Homiylar</span>
            </label>
          </button>
          <button @click="onSubmitDemands()">
            <label class="Nav_checked">
              <input type="radio" name="radio" />
              <span class="checkmark3">Talabalar</span>
            </label>
          </button>
        </div>
        <div class="nav_filter">
          <form class="nav_filter_form">
            <img class="nav_filter_img" :src="seachIcon" alt="search icon" />
            <input class="nav_filter_input" type="text" placeholder="Izlash" />
          </form>
          <button @click="onSubmitFilter()" class="filter_btn">
            <img :src="filter" alt="filter" /> Filter
          </button>
        </div>
      </nav>
  
      <div class="filter_modal" v-if="showModal">
        <div class="filter_title_box">
          <h2 class="filter_title">Filter</h2>
          <button class="clear_btn" @click="clearFilter()"><img :src="clear" alt="clear" /></button>
        </div>
        <span class="filter_line"> </span>
  
        <div class="all_filter_box">
          <form>
            <div class="ariza">
              <h3>Ariza holati</h3>
              <select v-model="arizaHolatiValue" name="holati" id="holati">
                <option value="all">Barchasi</option>
                <option value="yangi">yangi</option>
                <option value="Moderatsiyada">moderlangan</option>
              </select>
              <img class="arrowDown" :src="arrowDown" alt="arrowDown" />
              <img class="arrowTop" :src="arrowTop" alt="arrowTop" />
            </div>
  
            <div class="middle_filter_box">
              <h3>Homiylik summasi</h3>
  
              <div class="filter_cheked_wrap">
                <label
                  v-for="(value, index) in homiylikSummasiValues"
                  :key="index"
                  class="filter_checked"
                >
                  <input
                    type="radio"
                    v-model="selectedHomiylikSummasi"
                    :value="value"
                    name="filter"
                  />
                  <div class="filter">
                    {{ value }}
                    <span class="filter_uzs">Uzs</span>
                    <img :src="CheckedIcon" alt="CheckedIcon" />
                  </div>
                </label>
              </div>
            </div>
            <div class="end_filter_box">
              <h3>SANA</h3>
              <div><input type="date" id="appt" name="appt" v-model="sanaValue" /></div>
            </div>
            <span class="filter_line"> </span>
            <button @click="logFilterValues" class="filter_btn">Btn</button>
            <button @click="clearFilterValues" class="filter_btn">clear</button>
          </form>
        </div>
      </div>
    </div>

    <div v-if="isUserRoute" class="user">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero iste similique, debitis eos at recusandae officia voluptates in aliquid est minus esse harum laborum! Voluptatem consequatur id aliquid nam quam.111</div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import seachIcon from '../assets/img/searchIcon.png'
import filter from '../assets/img/filter.png'
import arrowDown from '../assets/img/arrowDown.png'
import arrowTop from '../assets/img/arrowTop.png'
import clear from '../assets/img/clear.png'
import CheckedIcon from '../assets/img/CheckedIcon.png'
import { useRouter } from 'vue-router'
import TheTableFetch from '@/composables/TheTableFeach'
import { useRoute } from 'vue-router';


const route = useRoute();
const router = useRouter()

const showModal = ref(false)

const homiylikSummasiValues = ['Barchasi', '0', '50000', '15000', '220000', '300000']

const onSubmitApex = () => {
  router.push('/home/apex')
}
const onSubmitSponsors = () => {
  router.push('/home/sponsors')
}
const onSubmitDemands = () => {
  router.push('/home/demands')
}
const onSubmitFilter = () => {
  showModal.value = true
}

const clearFilter = () => {
  showModal.value = false
}

const arizaHolatiValue = ref('all') // default value
const selectedHomiylikSummasi = ref('3000') // default value
const sanaValue = ref('') // default value

// Define the function to log filter values
const logFilterValues = () => {
  // Log the selected values
  console.log('Ariza holati:', arizaHolatiValue.value)
  console.log('Homiylik summasi:', selectedHomiylikSummasi.value)
  console.log('Sana:', sanaValue.value)

  // Save the values in local storage
  localStorage.setItem('arizaHolati', arizaHolatiValue.value)
  localStorage.setItem('homiylikSummasi', selectedHomiylikSummasi.value)
  localStorage.setItem('sana', sanaValue.value)
}

// Define the function to clear filter values
const clearFilterValues = () => {
  // Clear the filter values
  arizaHolatiValue.value = 'all'
  selectedHomiylikSummasi.value = '3000'
  sanaValue.value = ''

  // Remove values from local storage
  localStorage.removeItem('arizaHolati')
  localStorage.removeItem('homiylikSummasi')
  localStorage.removeItem('sana')
}


const isUserRoute = computed(() => {
  // Regular expression pattern to match '/home/user/' followed by any characters
  const regex = /^\/home\/user\/.*$/;
  return regex.test(route.path);
});

const { list } = TheTableFetch('https://metsenatclub.xn--h28h.uz/api/v1/sponsor-list/')
</script>

<style scoped lang="scss">
.end_filter_box {
  > h3 {
    color: rgb(29, 29, 31);
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 1.13px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  > div > input {
    box-sizing: border-box;
    border: 1px solid rgb(224, 231, 255);
    border-radius: 6px;
    background: rgba(224, 231, 255, 0.2);
    width: 253px;
    height: 42px;
    padding: 0 16px;
  }
}

.filter_line {
  border: 2px solid rgb(245, 245, 247);
  display: block;
  margin: 20px 0;
}

.ariza {
  position: relative;
  h3 {
    color: rgb(29, 29, 31);
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 1.13px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  img {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  select {
    appearance: none;
    border: 1px solid rgb(224, 231, 255);
    border-radius: 6px;
    background: rgba(224, 231, 255, 0.2);
    width: 100%;
    padding: 12px;
  }

  select option {
    color: rgb(46, 56, 77);
    font-family: Rubik;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0px;
    padding: 10px 20px;
  }

  .arrowDown {
    position: absolute;
    top: 38px;
    right: 10px;
    display: block;
  }

  .ariza:focus-within .arrowDown {
    display: none;
  }
  .arrowTop {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
  }

  .ariza:focus-within .arrowTop {
    display: block;
  }
}
.filter_title_box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .filter_title {
    color: rgb(40, 41, 61);
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
  }

  button {
    background-color: #fff;
    cursor: pointer;
  }
}

.filter_modal {
  position: absolute;
  width: 586px;
  height: 568px;
  left: 50%;
  top: 50%;
  border-radius: 12px;
  background: rgb(255, 255, 255);
  z-index: 10;
  transform: translate(-50%, -50%);
  padding: 28px;

  .filter {
    border: 2px solid rgb(245, 245, 247);
    display: block;
  }
}
.filter_uzs {
  color: rgb(46, 91, 255);
  font-family: Rubik;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  text-transform: uppercase;
}

.nav_filter {
  display: flex;
  align-items: center;
  gap: 20px;
}
.filter_btn {
  border-radius: 5px;
  background-color: rgb(237, 241, 253);
  color: rgb(51, 101, 252);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.35px;
  padding: 8px 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.filter_btn:hover {
  background-color: var(--third-color);
  transition-duration: 500ms;
}
.nav_filter_input {
  border-radius: 5px;
  background: rgb(232, 232, 232);
  padding: 12px 0;
  border: none;
  padding-left: 38px;
  width: 284px;
}

.nav_filter_input::placeholder {
  color: rgb(177, 177, 184);
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0px;
}
.nav_filter_form {
  position: relative;
}

.nav_filter_img {
  position: absolute;
  top: 8px;
  left: 10px;
}

.filter_cheked_wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.Nav_checked,
.filter_checked {
  display: block;
  cursor: pointer;
}

.Nav_checked input,
.filter_checked input {
  display: none;
  cursor: pointer;
}

.middle_filter_box {
  margin: 28px 0;
  > h3 {
    color: rgb(29, 29, 31);
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 1.13px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
}
.filter {
  border: 1px solid rgb(224, 231, 255);
  border-radius: 5px;
  background: rgb(255, 255, 255);
  color: rgb(46, 56, 77);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  padding: 15px;
  position: relative;
  width: 123px;
  > img {
    position: absolute;
    top: -8px !important;
    right: -5px !important;
    display: none;
  }
}

.checkmark,
.checkmark2,
.checkmark3 {
  color: rgba(51, 102, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: 1.13px;
  text-align: center;
  text-transform: uppercase;
  border: 2px solid rgb(224, 231, 255);
  border-radius: 6px;
  background: rgb(255, 255, 255);
  padding: 12px 54px;
  cursor: pointer;
}

.checkmark {
  border-top-right-radius: 0%;
  border-bottom-right-radius: 0%;
}
.checkmark2 {
  border-left: none;
  border-right: none;
  border-top-right-radius: 0%;
  border-top-left-radius: 0%;
  border-bottom-left-radius: 0%;
  border-bottom-right-radius: 0%;
}
.checkmark3 {
  border-top-left-radius: 0%;
  border-bottom-left-radius: 0%;
}

.Nav_checked:hover input ~ .checkmark,
.Nav_checked:hover input ~ .checkmark2,
.Nav_checked:hover input ~ .checkmark3 {
  background-color: #ecf0fc;
  transition: 300ms;
}

.Nav_checked input:checked ~ .checkmark,
.Nav_checked input:checked ~ .checkmark2,
.Nav_checked input:checked ~ .checkmark3 {
  color: rgb(255, 255, 255);
  background-color: var(--main-color);
  transition-duration: 500ms;
}

.filter_checked input:checked ~ .filter {
  border: 2px solid rgb(46, 91, 255);
}
.filter_checked input:checked ~ .filter > img {
  display: block;
}

.Nav_box {
  display: flex;
  align-items: center;
}

nav {
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.templete_nav {
  background-color: #f8f8f8;
}
</style>
