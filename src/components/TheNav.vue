<template>
  <div class="templete_nav">
    <nav>
      <div class="Nav_box">
        <button @click="onSubmitApex()">
          <label class="Nav_checked">
            <input type="radio" checked="checked" name="radio" />
            <span class="checkmark">Dashboard</span>
          </label>
        </button>
        <button @click="onSubmitSponsors()" to="/home/apex">
          <label class="Nav_checked">
            <input type="radio" name="radio" />
            <span class="checkmark2">Homiylar</span>
          </label>
        </button>
        <button @click="onSubmitDemands()">
          <label class="Nav_checked">
            <input type="radio" name="radio" />
            <span class="checkmark3">Talabalar</span>
          </label>
        </button>
      </div>
      <div class="nav_filter">
        <form class="nav_filter_form">
          <img class="nav_filter_img" :src="seachIcon" alt="search icon" />
          <input class="nav_filter_input" type="text" placeholder="Izlash" />
        </form>
        <button @click="onSubmitFilter()" class="filter_btn">
          <img :src="filter" alt="filter" /> Filter
        </button>
      </div>
    </nav>

    <div class="filter_modal" v-if="showModal">
      <div class="filter_title_box">
        <h2 class="filter_title">Filter</h2>
        <button class="clear_btn" @click="clearFilter()"><img :src="clear" alt="clear" /></button>
      </div>
      <span> </span>
      <div class="ariza">
        <h3>Ariza holati</h3>
        <form>
          <select name="cars" id="cars">
            <option class="options" value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <img class="arrowDown" :src="arrowDown" alt="arrowDown" />
          <img class="arrowTop" :src="arrowTop" alt="arrowTop" />
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import seachIcon from '../assets/img/searchIcon.png'
import filter from '../assets/img/filter.png'
import arrowDown from '../assets/img/arrowDown.png'
import arrowTop from '../assets/img/arrowTop.png'
import clear from '../assets/img/clear.png'
import { useRouter } from 'vue-router'
const router = useRouter()

const showModal = ref(false)

const onSubmitApex = () => {
  router.push('/home/apex')
}
const onSubmitSponsors = () => {
  router.push('/home/sponsors')
}
const onSubmitDemands = () => {
  router.push('/home/demands')
}
const onSubmitFilter = () => {
  showModal.value = true
}
const clearFilter = () => {
  showModal.value = false
}
</script>

<style scoped lang="scss">
.ariza {
  h3 {
    color: rgb(29, 29, 31);
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 1.13px;
    text-transform: uppercase;
  }
  form {
    position: relative;
    img {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
  form > select {
    appearance: none;
    border: 1px solid rgb(224, 231, 255);
    border-radius: 6px;
    background: rgba(224, 231, 255, 0.2);
    width: 100%;
    padding: 12px;
  }

  form > select option {
    color: rgb(46, 56, 77);
    font-family: Rubik;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0px;
    text-align: left;
    padding: 10px 20px;
  }

  .arrowDown {
    position: absolute;
    top: 10px;
    right: 10px;
    display: block;
  }

  form:focus-within .arrowDown {
    display: none;
  }
  .arrowTop {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
  }

  form:focus-within .arrowTop {
    display: block;
  }
}
.filter_title_box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .filter_title {
    color: rgb(40, 41, 61);
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
  }

  button {
    background-color: #fff;
    cursor: pointer;
  }
}

.filter_modal {
  position: absolute;
  width: 586px;
  height: 568px;
  left: 50%;
  top: 50%;
  border-radius: 12px;
  background: rgb(255, 255, 255);
  z-index: 10;
  transform: translate(-50%, -50%);
  padding: 28px;

  span {
    border: 2px solid rgb(245, 245, 247);
    display: block;
    margin: 27px 0;
  }
}

.nav_filter {
  display: flex;
  align-items: center;
  gap: 20px;
}
.filter_btn {
  border-radius: 5px;
  background-color: rgb(237, 241, 253);
  color: rgb(51, 101, 252);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.35px;
  padding: 8px 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.filter_btn:hover {
  background-color: var(--third-color);
  transition-duration: 500ms;
}
.nav_filter_input {
  border-radius: 5px;
  background: rgb(232, 232, 232);
  padding: 12px 0;
  border: none;
  padding-left: 38px;
  width: 284px;
}

.nav_filter_input::placeholder {
  color: rgb(177, 177, 184);
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0px;
}
.nav_filter_form {
  position: relative;
}

.nav_filter_img {
  position: absolute;
  top: 8px;
  left: 10px;
}

.Nav_checked {
  display: block;
  cursor: pointer;
}

.Nav_checked input {
  display: none;
  cursor: pointer;
}
.checkmark,
.checkmark2,
.checkmark3 {
  color: rgba(51, 102, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: 1.13px;
  text-align: center;
  text-transform: uppercase;
  border: 2px solid rgb(224, 231, 255);
  border-radius: 6px;
  background: rgb(255, 255, 255);
  padding: 12px 54px;
  cursor: pointer;
}
.checkmark {
  border-top-right-radius: 0%;
  border-bottom-right-radius: 0%;
}
.checkmark2 {
  border-left: none;
  border-right: none;
  border-top-right-radius: 0%;
  border-top-left-radius: 0%;
  border-bottom-left-radius: 0%;
  border-bottom-right-radius: 0%;
}
.checkmark3 {
  border-top-left-radius: 0%;
  border-bottom-left-radius: 0%;
}
.Nav_checked:hover input ~ .checkmark,
.Nav_checked:hover input ~ .checkmark2,
.Nav_checked:hover input ~ .checkmark3 {
  background-color: #ecf0fc;
  transition: 300ms;
}

.Nav_checked input:checked ~ .checkmark,
.Nav_checked input:checked ~ .checkmark2,
.Nav_checked input:checked ~ .checkmark3 {
  color: rgb(255, 255, 255);
  background-color: var(--main-color);
  transition-duration: 500ms;
}

.Nav_box {
  display: flex;
  align-items: center;
}

nav {
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.templete_nav {
  background-color: #f8f8f8;
}
</style>
