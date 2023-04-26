const useNotificationStore = defineStore(
  // 唯一ID
  'notification',
  () => {
    const message = ref(0)
    const todo = ref(0)
    const total = computed(() => message.value + todo.value)
    function init() {
      setMeseage(9)
      setTodo(0)
    }
    function setMeseage(value: number) {
      message.value = value
    }
    function setTodo(value: number) {
      todo.value = value
    }
    return {
      message,
      todo,
      total,
      init,
    }
  },
)
export default useNotificationStore
