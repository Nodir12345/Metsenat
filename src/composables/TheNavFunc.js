import { useRouter } from 'vue-router'
import { ref } from 'vue'
const TheNavFunc = (url) => {
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
  return { onSubmitApex, onSubmitSponsors, onSubmitDemands, onSubmitFilter, clearFilter }
}
export default TheNavFunc
