<script lang="ts" setup>
import { $t } from '@/locales'
import useBingStore from '@/store/modules/bing.ts'
import useSettingsStore from '@/store/modules/settings.ts'
import useUserStore from '@/store/modules/user.ts'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import storage from '@/utils/storage.ts'
import hotkeys from 'hotkeys-js'
import { sample, shuffle } from 'lodash-es'
import { toast } from 'vue-sonner'

defineOptions({
  name: 'Lock',
})
const vFocus: any = {
  mounted(el: HTMLElement) {
    el.querySelector('input')?.focus()
  },
}
// const overlayTransitionClass = ref({
//   enter: 'ease-in-out duration-500',
//   enterFrom: 'opacity-0',
//   enterTo: 'opacity-100',
//   leave: 'ease-in-out duration-500',
//   leaveFrom: 'opacity-100',
//   leaveTo: 'opacity-0',
// })

// const transitionClass = computed(() => {
//   return {
//     enter: 'duration-300 ease-out',
//     enterFrom: '-translate-y-full',
//     enterTo: 'translate-y-0',
//     leave: 'duration-200 ease-in',
//     leaveFrom: 'translate-y-0',
//     leaveTo: '-translate-y-full',
//   }
// })
const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const settingsStore = useSettingsStore()

const [KpuModal, modalApi] = useKpuModal({
  onOpenChange(val) {
    if (settingsStore.lock !== val) {
      settingsStore.lock = val
    }
  },
})
function handleLock() {
  settingsStore.lock = true
  storage.local.set('lock', 'true')
}
function _handleUnLock() {
  settingsStore.lock = false
  storage.local.set('lock', 'false')
}
const bingStore = useBingStore()
const url = 'https://cdn.jsdelivr.net/gh/chuzhixin/image/vab-image-lock/'
const backgroundImg = ref(`${url}${Math.round(31 * Math.random())}.jpg`)
const background = reactive({
  background: '#a0cfff',
  backgroundSize: '100%',
  filter: 'blur(5px)',
  transform: 'scale(1.05)',
  transition: 'all 3s  ease-in-out',
},
)

function randomBackground() {
  background.transform = 'scale(1.05)'
  background.transition = 'none'
  backgroundImg.value = sample(shuffle(bingStore.backgroundList)) || `${url}${Math.round(31 * Math.random())}.jpg`
  background.background = `fixed url(${backgroundImg.value}) center`
  setTimeout(() => {
    background.transform = 'scale(1.2)'
    background.transition = 'all 3s  ease-in-out'
  }, 0)
}

// function validatePass(rule: any, value: string, callback: any) {
//   if (value === '' || value !== '123456') {
//     callback(new Error('请输入正确的密码'))
//   }
//   else {
//     callback()
//   }
// }

const formRef = ref()
const form = ref({
  password: '123456',
})
// const rules = {
//   password: [{ validator: validatePass, trigger: 'blur' }],
// }

async function handleUnLock() {
  // formRef.value.validate(async (valid: boolean) => {
  if (form.value.password === '123456') {
    await _handleUnLock()
  }
  else {
    toast.error('请输入正确的密码', {
    })
  }
  // })
}

watch(() => settingsStore.lock, (val) => {
  if (val) {
    modalApi.open()
  }
  else {
    modalApi.close()
  }
  setTimeout(() => {
    settingsStore.lock ? background.transform = 'scale(1.2)' : background.transform = 'scale(1.05)'
  }, 500)
}, {
  immediate: true,
})
onMounted(() => {
  setTimeout(() => {
    randomBackground()
  }, 50)
  hotkeys('alt+l', (e) => {
    if (settingsStore.settings.toolbar.lock && settingsStore.settings.navSearch.enableHotkeys) {
      e.preventDefault()
      settingsStore.lock = true
    }
  })
})

onUnmounted(() => {
  hotkeys.unbind('alt+l')
})
</script>

<template>
  <div>
    <KpuButton variant="ghost" size="icon" @click="handleLock">
      <KpuIcon name="i-ri:lock-line" :size="16" />
    </KpuButton>
    <KpuModal :fullscreen="true" :header="false" :footer="false" :close-on-press-escape="false" :close-on-click-modal="false" :closable="false" :fullscreen-button="false" class="lock-drawer border-none">
      <div class="screen-lock">
        <div
          id="screen-lock-background"
          class="screen-lock-background"
          :style="background"
        />

        <div class="screen-lock-content">
          <div class="screen-lock-content-title">
            <img width="180px" :src="userStore.avatar" alt="">
            <KpuIcon name="i-ri:lock-2-line" class="i-ri:lock-2-line" />
            {{ $t(title) }} {{ $t('屏幕已锁定') }}
          </div>
          <div class="screen-lock-content-form">
            <div ref="formRef" @submit.prevent>
              <div class="mb-4 flex items-center justify-center">
                <input
                  v-model="form.password"
                  v-focus
                  class="form-input"
                  autocomplete="off"
                  placeholder="请输出密码123456"
                  type="password"
                  @keyup.enter="handleUnLock"
                >
                <KpuButton
                  class="form-button"
                  native-type="submit"
                  type="primary"
                  @click="handleUnLock"
                >
                  <KpuIcon
                    name="i-ri:rotate-lock-2-line"
                    class="i-ri:rotate-lock-2-line"
                  />
                  {{ $t('解锁') }}
                </KpuButton>
              </div>
            </div>
          </div>
          <span @click="randomBackground">{{ $t('切换壁纸') }}</span>
        </div>
      </div>
    </KpuModal>
  </div>
</template>

<style scoped>
.lock-drawer {
  .screen-lock {
    position: relative;
    z-index: 1999;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100vw;

    /* height: calc(var(--vh, 1vh) * 100); */
    height: 100vh;
    font-weight: 700;
    background: rgb(255 255 255);

    /* opacity: var(--opacity-value); */

    &-background {
      position: absolute;
      inset: 0;
      z-index: calc(1999 - 1);
    }

    &-content {
      z-index: 1999;
      width: 400px;
      padding: 40px 55px;
      color: rgb(0 0 0 / 65%);
      text-align: center;
      background: rgb(255 255 255);
      backdrop-filter: blur(10px);
      border: 1px solid rgb(255 255 255);
      border-radius: 15px;

      > span {
        font-size: 12px;
        cursor: pointer;
      }

      &-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 50px;
        color: rgb(0 0 0 / 65%);

        img {
          width: 150px;
          height: 150px;
          padding: 30px;
          cursor: pointer;
          border-radius: 50%;
        }

        [class*="i-ri:"] {
          display: block;
          font-size: 30px;
          color: rgb(0 0 0 / 65%) !important;
        }
      }

      &-form {
        .form-input {
          position: relative;
          width: 180px;
          height: 40px;
          padding-right: 0;
          line-height: 40px;
          border: 1px solid rgb(64 158 255);
          box-shadow: none;

          &:focus-visible {
            outline: none;
          }
        }

        .form-button {
          /*   position: absolute;
          right: -1px;
          z-index: 999; */
          height: 40px;
          margin-left: 0 !important;
          line-height: 40px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;

          [class*="i-ri:"] {
            margin-left: 0 !important;
          }
        }
      }

      @media (width <= 768px) {
        width: 100% !important;
        padding: 40px 35px;
        margin: 5vw;
      }
    }
  }
}
</style>
