import { createI18n } from 'vue-i18n'
import * as uz from '@/languages/uz.json'
import * as en from '@/languages/en.json'
import * as ru from '@/languages/ru.json'
const messages = {
  uz,
  en,
  ru
}
const i18n = createI18n({
  locale: 'uz',
  messages,
  legacy: false
})

export default i18n
