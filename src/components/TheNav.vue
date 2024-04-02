<template>
  <div>
    <div v-if="!isUserRoute && !isUserRouteDemands && !isUserRouteDemandsAdd" class="templete_nav">
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
              <input type="radio" name="radio" :checked="isSponsorsRoute" />
              <span class="checkmark2">Homiylar</span>
            </label>
          </button>
          <button @click="onSubmitDemands()">
            <label class="Nav_checked">
              <input type="radio" name="radio" :checked="isDemandsRoute" />
              <span class="checkmark3">Talabalar</span>
            </label>
          </button>
        </div>
        <div class="nav_filter">
          <form class="nav_filter_form">
            <img class="nav_filter_img" :src="seachIcon" alt="search icon" />
            <input
              class="nav_filter_input"
              type="text"
              placeholder="Izlash"
              v-model="searchValue"
            />

            <div class="search_data">
              <ul>
                <li v-for="(item, index) of 20" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
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
              <h3 class="hhh">SANA</h3>
              <div><input type="date" id="appt" name="appt" v-model="sanaValue" /></div>
            </div>
            <span class="filter_line"> </span>
            <div class="filter_btns_wrapper">
              <button @click="clearFilterValues" class="filter_btn_clear">
                <img :src="Tozalash" alt="clearFilter" />
                Tozalash
              </button>

              <button @click="logFilterValues" class="filter_btn_see">
                <img :src="See" alt="eyeFilter" />
                Natijalarni ko‘rish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="isUserRoute" class="user">
      <div class="user_nav">
        <div>
          <button @click="onSubmitSponsors"><img :src="arrowLeft" alt="arrowLeft" /></button>
          <h3>{{ user?.data.full_name }}</h3>
          <span>Tasdiqlangan</span>
        </div>
      </div>
    </div>

    <div v-if="isUserRouteDemands" class="user">
      <div class="user_nav">
        <div>
          <button @click="onSubmitDemands"><img :src="arrowLeft" alt="arrowLeft" /></button>
          <h3>{{ stutent?.data.full_name }}</h3>
          <span>Tasdiqlangan</span>
        </div>
      </div>
    </div>

    <div v-if="isUserRouteDemandsAdd" class="user">
      <div class="user_nav">
        <div>
          <button @click="onSubmitDemands"><img :src="arrowLeft" alt="arrowLeft" /></button>
          <h3>Talaba Qo'shish</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import seachIcon from '../assets/img/searchIcon.png'
import filter from '../assets/img/filter.png'
import arrowLeft from '../assets/img/arrowLeft.png'
import arrowDown from '../assets/img/arrowDown.png'
import arrowTop from '../assets/img/arrowTop.png'
import clear from '../assets/img/clear.png'
import Tozalash from '../assets/img/clearFilter.png'
import See from '../assets/img/eyeFilter.png'
import CheckedIcon from '../assets/img/CheckedIcon.png'
import { useRouter } from 'vue-router'
import TheTableFetch from '@/composables/TheTableFeach'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
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
const isDemandsRoute = computed(() => {
  return route.path === '/home/demands'
})
const isSponsorsRoute = computed(() => {
  return route.path === '/home/sponsors'
})

const clearFilter = () => {
  showModal.value = false
}



////nav



const isUserRoute = computed(() => {
  const regex = /^\/home\/user\/.*$/
  return regex.test(route.path)
})

const isUserRouteDemands = computed(() => {
  const regex = /^\/home\/student\/.*$/
  return regex.test(route.path)
})
const isUserRouteDemandsAdd = computed(() => {
  const regex = /^\/home\/demands\/add/
  return regex.test(route.path)
})





const user = ref()

const FeachUser = (UserId) => {
  if (UserId) {
    axios(`https://metsenatclub.xn--h28h.uz/api/v1/sponsor-detail/${UserId} `).then(
      (res) => (user.value = res)
    )
  }
}

