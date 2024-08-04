import useSettingsStore from './settings'
import useUserStore from './user'
import type { settingsType } from '@/util/watermark'
import watermark from '@/util/watermark'

const useWatermarkStore = defineStore(
  // 唯一ID
  'watermark',
  () => {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()

    const { init, remove } = watermark()

    watch(() => settingsStore.settings.app.enableWatermark, (val) => {
      if (val) {
        loadWatermark()
      }
      else {
        removeWatermark()
      }
    }, {
      immediate: true,
    })

    watch(() => settingsStore.settings.app.colorScheme, () => {
      if (settingsStore.settings.app.enableWatermark) {
        loadWatermark()
      }
    })

    const customSettings = ref<settingsType>({})
    const settings = computed({
      get() {
        return Object.assign(
          // 水印更多设置请查看 watermark.ts
          {
            text: `vue3-admin\n当前用户：${userStore.account}`,
            width: 150,
            x: 0,
            y: 0,
            x_space: 50,
            y_space: 50,
            alpha: 0.1,
            color: settingsStore.settings.app.colorScheme === 'light' ? 'black' : 'white',
          },
          customSettings.value,
        )
      },
      set(val) {
        update(val)
      },
    })
    watch(settings, () => {
      if (settingsStore.settings.app.enableWatermark) {
        loadWatermark()
      }
    }, {
      deep: true,
    })

    function loadWatermark() {
      init(settings.value)
    }

    function removeWatermark() {
      try {
        remove()
      }
      catch {
        // 忽略报错
      }
    }

    // 更新水印设置
    function update(config: settingsType = {}) {
      customSettings.value = config
    }

    return {
      update,
    }
  },
)

export default useWatermarkStore
