import { onBeforeMount, reactive, ref } from 'vue'

const TheTableFetch = (url) => {
  const list = ref([])

  const params = reactive({
    skip: 1,
    limit: 10
  })

  const fetchData = () => {
    let requestUrl = `${url}?page=${params.skip}&page_size=${params.limit}`
    fetch(requestUrl, { params })
      .then((res) => res.json())
      .then((res) => {
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

  onBeforeMount(() => {
    fetchData()
  })

  return {
    list,
    featchPrev,
    featchNext
  }
}

export default TheTableFetch
