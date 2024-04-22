<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="space">.</div>
      <div
        class="student_add border-[1px] border-solid border-[#ebeefc] rounded-[12px] [box-shadow:0px_5px_40px_0px_rgba(0,_0,_0,_0.03)] bg-[white] w-full max-w-[790px] p-[28px] mx-[auto] my-[40px] mb-[250px]"
      >
        <div class="student_add_title flex items-center justify-between">
          <div>
            <h3
              class="text-[#1d1d1f] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
            >
              {{ $t('fullNameSponsor') }}
            </h3>
            <input
              class="box-border border-[1px] border-solid border-[#e0e7ff] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] pl-[16px] w-[350px] h-[42px]"
              :placeholder="$t('fullNameInput')"
              type="text"
              v-model="fullName"
            />
          </div>
          <div>
            <h3
              class="text-[#1d1d1f] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
            >
              {{ $t('telSponsor') }}
            </h3>
            <input
              class="box-border border-[1px] border-solid border-[#e0e7ff] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] pl-[16px] w-[350px] h-[42px]"
              :placeholder="$t('tellInput')"
              type="number"
              v-model="phoneNumber"
            />
          </div>
        </div>

        <div class="student_OTM mx-[0] my-[28px]">
          <h3
            class="text-[#1d1d1f] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
          >
            {{ $t('OTM') }}
          </h3>
          <select
            class="box-border border-[1px] border-solid border-[#e0e7ff] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-full max-w-[734px] h-[42px] pl-[16px] focus:outline-[none]"
            name="OTM"
            id="OTM"
            v-model="selectedOTM"
          >
            <option v-for="(institution, index) in OTM" :key="index" :value="institution?.name">
              {{ institution?.name.slice(0, 110) }}
            </option>
          </select>
        </div>

        <div class="student_add_title flex items-center justify-between">
          <div>
            <h3
              class="text-[#1d1d1f] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
            >
              {{ $t('typeStudent') }}
            </h3>
            <select
              class="border-[1px] border-solid border-[#e0e7ff] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-[350px] h-[42px] pl-[16px] focus:outline-[none]"
              name="studentType"
              id="studentType"
              v-model="studentType"
            >
              <option :value="1">{{ $t('grand') }}</option>
              <option :value="2">{{ $t('contract') }}</option>
            </select>
          </div>
          <div>
            <h3
              class="text-[#1d1d1f] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
            >
              {{ $t('contractCost') }}
            </h3>
            <input
              class="box-border border-[1px] border-solid border-[#e0e7ff] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] pl-[16px] w-[350px] h-[42px]"
              :placeholder="$t('enterCost')"
              type="number"
              v-model="summa"
            />
          </div>
        </div>
        <div class="border-[1.5px] border-solid border-[#f5f5f7] block mt-[27px] mb-[29px]"></div>
        <Toast />
        <button
          class="add_student_btn rounded-[5px] bg-[#36f] px-[32px] py-[9px] flex items-center text-[white] text-[14px] font-medium leading-[24px] tracking-[-0.35px] gap-[10px] ml-auto mb-[20px] mt-[20px] cursor-pointer"
          type="submit"
        >
          <img :src="addBtn" alt="addBtn" />{{ $t('add') }}
        </button>
      </div>
    </form>
    <div class="opacity-0">.</div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onBeforeMount, ref, watch } from 'vue'
import addBtn from '../assets/img/icons/add.svg'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Student add', life: 3000 })
}

const OTM = ref([])
const selectedOTM = ref(null)
const fullName = ref('')
const phoneNumber = ref('')
const studentType = ref('')
const summa = ref('')
const isError = ref(false)
const fetchUser = () => {
  axios
    .get(`https://metsenatclub.xn--h28h.uz/api/v1/institute-list/`)
    .then((res) => {
      OTM.value = res.data
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

onBeforeMount(() => {
  fetchUser()
})

const logValues = () => {
  const selectedInstitute = OTM.value.find((institute) => institute.name === selectedOTM.value)
  const instituteId = selectedInstitute ? selectedInstitute.id : null

  const formData = {
    full_name: fullName.value,
    type: studentType.value,
    phone: phoneNumber.value,
    institute: instituteId,
    contract: 0,
    given: parseInt(summa.value) || 0
  }
  axios
    .post('https://metsenatclub.xn--h28h.uz/api/v1/student-create/', formData)
    .then((res) => {
      console.log('Ishladi', res.data)
      isError.value = true
    })
    .catch((err) => {
      console.log('error', err)
      isError.value = false
    })
}

const handleSubmit = () => {
  watch(isError, (newValue, oldValue) => {
    if (newValue === true) {
      showSuccess()
    }
  })

  logValues()
  selectedOTM.value = null
  fullName.value = ''
  phoneNumber.value = ''
  studentType.value = ''
  summa.value = ''
}
</script>
