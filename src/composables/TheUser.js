import { useRoute } from 'vue-router'
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'

const TheUser = (url) => {
  const route = useRoute()
  const user = ref()

  const FeachUser = () => {
    const UserId = route.params.id
    let requestUrl = `${url / UserId}`
    axios(requestUrl)
      .then((res) => (user.value = res))
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
  }
  onBeforeMount(() => {
    FeachUser()
  })

  return {
    user
  }
}

export default TheUser
