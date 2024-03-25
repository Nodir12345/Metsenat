let originalData = []
const TheTableShow = (list) => {
  function getClass(item) {
    if (item.get_status_display == 'Yangi') {
      return 'change_table_red'
    } else if (item.get_status_display == 'Moderatsiyada') {
      return 'change_table_green'
    } else {
      return ''
    }
  }

  function toggleSensitiveData(item) {
    const index = list.value.results.findIndex((i) => i === item)
    if (index !== -1) {
      if (originalData[index]) {
        list.value.results[index] = originalData[index]
        originalData[index] = null
      } else {
        originalData[index] = { ...item }
        item.full_name = '***'
        item.phone = '***'
        item.sum = '***'
        item.spent = '***'
        item.get_status_display = '***'
        item.created_at = '***'
      }
      item.imgshow = !item.imgshow || false
    } else {
      console.error('Item not found.')
    }
  }
  return { getClass, toggleSensitiveData }
}
export default TheTableShow