const stutent = ref()
const FeachSponsor = (UserId) => {
  if (UserId) {
    axios(`https://metsenatclub.xn--h28h.uz/api/v1/student-detail/${UserId} `).then(
      (res) => (stutent.value = res)
    )
  }
}

onBeforeMount(() => {
  if (route.params.id) {
    FeachUser(route.params.id)
    FeachSponsor(route.params.id)
  }

  watch(
    () => route.params.id,
    (newValue, oldValue) => {
      if (newValue) {
        FeachUser(newValue)
        FeachSponsor(newValue)
      }
    }
  )
})







// search

const searchValue = ref('')
let searchData = ref({})
function getSearchList() {
  axios('https://metsenatclub.xn--h28h.uz/api/v1/sponsor-list/?page=1&page_size=40', {
    params: {
      search: searchValue.value
    }
  }).then((res) => (searchData.value = res.data))
}

getSearchList()

watch(
  () => searchValue.value,
  (newValue) => {
    router.push({ query: { search: newValue } })
    getSearchList()
  }
)

// const getNavFilterInputValue = () => {
//   console.log('Nav filter input value:', searchValue.value)
// }

// onMounted(() => {
//   const navFilterInput = document.querySelector('.nav_filter_input')
//   navFilterInput.addEventListener('input', getNavFilterInputValue)
// })




//filter

const arizaHolatiValue = ref('all')
const selectedHomiylikSummasi = ref('3000')
const sanaValue = ref('')

const logFilterValues = () => {
  console.log('Ariza holati:', arizaHolatiValue.value)
  console.log('Homiylik summasi:', selectedHomiylikSummasi.value)
  console.log('Sana:', sanaValue.value)

  localStorage.setItem('arizaHolati', arizaHolatiValue.value)
  localStorage.setItem('homiylikSummasi', selectedHomiylikSummasi.value)
  localStorage.setItem('sana', sanaValue.value)
}

const clearFilterValues = () => {
  arizaHolatiValue.value = 'all'
  selectedHomiylikSummasi.value = '3000'
  sanaValue.value = ''

  localStorage.removeItem('arizaHolati')
  localStorage.removeItem('homiylikSummasi')
  localStorage.removeItem('sana')
}


</script>

<style scoped lang="scss">
.user_nav {
  background-color: #f8f8f8;

  > div {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 30px 0;
  }

  > div > button {
    background-color: inherit;
    cursor: pointer;
    width: 28px;
    height: 28px;
  }

  > div > button:hover {
    background-color: #e3e3e3;
    transition-duration: 300ms;
    border-radius: 3px;
  }

  > div > span {
    border-radius: 5px;
    background-color: rgb(221, 255, 242);
    color: rgb(0, 207, 131);
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: center;
    padding: 8px;
  }
  > div > h3 {
    color: rgb(40, 41, 61);
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0%;
  }
}

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

.filter_btn_see {
  border-radius: 5px;
  box-shadow:
    0px 2px 4px 0px rgba(96, 97, 112, 0.16),
    0px 0px 1px 0px rgba(40, 41, 61, 0.04);
  background: rgb(51, 102, 255);
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.35px;
  display: flex;
  align-items: center;
  padding: 9px 32px;
  gap: 8px;
  cursor: pointer;
}

.filter_btn_clear {
  border: 1px solid rgb(178, 183, 193);
  border-radius: 5px;
  color: rgb(178, 183, 193);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.35px;
  padding: 9px 32px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.filter_btns_wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: end;
}

.search_data {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.915);
  padding: 12px 0;
  border: none;
  width: 284px;
  height: 300px;
  overflow-y: auto;
  position: absolute;
  display: none;
  > ul > li {
    padding: 20px 8px;
    list-style: none;
    cursor: pointer;
  }
  > ul > li:hover {
    background: rgb(239, 233, 233);
  }
}

.nav_filter_input:focus + .search_data {
  display: block;
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
