import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import VueApexCharts from 'vue3-apexcharts'
createApp(App).use(router).use(VueApexCharts).mount('#app')
