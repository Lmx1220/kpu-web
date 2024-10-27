import dayjs from '@/utils/dayjs.ts'
import axios from 'axios'

const today = dayjs().format('YYYY-MM-DD')
const useBingStore = defineStore(
  // 唯一ID
  'bing',
  () => {
    const backgroundList = ref<string[]>([])
    async function setBackgroundList() {
      JSON.parse(localStorage.getItem(`backgroundList-${today}`) as string) || await axios({
        url: 'https://api.vuejs-core.cn/getBingImage',
        method: 'get',
      }).then(({ data }) => {
        backgroundList.value = data.data

        Object.keys(localStorage).forEach((item) => {
          item.startsWith('backgroundList') && localStorage.removeItem(item)
        })
        localStorage.setItem(`backgroundList-${today}`, JSON.stringify(data.data))
      })
    }
    return {
      backgroundList,
      setBackgroundList,
    }
  },
)
useBingStore().setBackgroundList()
export default useBingStore
