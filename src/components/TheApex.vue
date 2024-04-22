<template>
  <div>
    <div class="mb-[48px] opacity-0">space</div>
    <ul class="flex justify-between mb-[28px] gap-[10px]">
      <li
        class="box-border border-[1px] border-solid border-[rgba(46,91,255,0.08)] rounded-[8px] bg-[rgb(255,_255,_255)] px-[0] py-[24px] pl-[24px] w-full max-w-[381px] flex items-center gap-[16px] [list-style:none]"
      >
        <img :src="totalPaid" alt="totalPaid" />
        <div class="cost_title_box">
          <h3 class="text-[rgb(122,_122,_157)] text-[12px] font-normal leading-[12px] mb-[6px]">
            {{ $t('allCost') }}
          </h3>
          <p class="cost_text text-[rgb(46,_56,_77)] text-[20px] font-bold leading-[20px]">
            {{ formattedValues?.totalPaid }}
            <span
              class="cost_uzs text-[rgb(178,_183,_193)] text-[20px] font-semibold leading-[20px]"
              >UZS</span
            >
          </p>
        </div>
      </li>
      <li
        class="box-border border-[1px] border-solid border-[rgba(46,91,255,0.08)] rounded-[8px] bg-[rgb(255,_255,_255)] px-[0] py-[24px] pl-[24px] w-full max-w-[381px] flex items-center gap-[16px] [list-style:none]"
      >
        <img :src="resPaid" alt="resPaid" />
        <div class="cost_title_box">
          <h3 class="text-[rgb(122,_122,_157)] text-[12px] font-normal leading-[12px] mb-[6px]">
            {{ $t('responseCost') }}
          </h3>
          <p class="cost_text text-[rgb(46,_56,_77)] text-[20px] font-bold leading-[20px]">
            {{ formattedValues?.totalNeed }}
            <span
              class="cost_uzs text-[rgb(178,_183,_193)] text-[20px] font-semibold leading-[20px]"
              >UZS</span
            >
          </p>
        </div>
      </li>
      <li
        class="box-border border-[1px] border-solid border-[rgba(46,91,255,0.08)] rounded-[8px] bg-[rgb(255,_255,_255)] px-[0] py-[24px] pl-[24px] w-full max-w-[381px] flex items-center gap-[16px] [list-style:none]"
      >
        <img :src="needCost" alt="needCost" />
        <div class="cost_title_box">
          <h3 class="text-[rgb(122,_122,_157)] text-[12px] font-normal leading-[12px] mb-[6px]">
            {{ $t('necessaryCost') }}
          </h3>
          <p class="cost_text text-[rgb(46,_56,_77)] text-[20px] font-bold leading-[20px]">
            {{ formattedValues?.totalMustPay }}
            <span
              class="cost_uzs text-[rgb(178,_183,_193)] text-[20px] font-semibold leading-[20px]"
              >UZS</span
            >
          </p>
        </div>
      </li>
    </ul>
    <div
      class="box-border border-[1px] border-solid border-[rgba(46,91,255,0.08)] rounded-[8px] bg-[rgb(255,_255,_255)] px-[10px] py-[24px]"
    >
      <div id="chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
    <div class="opacity-0 mt-[106px]">spaceButtun</div>
  </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { computed, onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import totalPaid from '../assets/img/icons/allRequestCost.svg'
import resPaid from '../assets/img/icons/requireCost.svg'
import needCost from '../assets/img/icons/nessasaryCost.svg'
const { t } = useI18n()
const series = [
  {
    name: t('desktops'),
    data: [100, 410, 350, 510, 340, 890, 1190, 1610, 1780]
  },
  {
    name: t('Noutbuk'),
    data: [200, 450, 550, 1150, 800, 705, 600, 1200, 1300]
  }
]

const chartOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: t('sponsorStudentCost'),
    align: 'left',
    style: {
      color: 'rgb(46, 56, 77)',
      fontSize: '20px',
      fontWeight: '700',
      lineHeight: '20px'
    }
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  },
  colors: ['#FF92AE', '#4C6FFF']
}

const sum = ref(null) // Define a reactive variable to hold the response data

const fetchData = () => {
  axios
    .get('https://metsenatclub.xn--h28h.uz/api/v1/dashboard/')
    .then((response) => {
      sum.value = response.data
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

onBeforeMount(() => {
  fetchData()
})

const formattedValues = computed(() => {
  if (!sum.value) return {} // Return an empty object if sum.value is null or undefined

  // Format each value using toLocaleString()
  const totalPaid = sum.value.total_paid ? sum.value.total_paid.toLocaleString() : ''
  const totalNeed = sum.value.total_need ? sum.value.total_need.toLocaleString() : ''
  const totalMustPay = sum.value.total_must_pay ? sum.value.total_must_pay.toLocaleString() : ''

  return {
    totalPaid,
    totalNeed,
    totalMustPay
  }
})
</script>
