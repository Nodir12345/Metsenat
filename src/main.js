import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import VueApexCharts from 'vue3-apexcharts'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/aura-light-green/theme.css'

createApp(App).use(router).use(VueApexCharts).use(PrimeVue).use(ToastService).mount('#app')
