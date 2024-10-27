<script lang="ts" setup>
import useBingStore from '@/store/modules/bing.ts'
import useSettingsStore from '@/store/modules/settings.ts'
import useUserStore from '@/store/modules/user.ts'
import storage from '@/utils/storage.ts'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import hotkeys from 'hotkeys-js'
import { sample, shuffle } from 'lodash-es'
import { useI18n } from 'vue-i18n'
import Message from 'vue-m-message'

defineOptions({
  name: 'Lock',
})
const vFocus: any = {
  mounted(el: HTMLElement) {
    el.querySelector('input')?.focus()
  },
}
const overlayTransitionClass = ref({
  enter: 'ease-in-out duration-500',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in-out duration-500',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
})

const transitionClass = computed(() => {
  return {
    enter: 'duration-300 ease-out',
    enterFrom: '-translate-y-full',
    enterTo: 'translate-y-0',
    leave: 'duration-200 ease-in',
    leaveFrom: 'translate-y-0',
    leaveTo: '-translate-y-full',
  }
})
const { t } = useI18n()
const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const settingsStore = useSettingsStore()

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
    Message.error('请输入正确的密码', {
      zIndex: 2001,
    })
  }
  // })
}

watch(() => settingsStore.lock, () => {
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
  <div class="flex-center cursor-pointer px-2 py-1">
    <svg-icon name="i-ri:lock-line" @click="handleLock" />
    <TransitionRoot
      as="template"
      appear :show="settingsStore.lock"
    >
      <Dialog
        class="lock-drawer fixed inset-0 z-2000 flex backdrop-filter-none" @close="settingsStore.lock = false"
      >
        <TransitionChild as="template" v-bind="overlayTransitionClass" :class="overlayTransitionClass.enterFrom" appear>
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
        <TransitionChild as="template" v-bind="transitionClass" :class="transitionClass.enterFrom" appear>
          <DialogPanel class="overflow-hidden! p-0!" relative w-full w-screen flex flex-1 flex-col bg-white dark-bg-stone-8 focus-outline-none>
            <div class="screen-lock">
              <div
                id="screen-lock-background"
                class="screen-lock-background"
                :style="background"
              />

              <div class="screen-lock-content">
                <div class="screen-lock-content-title">
                  <img width="180px" :src="userStore.avatar" alt="">
                  <svg-icon name="i-ri:lock-2-line" class="i-ri:lock-2-line" />
                  {{ t(title) }} {{ t('屏幕已锁定') }}
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
                      <HButton
                        class="form-button"
                        native-type="submit"
                        type="primary"
                        @click="handleUnLock"
                      >
                        <svg-icon
                          name="i-ri:rotate-lock-2-line"
                          class="i-ri:rotate-lock-2-line"
                        />
                        {{ t('解锁') }}
                      </HButton>
                    </div>
                  </div>
                </div>
                <span @click="randomBackground">{{ t('切换壁纸') }}</span>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
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
        line-height: 50px;
        color: rgb(0 0 0 / 65%);
        text-align: center;

        img {
          width: 150px;
          height: 150px;
          padding: 30px;
          cursor: pointer;
          border-radius: 50%;
        }

        [class*="i-ri:"] {
          display: block;
          margin: auto !important;
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
