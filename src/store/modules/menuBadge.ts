const useMenuBadgeStore = defineStore(
  // 唯一ID
  'menuBadge',
  () => {
    const dot = ref(true)
    const number = ref(10)
    const text = ref('热门')
    function switchDot() {
      dot.value = !dot.value
    }
    function setNumber(val: number) {
      number.value = val
    }
    function setText(val: string) {
      text.value = val
    }
    return {
      dot,
      number,
      text,
      switchDot,
      setNumber,
      setText,
    }
  },
)
export default useMenuBadgeStore
