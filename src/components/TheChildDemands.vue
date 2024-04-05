<template>
  <div>
    <pre class="space">.</pre>
    <div class="user_box">
      <div class="user_about">
        <h2>{{ $t('aboutStudent') }}</h2>
        <button @click="showStudentEdit(true)">
          <img :src="custumUser" alt="custumUser" />{{ $t('edit') }}
        </button>
      </div>
      <div class="main_information">
        <div class="line_box">
          <div class="main_line">{{ $t('mainInfo') }}</div>
          <span></span>
        </div>
        <div class="user_title">
          <img :src="userLogo" alt="userLogo" />
          <p>{{ user?.data.full_name.slice(0, 30) }}</p>
        </div>
        <div class="user_end">
          <div>
            <p>{{ $t('telSponsor') }}</p>
            <h3>{{ user?.data.phone }}</h3>
          </div>
        </div>
      </div>

      <div class="otm_information">
        <div class="line_box">
          <div class="main_line">{{ $t('otmInfo') }}</div>
          <span></span>
        </div>

        <div class="otm_end">
          <div class="user_end">
            <div class="student_type">
              <p>{{ $t('OTM') }}</p>
              <h3>{{ user?.data.institute.name }}</h3>
            </div>
          </div>
          <div class="user_end">
            <div class="student_sum">
              <p>{{ $t('typeSponsor') }}</p>
              <h3 v-if="user?.data.type == 1">{{ $t('grand') }}</h3>
              <h3 v-if="user?.data.type == 2">{{ $t('contract') }}</h3>
            </div>
          </div>
        </div>

        <div class="otm_end">
          <div class="user_end">
            <div class="student_type">
              <p>{{ $t('splitCost') }}</p>
              <h3>{{ user?.data.given }}</h3>
            </div>
          </div>
          <div class="user_end">
            <div class="student_sum">
              <p>{{ $t('amountContract') }}</p>
              <h3>{{ user?.data.contract }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="userBack"></div>

    <form @submit="logValues" class="student_edit" v-if="showStudentEditValue">
      <div class="user_edit_title">
        <h2>{{ $t('edit') }}</h2>
        <img @click="showStudentEdit(false)" :src="clear" alt="clear" />
      </div>
      <span class="line"></span>

      <div class="full_name">
        <h3>{{ $t('fullNameSponsor') }}</h3>
        <input v-model="fullName" type="text" />
      </div>
      <div class="full_name">
        <h3>{{ $t('typeStudent') }}</h3>
        <select name="studentType" id="studentType" v-model="studentType">
          <option selected :value="1">{{ $t('grand') }}</option>
          <option :value="2">{{ $t('contract') }}</option>
        </select>
      </div>
      <div class="full_name">
        <h3>{{ $t('telSponsor') }}</h3>
        <input v-model="phoneNumber" type="number" />
      </div>

      <div class="full_name">
        <h3>{{ $t('OTM') }}</h3>
        <select name="OTM" id="OTM" v-model="selectedOTM">
          <option v-for="(institution, index) in OTM" :key="index" :value="institution?.name">
            {{ institution?.name.slice(0, 80) }}
          </option>
        </select>
      </div>

      <div class="full_name">
        <h3>{{ $t('amountContract') }}</h3>
        <input v-model="summa" type="number" />
      </div>

      <div class="full_name">
        <h3>{{ $t('splitCost') }}</h3>
        <input v-model="given" type="number" />
      </div>
      <div class="line"></div>
      <Toast />
      <button class="editBtn">
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
<style lang="scss" scoped>
.student_edit {
  border-radius: 12px;
  background: rgb(255, 255, 255);
  width: 586px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 28px;
}
.user_edit_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > h2 {
    color: rgb(40, 41, 61);
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0%;
    text-align: left;
  }
  > img {
    cursor: pointer;
  }
}
.line {
  border: 2px solid rgb(245, 245, 247);
  display: block;
  margin-bottom: 45px;
  margin-top: 27px;
}
.editBtn {
  border-radius: 5px;
  box-shadow:
    0px 2px 4px 0px rgba(96, 97, 112, 0.16),
    0px 0px 1px 0px rgba(40, 41, 61, 0.04);
  background: rgb(51, 102, 255);
  padding: 8px 32px 8px 32px;
  display: flex;
  align-items: center;
  gap: 7px;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.35px;
  margin-left: auto;
  cursor: pointer;
}

.user_box {
  border: 1px solid rgb(235, 238, 252);
  border-radius: 12px;
  box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.03);
  background-color: rgb(255, 255, 255);
  width: 793px;
  margin: 40px auto;
  padding: 32px;
  padding-top: 24px !important;
}
.user_about {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > h2 {
    color: rgb(40, 41, 61);
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0%;
  }
  > button {
    border-radius: 5px;
    background: rgb(237, 241, 253);
    padding: 8px 32px 8px 32px;
    color: rgb(51, 101, 252);
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    gap: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}

.user_title {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 24px 0;
  > p {
    color: rgb(33, 33, 33);
    font-size: 16px;
    font-weight: 500;
    line-height: 130%;
    letter-spacing: -1%;
    max-width: 163px;
  }
}

.user_end {
  display: flex;
  align-items: center;
  div {
    > p {
      color: rgb(181, 181, 195);
      font-family: Rubik;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      letter-spacing: 1.13px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    > h3 {
      color: rgb(33, 33, 33);
      font-size: 16px;
      font-weight: 500;
      line-height: 130%;
      letter-spacing: -1%;
      > span {
        color: rgb(33, 33, 33);
        font-size: 16px;
        font-weight: 500;
        line-height: 130%;
        letter-spacing: -1%;
      }
    }
  }
}

.space {
  opacity: 0;
}

.userBack {
  background-image: url('../assets/img/userBack.png');
  background-repeat: no-repeat;
  width: 820px;
  height: 400px;
  margin: 0 auto;
}

.main_line {
  background: rgb(229, 235, 255);
  padding: 2px 11px 2px 11px;
  color: rgb(51, 102, 255);
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 1.13px;
  text-transform: uppercase;
  display: inline-block;
  position: absolute;
  top: -8px;
}
.line_box {
  position: relative;
  margin: 32px 0;
  > span {
    border: 1px solid rgb(228, 232, 240);
    display: block;
  }
}

.otm_end {
  max-width: 497px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.student_type {
  max-width: 350px;
}
.student_sum {
  width: 200px;
}
.full_name {
  margin-top: 29px;
  > h3 {
    color: rgb(29, 29, 31);
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 1.13px;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  > input {
    box-sizing: border-box;
    border: 1px solid rgb(224, 231, 255);
    border-radius: 6px;
    background: rgba(224, 231, 255, 0.2);
    width: 530px;
    height: 42px;
    padding-left: 16px;
  }
  input:focus {
    outline: none;
  }
  > select {
    box-sizing: border-box;
    border: 1px solid rgb(224, 231, 255);
    border-radius: 6px;
    background: rgba(224, 231, 255, 0.2);
    width: 530px;
    height: 42px;
    padding-left: 16px;
  }
}
</style>
