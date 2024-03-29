import { onBeforeMount, reactive, ref, computed } from 'vue'

const TheTableFetch = (url) => {
  const list = ref([])

  const params = reactive({
    skip: 1,
    limit: 10,
    search: ''
  })

  const fetchData = () => {
    let requestUrl = `${url}?page=${params.skip}&page_size=${params.limit}`
    fetch(requestUrl, { params })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.results);
        list.value = res
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
  }

  const featchPrev = () => {
    if (params.skip === 1) {
      return ''
    }
    params.skip -= params.limit
    fetchData()
  }

  const featchNext = () => {
    params.skip += params.limit
    fetchData()
  }

  const updateLimit = (value) => {
    params.limit = parseInt(value)
    fetchData()
  }

  const goToPage = (pageNumber) => {
    params.skip = (pageNumber - 1) * params.limit + 1
    fetchData()
  }

  const totalPages = computed(() => {
    if (list.value && list.value.count) {
      return Math.ceil(40 / params.limit)
    }
  })


  const totalPagesDemands = computed(() => {
    if (list.value && list.value.count) {
      return Math.ceil(30 / params.limit)
    }
  })

  onBeforeMount(() => {
    fetchData()
  })

  return {
    list,
    featchPrev,
    featchNext,
    goToPage,
    totalPages,
    totalPagesDemands,
    updateLimit,
    params
  }
}

export default TheTableFetch
