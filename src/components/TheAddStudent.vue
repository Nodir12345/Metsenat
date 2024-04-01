<template>
  <div>
    <div class="space">.</div>
    <div class="student_add">
      <div class="student_add_title">
        <div>
          <h3>F.I.Sh. (Familiya Ism Sharif)</h3>
          <input placeholder="Full Name" type="text" v-model="fullName" />
        </div>
        <div>
          <h3>Telefon Raqam</h3>
          <input placeholder="Phone" type="number" v-model="phoneNumber" />
        </div>
      </div>

      <div class="student_OTM">
        <h3>OTM</h3>
        <select name="OTM" id="OTM" v-model="selectedOTM">
          <option v-for="(institution, index) in OTM" :key="index" :value="institution?.name">
            {{ institution?.name.slice(0, 110) }}
          </option>
        </select>
      </div>

      <div class="student_add_title">
        <div>
          <h3>Talabalik turi</h3>
          <select name="studentType" id="studentType" v-model="studentType">
            <option :value="1">Grand</option>
            <option :value="2">Kantrakt</option>
          </select>
        </div>
        <div>
          <h3>Kontarkt summa</h3>
          <input placeholder="Summani kiriting" type="number" v-model="summa" />
        </div>
      </div>
      <div class="line"></div>

      <button class="add_student_btn" @click="logValues">
        <img :src="addBtn" alt="addBtn" />Qo‘shish
      </button>
    </div>
    <div class="space">.</div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import addBtn from '../assets/img/addBtn.png'

const OTM = ref([])
const selectedOTM = ref(null)
const fullName = ref('')
const phoneNumber = ref('')
const studentType = ref('')
const summa = ref('')

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
  console.log('fullName:', fullName.value)
  console.log('phoneNumber:', phoneNumber.value.toString())
  console.log('selectedOTM:', selectedOTM.value)
  console.log('studentType:', studentType.value)
  console.log('summ:', summa.value)
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
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>

<style lang="scss" scoped>
.student_add {
  border: 1px solid rgb(235, 238, 252);
  border-radius: 12px;
  box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.03);
  background: rgb(255, 255, 255);
  width: 790px;
  height: 402px;
  padding: 28px;
  margin: 40px auto;
  margin-bottom: 250px;
}

.student_add_title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div > h3 {
    color: rgb(29, 29, 31);
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 1.13px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  > div > input {
    box-sizing: border-box;
    border: 1px solid rgb(224, 231, 255);
    border-radius: 6px;
    background: rgba(224, 231, 255, 0.2);
    padding-left: 16px;
    width: 353px;
    height: 42px;
  }
  > div > select {
    border: 1px solid rgb(224, 231, 255);
    border-radius: 6px;
    background: rgba(224, 231, 255, 0.2);
    width: 353px;
    height: 42px;
    padding-left: 16px;
  }
  > div > select:focus {
    outline: none;
  }
}
.student_OTM {
  margin: 28px 0;
  > select {
    box-sizing: border-box;
    border: 1px solid rgb(224, 231, 255);
    border-radius: 6px;
    background: rgba(224, 231, 255, 0.2);
    width: 734px;
    height: 42px;
    padding-left: 16px;
  }
  > select:focus {
    outline: none;
  }
  > h3 {
    color: rgb(29, 29, 31);
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 1.13px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
}
.line {
  border: 1.5px solid rgb(245, 245, 247);
  display: block;
  margin-top: 27px;
  margin-bottom: 29px;
}
.add_student_btn {
  border-radius: 5px;
  background: rgb(51, 102, 255);
  padding: 9px 32px;
  display: flex;
  align-items: center;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.35px;
  gap: 4px;
  margin-left: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer;
}
.space {
  opacity: 0;
}
</style>
