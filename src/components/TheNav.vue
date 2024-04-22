<template>
  <div>
    <div v-if="!isUserRoute && !isUserRouteDemands && !isUserRouteDemandsAdd" class="bg-[#f8f8f8]">
      <nav
        class="px-[0] py-[24px] flex items-center justify-between max-w-[1200px] mx-[auto] my-[0]"
      >
        <div class="Nav_box flex items-center">
          <button @click="onSubmitApex()">
            <label class="Nav_checked block cursor-pointer">
              <input class="hidden cursor-pointer" type="radio" checked="checked" name="radio" />
              <span
                class="checkmark text-[rgba(51,_102,_255,_0.6)] text-[12px] font-medium leading-[12px] tracking-[1.13px] text-center uppercase border-[2px] border-solid border-[#e0e7ff] rounded-[6px] bg-[white] px-[54px] py-[12px] cursor-pointer rounded-tr-[0%] rounded-br-[0%]"
              >
                {{ $t('dashboard') }}</span
              >
            </label>
          </button>
          <button @click="onSubmitSponsors()" to="/home/apex">
            <label class="Nav_checked block cursor-pointer">
              <input
                class="hidden cursor-pointer"
                type="radio"
                name="radio"
                :checked="isSponsorsRoute"
              />
              <span
                class="checkmark2 text-[rgba(51,_102,_255,_0.6)] text-[12px] font-medium leading-[12px] tracking-[1.13px] text-center uppercase border-[2px] border-solid border-[#e0e7ff] rounded-[6px] bg-[white] px-[54px] py-[12px] cursor-pointer [border-left:none] [border-right:none] rounded-tr-[0%] rounded-tl-[0%] rounded-bl-[0%] rounded-br-[0%]"
                >{{ $t('sponsors') }}</span
              >
            </label>
          </button>
          <button @click="onSubmitDemands()">
            <label class="Nav_checked block cursor-pointer">
              <input
                class="hidden cursor-pointer"
                type="radio"
                name="radio"
                :checked="isDemandsRoute"
              />
              <span
                class="checkmark3 text-[rgba(51,_102,_255,_0.6)] text-[12px] font-medium leading-[12px] tracking-[1.13px] text-center uppercase border-[2px] border-solid border-[#e0e7ff] rounded-[6px] bg-[white] px-[54px] py-[12px] cursor-pointer rounded-tl-[0%] rounded-bl-[0%]"
                >{{ $t('students') }}</span
              >
            </label>
          </button>
        </div>
        <div class="nav_filter flex items-center gap-[20px]">
          <form class="nav_filter_form relative">
            <img
              class="nav_filter_img absolute top-[13px] left-[10px]"
              :src="seachIcon"
              alt="search icon"
            />
            <input
              class="nav_filter_input rounded-[5px] bg-[#e8e8e8] px-[0] py-[12px] border-none pl-[38px] w-[280px] text-[#b1b1b8] text-[15px] font-normal leading-[18px] tracking-[0px]"
              type="text"
              :placeholder="$t('search')"
              v-model="searchValue"
            />
          </form>

          <TheBaseButtun @click="onSubmitFilter()" :text="$t('filter')" variant="secondary">
            <template #icon>
              <img :src="filter" alt="filter" />
            </template>
          </TheBaseButtun>
        </div>
      </nav>

      <div
        class="filter_modal absolute w-full max-w-[586px] left-2/4 top-2/4 rounded-[12px] bg-[white] z-10 -translate-x-1/2 -translate-y-1/2 p-[28px]"
        v-if="showModal"
      >
        <div class="filter_title_box flex items-center justify-between">
          <h2 class="filter_title text-[#28293d] text-[24px] font-bold leading-[28px]">
            {{ $t('filter') }}
          </h2>
          <button class="clear_btn bg-[#fff] cursor-pointer" @click="clearFilter()">
            <img :src="clear" alt="clear" />
          </button>
        </div>
        <span class="filter_line border-[2px] border-solid border-[#f5f5f7] block mx-[0] my-[20px]">
        </span>

        <div class="all_filter_box">
          <form>
            <div class="ariza relative">
              <h3
                class="text-[#1d1d1f] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[16px]"
              >
                {{ $t('formStatus') }}
              </h3>
              <select
                class="appearance-none border-[1px] border-solid border-[#e0e7ff] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-full p-[12px]"
                v-model="arizaHolatiValue"
                name="holati"
                id="holati"
              >
                <option
                  class="text-[#2e384d] font-[Rubik] text-[14px] font-normal leading-[17px] tracking-[0px] px-[20px] py-[10px]"
                  value="all"
                >
                  {{ $t('all') }}
                </option>
                <option
                  class="text-[#2e384d] font-[Rubik] text-[14px] font-normal leading-[17px] tracking-[0px] px-[20px] py-[10px]"
                  value="Moderatsiyada"
                >
                  {{ $t('moderate') }}
                </option>
                <option
                  class="text-[#2e384d] font-[Rubik] text-[14px] font-normal leading-[17px] tracking-[0px] px-[20px] py-[10px]"
                  value="yangi"
                >
                  {{ $t('new') }}
                </option>
              </select>
            </div>

            <div class="middle_filter_box mx-[0] my-[28px]">
              <h3
                class="text-[#1d1d1f] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[16px]"
              >
                {{ $t('sponsorCost') }}
              </h3>

              <div class="filter_cheked_wrap flex items-center flex-wrap gap-[12px]">
                <label
                  v-for="(value, index) in homiylikSummasiValues"
                  :key="index"
                  class="filter_checked block cursor-pointer"
                >
                  <input
                    class="hidden cursor-pointer"
                    type="radio"
                    v-model="selectedHomiylikSummasi"
                    :value="value"
                    name="filter"
                  />
                  <div
                    class="filter border-[2px] border-solid border-[#f5f5f7] block rounded-[5px] bg-[white] text-[#2e384d] text-[14px] font-medium leading-[20px] tracking-[0px] text-left p-[15px] relative w-[123px]"
                  >
                    {{ value }}
                    <span
                      class="filter_uzs text-[#2e5bff] text-[12px] font-normal leading-[20px] tracking-[0px] text-left uppercase"
                      >Uzs</span
                    >
                    <img
                      class="absolute !-top-[8px] !-right-[5px] hidden"
                      :src="CheckedIcon"
                      alt="CheckedIcon"
                    />
                  </div>
                </label>
              </div>
            </div>
            <div class="end_filter_box">
              <h3
                class="hhh text-[#1d1d1f] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[16px]"
              >
                {{ $t('data') }}
              </h3>
              <div>
                <input
                  class="box-border border-[1px] border-solid border-[#e0e7ff] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-[253px] h-[42px] px-[16px] py-[0]"
                  type="date"
                  id="appt"
                  name="appt"
                  v-model="sanaValue"
                />
              </div>
            </div>
            <span
              class="filter_line border-[2px] border-solid border-[#f5f5f7] block mx-[0] my-[20px]"
            >
            </span>
            <div class="filter_btns_wrapper flex items-center gap-[16px]">
              <button
                @click="clearFilterValues"
                class="filter_btn_clear border-[1px] border-solid border-[#b2b7c1] rounded-[5px] text-[#b2b7c1] text-[14px] font-medium leading-[24px] tracking-[-0.35px] px-[32px] py-[9px] flex items-center gap-[5px] cursor-pointer"
              >
                <img :src="Tozalash" alt="clearFilter" />
                {{ $t('clear') }}
              </button>

              <button
                @click="logFilterValues"
                class="filter_btn_see rounded-[5px] [box-shadow:0px_2px_4px_0px_rgba(96,_97,_112,_0.16),_0px_0px_1px_0px_rgba(40,_41,_61,_0.04)] bg-[#36f] text-[white] text-[14px] font-medium leading-[24px] tracking-[-0.35px] flex items-center px-[32px] py-[9px] gap-[8px] cursor-pointer"
              >
                <img :src="See" alt="eyeFilter" />
                {{ $t('seeResult') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="isUserRoute" class="user">
      <div class="user_nav bg-[#f8f8f8]">
        <div class="max-w-[1200px] mx-[auto] my-[0] flex items-center gap-[15px] px-[0] py-[30px]">
          <button
            class="[background-color:inherit] cursor-pointer w-[28px] h-[28px] hover:bg-[#e3e3e3] hover:duration-300 hover:rounded-[3px]"
            @click="onSubmitSponsors"
          >
            <img :src="arrowLeft" alt="arrowLeft" />
          </button>
          <h3 class="text-[#28293d] text-[24px] font-bold leading-[28px] tracking-[0%]">
            {{ user?.data.full_name }}
          </h3>
          <span
            class="rounded-[5px] bg-[#ddfff2] text-[#00cf83] text-[12px] font-normal leading-[14px] tracking-[0px] text-center p-[8px]"
            >{{ $t('confirm') }}</span
          >
        </div>
      </div>
    </div>

    <div v-if="isUserRouteDemands" class="user">
      <div class="user_nav bg-[#f8f8f8]">
        <div class="max-w-[1200px] mx-[auto] my-[0] flex items-center gap-[15px] px-[0] py-[30px]">
          <button
            class="[background-color:inherit] cursor-pointer w-[28px] h-[28px] hover:bg-[#e3e3e3] hover:duration-300 hover:rounded-[3px]"
            @click="onSubmitDemands"
          >
            <img :src="arrowLeft" alt="arrowLeft" />
          </button>
          <h3 class="text-[#28293d] text-[24px] font-bold leading-[28px] tracking-[0%]">
            {{ stutent?.data.full_name }}
          </h3>
          <span
            class="rounded-[5px] bg-[#ddfff2] text-[#00cf83] text-[12px] font-normal leading-[14px] tracking-[0px] text-center p-[8px]"
            >{{ $t('confirm') }}</span
          >
        </div>
      </div>
    </div>

    <div v-if="isUserRouteDemandsAdd" class="user">
      <div class="user_nav bg-[#f8f8f8]">
        <div class="max-w-[1200px] mx-[auto] my-[0] flex items-center gap-[15px] px-[0] py-[30px]">
          <button
            class="[background-color:inherit] cursor-pointer w-[28px] h-[28px] hover:bg-[#e3e3e3] hover:duration-300 hover:rounded-[3px]"
            @click="onSubmitDemands"
          >
            <img :src="arrowLeft" alt="arrowLeft" />
          </button>
          <h3 class="text-[#28293d] text-[24px] font-bold leading-[28px] tracking-[0%]">
            {{ $t('addStudent') }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import seachIcon from '../assets/img/icons/search.svg'
import filter from '../assets/img/icons/filter.svg'
import arrowLeft from '../assets/img/arrowLeft.png'
import arrowDown from '../assets/img/arrowDown.png'
import arrowTop from '../assets/img/arrowTop.png'
import clear from '../assets/img/icons/clear.svg'
import Tozalash from '../assets/img/icons/clearFilter.svg'
import See from '../assets/img/icons/eyeSee.svg'
import CheckedIcon from '../assets/img/CheckedIcon.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TheBaseButtun from './TheBaseButtun.vue'

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

<style scoped lang="scss"></style>
