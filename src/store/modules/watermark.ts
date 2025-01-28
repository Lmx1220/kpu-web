import type { WatermarkOptions } from 'watermark-js-plus'
import { Watermark } from 'watermark-js-plus'
import useSettingsStore from './settings'
import useUserStore from './user'

const useWatermarkStore = defineStore(
  // 唯一ID
  'watermark',
  () => {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()

    const customSettings = ref<Partial<WatermarkOptions>>()
    const settings = computed({
      get() {
        return Object.assign(
          // 水印更多设置请查看 watermark.ts
          {
            contentType: 'multi-line-text',
            content: `Kpu-admin
                      当前用户：${userStore.account}`,
            fontColor: settingsStore.currentColorScheme === 'light' ? '#000' : '#fff',
            globalAlpha: 0.1,
            width: 200,
            height: 200,
          },
          customSettings.value,
        )
      },
      set(val) {
        update(val)
      },
    })

    const watermark = new Watermark(settings.value)
    watch(settings, async () => {
      if (settingsStore.settings.app.enableWatermark) {
        await watermark.check()
        watermark.changeOptions(settings.value)
      }
    }, {
      deep: true,
    })
    watch(() => settingsStore.settings.app.enableWatermark, (val) => {
      if (val) {
        watermark.create()
      }
      else {
        watermark.destroy()
      }
    }, {
      immediate: true,
    })

    watch(() => settingsStore.settings.app.colorScheme, async () => {
      if (settingsStore.settings.app.enableWatermark) {
        await watermark.check()
        await nextTick()

        watermark.changeOptions(settings.value)
      }
    })

    // 更新水印设置
    function update(config: Partial<WatermarkOptions> = {}) {
      customSettings.value = config
    }

    return {
      update,
    }
  },
)

export default useWatermarkStore
