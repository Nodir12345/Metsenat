<template>
  <div class="table_wrap">
    <div class="space">.</div>
    <button @click="StudentAdd" class="add_student_btn">
      <img :src="addBtn" alt="addBtn" />
      {{ $t('addStudent') }}
    </button>
    <div></div>
    <div class="table_wraper">
      <table class="content_table">
        <thead>
          <tr>
            <th>#</th>
            <th>f.i.sh.</th>
            <th>{{ $t('typeStudent') }}</th>
            <th>{{ $t('OTM') }}</th>
            <th>{{ $t('splitCost') }}</th>
            <th>{{ $t('levelContract') }}</th>
            <th>{{ $t('delete') }}</th>
            <th>{{ $t('deeds') }}</th>
          </tr>
        </thead>
        <tbody
          v-if="
            filteredSponsoreList &&
            filteredSponsoreList.results &&
            filteredSponsoreList.results.length > 0
          "
        >
          <tr
            v-for="(item, index) in filteredSponsoreList.results"
            :key="index"
            @click.passive="handleTableRowClick(item.id)"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item?.full_name }}</td>
            <td>{{ item?.phone }}</td>
            <td>{{ item?.institute?.name.slice(0, 45) }}</td>
            <td>{{ item?.given }}</td>
            <td>{{ item?.contract }}</td>
            <td>
              <div class="tbl" @click="handleTblClick($event, item.id)">
                <div class="cell">
                  <a href="" class="trash"></a>
                </div>
              </div>
            </td>
            <td>
              <img
                :src="item.imgshow ? eyeBlock : eye"
                alt="eye"
                @click="toggleSensitiveData(item)"
              />
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="8">{{ $t('noData') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="demands_end">
      <p>40 tadan 1-{{ params.limit }} {{ $t('seenPage') }}</p>

      <div class="wrap_pagination">
        <div class="pagination_select">
          <p>{{ $t('seePage') }}</p>
          <select @change="updateLimit($event.target.value)">
            <option value="5">5</option>
            <option selected value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        <div class="pagination">
          <button @click="featchPrev"><img :src="prev" alt="prevent" /></button>
          <button
            v-for="pageNumber in totalPagesDemands"
            :key="pageNumber"
            @click="goToPage(pageNumber)"
            class="btn_pagination_num"
          >
            {{ pageNumber }}
          </button>
          <button @click="featchNext"><img :src="next" alt="next" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheTableFetch from '@/composables/TheTableFeach'
import TheTableShow from '@/composables/TheTableShow'
import { computed, onMounted, ref, watch } from 'vue'
import eye from '../assets/img/eye.png'
import addBtn from '../assets/img/addBtn.png'
import eyeBlock from '../assets/img/eyeBlock.svg'
import next from '../assets/img/next.png'
import prev from '../assets/img/prev.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const { list, featchPrev, featchNext, goToPage, totalPagesDemands, updateLimit, params } =
  TheTableFetch('https://metsenatclub.xn--h28h.uz/api/v1/student-list/')
const { toggleSensitiveData } = TheTableShow(list)

const sposoreList = computed(() => list.value)
const filteredSponsoreList = ref(list)

let filterChangeValue = ref({
  arizaHolati: route.query.holati ? route.query.holati : 'all',
  homiylikSummasi: route.query.filter ? route.query.filter : 'Barchasi',
  sana: route.query.appt ? route.query.appt : ''
})

const filteredSposoreList = computed(() => {
  if (!sposoreList || !sposoreList.value || !sposoreList.value.results) {
    return []
  }

  const arizaHolatiValue = filterChangeValue.value.arizaHolati
  const homiylikSummasiValue = filterChangeValue.value.homiylikSummasi

  if (arizaHolatiValue === 'all' && homiylikSummasiValue === 'Barchasi') {
    return sposoreList.value.results
  }

  return sposoreList.value.results.filter((item) => {
    const matchArizaHolati = item.get_status_display === arizaHolatiValue
    const matchHomiylikSummasi =
      homiylikSummasiValue === 'Barchasi' || item.sum === homiylikSummasiValue

    return matchArizaHolati && matchHomiylikSummasi
  })
})

const handleTableRowClick = (item) => {
  if (event.target.tagName === 'IMG' || event.target.tagName === 'A') return

  TableItemId(item)
}

const TableItemId = (id) => {
  router.push(`student/${id}`)
}

const StudentAdd = () => {
  router.push(`demands/add`)
}

const handleTblClick = (event, id) => {
  event.preventDefault()
  console.log(id)

  axios
    .delete(`https://metsenatclub.xn--h28h.uz/api/v1/student-delete/${id}/`)
    .then((res) => {
      console.log('Ishladi', res.data)
      window.location.reload()
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>

<style scoped>
.table_wraper {
  width: 100%;
  padding: 1rem;
  white-space: nowrap; 
  overflow-x: scroll;
}

.pagination_select > select,
.pagination_select > select > option {
  color: rgb(29, 29, 31);
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  border: 1px solid rgb(223, 227, 232);
  border-radius: 4px;
  padding: 8px 2px;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.pagination_select > p {
  color: rgb(29, 29, 31);
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  width: 68px;
}
.demands_end > p {
  color: rgb(29, 29, 31);
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
}

.pagination_select {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wrap_pagination {
  display: flex;
  align-items: center;
  gap: 20px;
}

.demands_end {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  gap: 10px;
  margin-left: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer;
}

.content_table {
  width: 100%;
  max-width: 1200px;
  border-collapse: separate;
  border-spacing: 0 1rem;
}
.space {
  opacity: 0;
}
.content_table thead tr {
  color: rgb(177, 177, 184);
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 1.13px;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 12px;
  border-radius: 8px;
}

.content_table tbody tr {
  box-sizing: border-box;
  border: 1px solid rgba(46, 91, 255, 0.08);
  border-radius: 8px;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.content_table tbody tr:hover {
  background: rgb(239, 235, 235);
  transition-duration: 500ms;
}

.content_table tbody td img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.content_table tbody td {
  color: rgb(29, 29, 31);
  font-family: Rubik;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: center;
  padding: 20px 0;
}

.change_table {
  color: #5babf2;
}
.change_table_red {
  color: #5babf2 !important;
}

.change_table_green {
  color: #ffa445 !important;
}
.pagination > button {
  width: 32px;
  height: 32px;
  padding: 10px;
  border: 1px solid rgb(223, 227, 232);
  border-radius: 4px;
  background: rgb(255, 255, 255);
  cursor: pointer;
}
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
}
.spaceDemend {
  margin-top: 50px;
  opacity: 0;
}
.btn_pagination_num:focus {
  border: 1px solid #3366ff;
}

.trash {
  position: relative;
  display: inline-block;
  width: 12px;
  height: 15px;
  border: 2px solid #000;
  border-top: 0;
  border-radius: 0 0 2px 2px;
  background: none;
  box-shadow: none;
  transition: all 0.3s ease;
}
.trash:before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  height: 3px;
  width: 15px;
  background: #000;
  border-radius: 2px;
  transform: rotate(0);
}
.trash:after {
  content: '';
  position: absolute;
  top: -4px;
  left: 1px;
  width: 7px;
  height: 2px;
  background: #000;
  transform: rotate(0);
}
.trash:hover {
  box-shadow: inset 0 -7px 0 #000;
}
.trash:hover:before,
.trash:hover:after {
  animation: shake 0.2s linear infinite;
}
.trash:active {
  box-shadow: none;
  transform: scale(0.75);
}
.trash:active:before,
.trash:active:after {
  animation: none;
}
.tbl {
  display: table;
  width: 100%;
  height: 100%;
}
.cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
@-moz-keyframes shake {
  from {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-5deg);
  }
}
@-webkit-keyframes shake {
  from {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-5deg);
  }
}
@-o-keyframes shake {
  from {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-5deg);
  }
}
@keyframes shake {
  from {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-5deg);
  }
}
.bage {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  width: 286px;
  height: 268px;
  background: rgb(255, 255, 255);
}

@media screen and (max-width: 568px) {
.demands_end{
  flex-direction: column;
  gap: 10px;
}
.wrap_pagination{
  flex-direction: column;
  gap: 10px;
}
}
</style>
