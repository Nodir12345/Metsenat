<template>
  <div>
    <pre class="opacity-0">.</pre>
    <div
      class="user_box border-[1px] border-solid border-[rgb(235,238,252)] rounded-[12px] [box-shadow:0px_5px_40px_0px_rgba(0,_0,_0,_0.03)] bg-[rgb(255,_255,_255)] w-full max-w-[793px] mx-[auto] my-[40px] p-[32px] !pt-[24px]"
    >
      <div class="user_about flex items-center justify-between">
        <h2 class="text-[rgb(40,_41,_61)] text-[24px] font-bold leading-[28px] tracking-[0%]">
          {{ $t('aboutStudent') }}
        </h2>
        <button
          class="rounded-[5px] bg-[rgb(237,_241,_253)] px-[32px] py-[8px] text-[rgb(51,_101,_252)] text-[14px] font-medium leading-[17px] gap-[8px] flex items-center cursor-pointer"
          @click="showStudentEdit(true)"
        >
          <img :src="custumUser" alt="custumUser" />{{ $t('edit') }}
        </button>
      </div>
      <div class="main_information">
        <div class="line_box relative mx-[0] my-[32px]">
          <div
            class="main_line bg-[rgb(229,_235,_255)] px-[11px] py-[2px] text-[rgb(51,_102,_255)] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase inline-block absolute -top-[8px]"
          >
            {{ $t('mainInfo') }}
          </div>
          <span class="border-[1px] border-solid border-[rgb(228,232,240)] block"></span>
        </div>
        <div class="user_title flex items-center gap-[20px] mx-[0] my-[24px]">
          <img :src="userLogo" alt="userLogo" />
          <p
            class="text-[rgb(33,_33,_33)] text-[16px] font-medium leading-[130%] tracking-[-1%] max-w-[163px]"
          >
            {{ user?.data.full_name.slice(0, 30) }}
          </p>
        </div>
        <div class="user_end flex items-center">
          <div>
            <p
              class="text-[rgb(181,_181,_195)] font-[Rubik] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
            >
              {{ $t('telSponsor') }}
            </p>
            <h3
              class="text-[rgb(33,_33,_33)] text-[16px] font-medium leading-[130%] tracking-[-1%]"
            >
              {{ user?.data.phone }}
            </h3>
          </div>
        </div>
      </div>

      <div class="otm_information">
        <div class="line_box relative mx-[0] my-[32px]">
          <div
            class="main_line bg-[rgb(229,_235,_255)] px-[11px] py-[2px] text-[rgb(51,_102,_255)] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase inline-block absolute -top-[8px]"
          >
            {{ $t('otmInfo') }}
          </div>
          <span class="border-[1px] border-solid border-[rgb(228,232,240)] block"></span>
        </div>

        <div class="otm_end w-full max-w-[557px] flex items-center justify-between mb-[24px]">
          <div class="user_end flex items-center">
            <div class="student_type max-w-[350px]">
              <p
                class="text-[rgb(181,_181,_195)] font-[Rubik] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
              >
                {{ $t('OTM') }}
              </p>
              <h3
                class="text-[rgb(33,_33,_33)] text-[16px] font-medium leading-[130%] tracking-[-1%]"
              >
                {{ user?.data.institute.name }}
              </h3>
            </div>
          </div>
          <div class="user_end flex items-center">
            <div class="student_sum w-[200px]">
              <p
                class="text-[rgb(181,_181,_195)] font-[Rubik] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
              >
                {{ $t('typeSponsor') }}
              </p>
              <h3
                class="text-[rgb(33,_33,_33)] text-[16px] font-medium leading-[130%] tracking-[-1%]"
                v-if="user?.data.type == 1"
              >
                {{ $t('grand') }}
              </h3>
              <h3
                class="text-[rgb(33,_33,_33)] text-[16px] font-medium leading-[130%] tracking-[-1%]"
                v-if="user?.data.type == 2"
              >
                {{ $t('contract') }}
              </h3>
            </div>
          </div>
        </div>

        <div class="otm_end w-full max-w-[557px] flex items-center justify-between mb-[24px]">
          <div class="user_end flex items-center">
            <div class="student_type max-w-[350px]">
              <p
                class="text-[rgb(181,_181,_195)] font-[Rubik] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
              >
                {{ $t('splitCost') }}
              </p>
              <h3
                class="text-[rgb(33,_33,_33)] text-[16px] font-medium leading-[130%] tracking-[-1%]"
              >
                {{ user?.data.given }}
              </h3>
            </div>
          </div>
          <div class="user_end flex items-center">
            <div class="student_sum w-[200px]">
              <p
                class="text-[rgb(181,_181,_195)] font-[Rubik] text-[12px] font-medium leading-[14px] tracking-[1.13px] uppercase mb-[8px]"
              >
                {{ $t('amountContract') }}
              </p>
              <h3
                class="text-[rgb(33,_33,_33)] text-[16px] font-medium leading-[130%] tracking-[-1%]"
              >
                {{ user?.data.contract }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="userBack bg-[url('../assets/img/userBack.png')] bg-no-repeat w-full max-w-[820px] h-[400px] mx-[auto] my-[0]"
    ></div>

    <form
      @submit="logValues"
      class="student_edit rounded-[12px] bg-[rgb(255,_255,_255)] w-full max-w-[586px] absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 p-[28px]"
      v-if="showStudentEditValue"
    >
      <div class="user_edit_title flex items-center justify-between">
        <h2
          class="text-[rgb(40,_41,_61)] text-[24px] font-bold leading-[28px] tracking-[0%] text-left"
        >
          {{ $t('edit') }}
        </h2>
        <img class="cursor-pointer" @click="showStudentEdit(false)" :src="clear" alt="clear" />
      </div>
      <span
        class="line border-[2px] border-solid border-[rgb(245,245,247)] block mb-[45px] mt-[27px]"
      ></span>

      <div class="full_name mt-[29px]">
        <h3
          class="text-[rgb(29,_29,_31)] text-[12px] font-medium leading-[14px] tracking-[1.13px] text-left uppercase mb-[8px]"
        >
          {{ $t('fullNameSponsor') }}
        </h3>
        <input
          class="box-border border-[1px] border-solid border-[rgb(224,231,255)] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-full max-w-[530px] h-[42px] pl-[16px] focus:outline-[none]"
          v-model="fullName"
          type="text"
        />
      </div>
      <div class="full_name mt-[29px]">
        <h3
          class="text-[rgb(29,_29,_31)] text-[12px] font-medium leading-[14px] tracking-[1.13px] text-left uppercase mb-[8px]"
        >
          {{ $t('typeStudent') }}
        </h3>
        <select
          class="box-border border-[1px] border-solid border-[rgb(224,231,255)] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-full max-w-[530px] h-[42px] pl-[16px]"
          name="studentType"
          id="studentType"
          v-model="studentType"
        >
          <option selected :value="1">{{ $t('grand') }}</option>
          <option :value="2">{{ $t('contract') }}</option>
        </select>
      </div>
      <div class="full_name mt-[29px]">
        <h3
          class="text-[rgb(29,_29,_31)] text-[12px] font-medium leading-[14px] tracking-[1.13px] text-left uppercase mb-[8px]"
        >
          {{ $t('telSponsor') }}
        </h3>
        <input
          class="box-border border-[1px] border-solid border-[rgb(224,231,255)] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-full max-w-[530px] h-[42px] pl-[16px] focus:outline-[none]"
          v-model="phoneNumber"
          type="number"
        />
      </div>

      <div class="full_name mt-[29px]">
        <h3
          class="text-[rgb(29,_29,_31)] text-[12px] font-medium leading-[14px] tracking-[1.13px] text-left uppercase mb-[8px]"
        >
          {{ $t('OTM') }}
        </h3>
        <select
          class="box-border border-[1px] border-solid border-[rgb(224,231,255)] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-full max-w-[530px] h-[42px] pl-[16px]"
          name="OTM"
          id="OTM"
          v-model="selectedOTM"
        >
          <option v-for="(institution, index) in OTM" :key="index" :value="institution?.name">
            {{ institution?.name.slice(0, 80) }}
          </option>
        </select>
      </div>

      <div class="full_name mt-[29px]">
        <h3
          class="text-[rgb(29,_29,_31)] text-[12px] font-medium leading-[14px] tracking-[1.13px] text-left uppercase mb-[8px]"
        >
          {{ $t('amountContract') }}
        </h3>
        <input
          class="box-border border-[1px] border-solid border-[rgb(224,231,255)] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-full max-w-[530px] h-[42px] pl-[16px] focus:outline-[none]"
          v-model="summa"
          type="number"
        />
      </div>

      <div class="full_name mt-[29px]">
        <h3
          class="text-[rgb(29,_29,_31)] text-[12px] font-medium leading-[14px] tracking-[1.13px] text-left uppercase mb-[8px]"
        >
          {{ $t('splitCost') }}
        </h3>
        <input
          class="box-border border-[1px] border-solid border-[rgb(224,231,255)] rounded-[6px] bg-[rgba(224,_231,_255,_0.2)] w-full max-w-[530px] h-[42px] pl-[16px] focus:outline-[none]"
          v-model="given"
          type="number"
        />
      </div>
      <div
        class="line border-[2px] border-solid border-[rgb(245,245,247)] block mb-[45px] mt-[27px]"
      ></div>
      <Toast />
      <button
        class="editBtn rounded-[5px] [box-shadow:0px_2px_4px_0px_rgba(96,_97,_112,_0.16),_0px_0px_1px_0px_rgba(40,_41,_61,_0.04)] bg-[rgb(51,_102,_255)] px-[32px] py-[8px] flex items-center gap-[7px] text-[rgb(255,_255,_255)] text-[14px] font-medium leading-[24px] tracking-[-0.35px] ml-auto cursor-pointer"
      >
        <img :src="save" alt="save" />
        {{ $t('save') }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { onBeforeMount, ref, watch } from 'vue'
import userLogo from '../assets/img/userLogo.png'
import custumUser from '../assets/img/custumUser.png'
import clear from '../assets/img/clear.png'
import save from '../assets/img/save.png'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const route = useRoute()

const user = ref()
const OTM = ref([])

const FeachUser = () => {
  const UserId = route.params.id
  axios(`https://metsenatclub.xn--h28h.uz/api/v1/student-detail/${UserId}`).then(
    (res) => (user.value = res)
  )
}
onBeforeMount(() => {
  FeachUser()
})

//  window.location.reload();

const showStudentEditValue = ref(false)
const showStudentEdit = (Boolin) => {
  showStudentEditValue.value = Boolin
}

const fetchUniversity = () => {
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
  fetchUniversity()
})

/// put

const fullName = ref('')
const studentType = ref('')
const phoneNumber = ref('')
const selectedOTM = ref(null)
const summa = ref('')
const given = ref('')
const isError = ref(false)
const toast = useToast()

const logValues = () => {
  const Id = route.params.id

  const selectedInstitute = OTM.value.find((institute) => institute.name === selectedOTM.value)
  const instituteId = selectedInstitute ? selectedInstitute.id : null

  const formData = {
    full_name: fullName.value,
    type: studentType.value,
    phone: phoneNumber.value,
    institute: instituteId,
    contract: summa.value * 1,
    given: given.value * 1
  }

  axios
    .put(`https://metsenatclub.xn--h28h.uz/api/v1/student-update/${Id}/`, formData)
    .then((res) => {
      console.log('Ishladi', res.data)
      isError.value = true
      showSuccess()
    })
    .catch((err) => {
      console.log('error', err)
      isError.value = false
    })
}

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Student add', life: 3000 })
}
</script>
