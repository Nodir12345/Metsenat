<template>
  <div>
    <h1>THeapex</h1>
    <div id="chart">
      <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'

const series = [
  {
    name: 'Desktops',
    data: [10, 41, 35, 51, 34, 89, 119, 161, 178]
  },
  {
    name: 'Laptops',
    data: [20, 45, 55, 115, 80, 75, 60, 120, 130]
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
    curve: 'straight'
  },
  title: {
    text: 'Homiylar va talabalar soni',
    align: 'left',
    style: {
      color: 'rgb(46, 56, 77)',
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '28px'
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
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    apexchart: VueApexCharts
  },
  setup() {
    return {
      series,
      chartOptions
    }
  }
})
</script>
