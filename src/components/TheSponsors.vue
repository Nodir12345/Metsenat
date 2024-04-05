<template>
  <div class="table_wrap">
    <!-- <pre v-for="(item, index) in filteredSposoreList" :key="index">
      <div>{{ item }}</div>
    </pre> -->
    <div class="table_wraper">
      <table class="content_table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('fullName') }}</th>
            <th>{{ $t('tel') }}</th>
            <th>{{ $t('sponsorCost') }}</th>
            <th>{{ $t('spendCost') }}</th>
            <th>{{ $t('data') }}</th>
            <th>{{ $t('condition') }}</th>
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
            <td>{{ item?.full_name.slice(0, 19) }}</td>
            <td>{{ item?.phone }}</td>
            <td>{{ item?.sum }}</td>
            <td>{{ item?.spent }}</td>
            <td>{{ item?.created_at.slice(0, 10) }}</td>
            <td :class="getClass(item)">{{ item?.get_status_display }}</td>
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
            <option value="20">20</option>
          </select>
        </div>

        <div class="pagination">
          <button @click="featchPrev"><img :src="prev" alt="prevent" /></button>
          <button
            v-for="pageNumber in totalPages"
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
    <div class="spaceDemend">spaceDemend</div>
  </div>
</template>

<script setup>
import TheTableFetch from '@/composables/TheTableFeach'
import TheTableShow from '@/composables/TheTableShow'
import { computed, ref, watch } from 'vue'
import eye from '../assets/img/eye.png'
import eyeBlock from '../assets/img/eyeBlock.svg'
import next from '../assets/img/next.png'
import prev from '../assets/img/prev.png'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { list, featchPrev, featchNext, goToPage, totalPages, updateLimit, params } = TheTableFetch(
  'https://metsenatclub.xn--h28h.uz/api/v1/sponsor-list/'
)
const { getClass, toggleSensitiveData } = TheTableShow(list)

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
  if (event.target.tagName === 'IMG') return

  TableItemId(item)
}

const TableItemId = (id) => {
  router.push(`user/${id}`)
}
</script>

<style scoped>
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

.table_wraper {
  width: 100%;
  padding: 1rem;
  white-space: nowrap;
  overflow-x: scroll;
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

.content_table {
  width: 100%;
  max-width: 1200px;
  border-collapse: separate;
  border-spacing: 0 1rem;
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

@media screen and (max-width: 568px) {
  .demands_end {
    flex-direction: column;
    gap: 10px;
  }
  .wrap_pagination {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
