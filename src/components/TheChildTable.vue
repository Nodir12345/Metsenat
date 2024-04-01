<template>
  <div>
    <pre class="space">.</pre>
    <div class="user_box">
      <div class="user_about">
        <h2>Homiy haqida</h2>
        <button @click="showSponsorEdit(true)">
          <img :src="custumUser" alt="custumUser" /> Tahrirlash
        </button>
      </div>
      <div class="user_title">
        <img :src="userLogo" alt="userLogo" />
        <p>{{ user?.data.full_name.slice(0, 30) }}</p>
      </div>
      <div class="user_end">
        <div>
          <p>telefon raqam</p>
          <h3>{{ user?.data.phone }}</h3>
        </div>
        <div>
          <p>Homiylik summasi</p>
          <h3>{{ user?.data.sum }} <span>UZS</span></h3>
        </div>
      </div>
    </div>
    <div class="userBack"></div>
    <div class="user_edit" v-if="showSponsorEditValue">
      <div class="user_edit_title">
        <h2>Tahrirlash</h2>
        <img @click="showSponsorEdit(false)" :src="clear" alt="clear" />
      </div>
      <span class="line"></span>

      <div class="user_edit_box">
        <button @click="Legal(true)">
          <label class="user_edit_checked">
            <input :checked="!user?.data.is_legal" type="radio" name="user" />
            <span class="user_edit_checkmark">Jismoniy shaxs</span>
          </label>
        </button>
        <button @click="Legal(false)">
          <label class="user_edit_checked">
            <input :checked="user?.data.is_legal" type="radio" name="user" />
            <span class="user_edit_checkmark2">Yuridik shaxs</span>
          </label>
        </button>
      </div>

      <for v-if="isLegal" class="user_edit_information">
        <div class="full_name">
          <h3>F.I.Sh. (Familiya Ism Sharifingiz)</h3>
          <input :value="user?.data.full_name" type="text" placeholder="FullName" />
        </div>
        <div class="full_name">
          <h3>Telefon raqam</h3>
          <input :value="user?.data.phone" type="text" placeholder="Phone" />
        </div>

        <div class="full_name">
          <h3>Holati</h3>
          <select name="holati" id="holati">
            <option value="Moderlangan">Moderlangan</option>
            <option value="yangi">Yangi</option>
          </select>
        </div>
        <div class="full_name">
          <h3>Homiylik summsi</h3>
          <input :value="user?.data.sum" type="text" placeholder="Phone" />
        </div>
        <div class="full_name">
          <h3>To'lov Turi</h3>
          <select name="holati" id="holati">
            <option value="Moderlangan">Pul o'tqazmasi</option>
            <option value="yangi">Plastik</option>
          </select>
        </div>

        <button class="editBtn">
          <img :src="save" alt="save" />
          Saqlash
        </button>
      </for>
      <div v-if="!isLegal">
        <div class="isNotLegal" v-if="!user?.data.is_legal">
          <h2>Yuridik shaxs emas</h2>
        </div>

        <div v-if="user?.data.is_legal">
          <h2>Yuridik shaxs</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import userLogo from '../assets/img/userLogo.png'
import custumUser from '../assets/img/custumUser.png'
import TheUser from '@/composables/TheUser'
import clear from '../assets/img/clear.png'
import save from '../assets/img/save.png'
const route = useRoute()
const user = ref()
const FeachUser = () => {
  const UserId = route.params.id
  axios(`https://metsenatclub.xn--h28h.uz/api/v1/sponsor-detail/${UserId}`).then(
    (res) => (user.value = res)
  )
}
onBeforeMount(() => {
  FeachUser()
})

const showSponsorEditValue = ref(false)
const showSponsorEdit = (Boolin) => {
  showSponsorEditValue.value = Boolin
}

const isLegal = ref(true)

const Legal = (Boolin) => {
  isLegal.value = Boolin
}
</script>

<style lang="scss" scoped>
.user_edit_information {
  margin-top: 50px;
  div {
    margin-top: 28px;
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
    > input,
    select {
      box-sizing: border-box;
      border: 1px solid rgb(224, 231, 255);
      border-radius: 6px;
      padding-left: 16px;
      background: rgba(224, 231, 255, 0.2);
      width: 530px;
      height: 42px;
    }
    > input::placeholder {
      color: rgb(46, 56, 77);
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0px;
      text-align: left;
    }
    > input:focus {
      outline-color: green;
    }
    > select:focus {
      outline: none;
    }
  }
}

.user_edit {
  border-radius: 12px;
  background: rgb(255, 255, 255);
  width: 586px;
  height: 742px;
  position: absolute;
  top: 53%;
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

.user_box {
  border: 1px solid rgb(235, 238, 252);
  border-radius: 12px;
  box-shadow: 0px 5px 40px 0px rgba(0, 0, 0, 0.03);
  background-color: rgb(255, 255, 255);
  width: 793px;
  height: 259px;
  margin: 40px auto;
  padding: 32px;
  padding-top: 24px !important;
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
  margin-top: 29px;
  margin-left: auto;
  cursor: pointer;
}
.isNotLegal {
  margin-top: 150px;
  > h2 {
    color: rgb(51, 101, 252);
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0%;
  }
  border-radius: 5px;
  background: rgb(237, 241, 253);
  padding: 20px 0;
  text-align: center;
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
  gap: 220px;
  div {
    max-width: 170px;
    > p {
      color: rgb(181, 181, 195);
      font-family: Rubik;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      letter-spacing: 1.13px;
      text-transform: uppercase;
      margin-bottom: 12px;
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

//checked

.user_edit_checked {
  display: block;
  cursor: pointer;
}

.user_edit_checked input {
  display: none;
  cursor: pointer;
}

.user_edit_checkmark,
.user_edit_checkmark2 {
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
  padding: 12px 75px;
  cursor: pointer;
  transition-duration: 500ms; /* Moved transition-duration here for a smoother effect */
}

/* ... rest of your CSS ... */

.user_edit_checked:hover input ~ .user_edit_checkmark,
.user_edit_checked:hover input ~ .user_edit_checkmark2 {
  background-color: #ecf0fc;
}

.user_edit_checked input:checked ~ .user_edit_checkmark,
.user_edit_checked input:checked ~ .user_edit_checkmark2 {
  color: rgb(255, 255, 255);
  background-color: var(--main-color);
}

.user_edit_checkmark2 {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.user_edit_checkmark {
  border-right: none;

  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
