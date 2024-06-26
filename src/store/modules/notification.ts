const useNotificationStore = defineStore(
  // 唯一ID
  'notification',
  () => {
    // 消息
    const message = ref(0)
    // 待办
    const todo = ref(0)
    // 总计
    const total = computed(() => message.value + todo.value)

    function init() {
      getUnreadMessage()
      getUnreadTodo()
    }
    // 获取未读消息数
    function getUnreadMessage() {
      // 为方便演示，这里直接写死的未读数
      message.value = 9
    }
    // 获取未读待办数
    function getUnreadTodo() {
      // 为方便演示，这里直接写死的未读数
      todo.value = 0
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
