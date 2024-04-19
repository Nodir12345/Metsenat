<template>
  <div class="table_wrap">
    <div class="table_wraper w-full whitespace-nowrap overflow-x-auto">
      <table class="content_table w-full max-w-[1200px] border-separate border-spacing-y-4">
        <thead>
          <tr class="text-xs text-gray-500 uppercase border-b">
            <th class="text-start pl-3.5">#</th>
            <th class="flex ml-5">{{ $t('fullName') }}</th>
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
          class="divide-y"
        >
          <tr
            v-for="(item, index) in filteredSponsoreList.results"
            :key="index"
            @click.passive="handleTableRowClick(item.id)"
            class="cursor-pointer hover:bg-gray-100 border border-gray-200 rounded-lg bg-white"
          >
            <td class="rounded-l pl-3.5">{{ index + 1 }}</td>
            <td class="py-6 flex ml-5 text-base font-medium leading-6 text-gray-700">
              {{ item?.full_name.slice(0, 19) }}
            </td>
            <td class="text-base font-medium leading-5 text-gray-600 py-6 text-center">
              {{ item?.phone }}
            </td>
            <td class="text-base font-medium leading-6 text-gray-700 py-6 text-center">
              {{ item?.sum }}
            </td>
            <td class="text-base font-medium leading-6 text-gray-700 py-6 text-center">
              {{ item?.spent }}
            </td>
            <td class="text-base font-medium leading-5 text-gray-700 py-6 text-center pr-4">
              {{ item?.created_at.slice(0, 10) }}
            </td>
            <td :class="getClass(item)" class="text-base font-medium leading-6 py-6 text-center">
              {{ item?.get_status_display }}
            </td>
            <td class="rounded-r">
              <img
                :src="item.imgshow ? eyeBlock : eye"
                alt="eye"
                @click="toggleSensitiveData(item)"
                class="w-6 h-6 cursor-pointer mx-auto"
              />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8" class="p-4">{{ $t('noData') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="demands_end flex items-center justify-between max-sm:flex-col max-sm:gap-10">
      <p class="text-gray-700 text-base font-normal leading-6">
        {{ `40 tadan 1-${params.limit} ${$t('seenPage')}` }}
      </p>

      <div class="wrap_pagination flex items-center gap-4 max-sm:flex-col max-sm:gap-10">
        <div class="pagination_select flex items-center gap-2">
          <p class="text-gray-700 text-base font-normal leading-6">{{ $t('seePage') }}</p>
          <select
            @change="updateLimit($event.target.value)"
            class="text-base text-gray-800 border border-gray-300 rounded px-2 py-1 cursor-pointer focus:out"
          >
            <option value="5">5</option>
            <option selected value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <div class="pagination flex items-center gap-2">
          <button
            @click="featchPrev"
            class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-sm focus:outline-none bg-white cursor-pointer"
          >
            <img :src="prev" alt="prevent" />
          </button>
          <template v-for="pageNumber in totalPages" :key="pageNumber">
            <button
              @click="goToPage(pageNumber)"
              class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-sm focus:outline-none bg-white cursor-pointer focus:border-blue-500"
            >
              {{ pageNumber }}
            </button>
          </template>

          <button
            @click="featchNext"
            class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-sm focus:outline-none bg-white cursor-pointer"
          >
            <img :src="next" alt="next" />
          </button>
        </div>
      </div>
    </div>
    <div class="mt-10 opacity-0">.</div>
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
