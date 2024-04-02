import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import VueApexCharts from 'vue3-apexcharts'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import i18n from '@/plugins/i18n'
import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App)


app.use(router).use(VueApexCharts).use(i18n).use(PrimeVue).use(ToastService).mount('#app')
