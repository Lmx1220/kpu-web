<script setup lang="ts">
import useKeepAliveStore from '@/store/modules/keepAlive'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import useWatermarkStore from '@/store/modules/watermark'
import eventBus from '@/utils/eventBus'
import { useTimeoutFn } from '@vueuse/core'
import hotkeys from 'hotkeys-js'
import AppSetting from './components/AppSetting/index.vue'
import BackTop from './components/BackTop/index.vue'
import Copyright from './components/Copyright/index.vue'
import Header from './components/Header/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import Search from './components/Search/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
// import Preferences from './components/Preferences/index.vue'
import HotkeysIntro from './components/HotkeysIntro/index.vue'
import IframeView from './components/views/iframe.vue'
import LinkView from './components/views/link.vue'

defineOptions({
  name: 'Layout',
})

const routeInfo = useRoute()

const settingsStore = useSettingsStore()
const keepAliveStore = useKeepAliveStore()
const menuStore = useMenuStore()
useWatermarkStore()

const mainPage = useMainPage()
const menu = useMenu()

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (settingsStore.settings.menu.mode === 'single' || (['head', 'only-head', 'head-panel'].includes(settingsStore.settings.menu.mode) && settingsStore.mode !== 'mobile')) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})
// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width'))
  if (settingsStore.settings.menu.subMenuCollapse && settingsStore.mode !== 'mobile') {
    actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-collapse-width'))
  }
  if (['only-side', 'only-head', 'side-panel', 'head-panel'].includes(settingsStore.settings.menu.mode) && settingsStore.mode !== 'mobile') {
    actualWidth = 0
  }
  if (
    settingsStore.settings.menu.subMenuOnlyOneHide
    && menuStore.sidebarMenus.length === 1
    && (
      !menuStore.sidebarMenus[0].children
      || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.menu === false)
    )
  ) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})

const isIframe = computed(() => !!routeInfo.meta.iframe)
const isLink = computed(() => !!routeInfo.meta.link)

watch(() => settingsStore.settings.menu.subMenuCollapse, (val) => {
  if (settingsStore.mode === 'mobile') {
    if (!val) {
      document.body.classList.add('overflow-hidden')
    }
    else {
      document.body.classList.remove('overflow-hidden')
    }
  }
})

watch(() => routeInfo.path, () => {
  if (settingsStore.mode === 'mobile') {
    settingsStore.$patch((state) => {
      state.settings.menu.subMenuCollapse = true
    })
  }
})

onMounted(() => {
  hotkeys('f5', (e) => {
    if (settingsStore.settings.toolbar.pageReload) {
      e.preventDefault()
      mainPage.reload()
    }
  })
  hotkeys('alt+`', (e) => {
    if (settingsStore.settings.menu.enableHotkeys) {
      e.preventDefault()
      menu.switchTo(menuStore.actived + 1 < menuStore.allMenus.length ? menuStore.actived + 1 : 0)
    }
  })
  hotkeys('alt+up,alt+down', (e, handle) => {
    e.preventDefault()
    switch (handle.key) {
      case 'alt+up':
        mainPage.maximize(true)
        break
      case 'alt+down':
        mainPage.maximize(false)
        break
    }
  })
})
onUnmounted(() => {
  hotkeys.unbind('f5')
  hotkeys.unbind('alt+`')
  hotkeys.unbind('alt+up,alt+down')
})

let timeout: (() => void) | undefined
function handleMouseenter() {
  timeout?.()
  settingsStore.setHoverSidebar(true)
}
function handleMouseleave() {
  timeout?.()
  ;({ stop: timeout } = useTimeoutFn(() => {
    settingsStore.setHoverSidebar(false)
  }, 300))
}

const enableAppSetting = import.meta.env.VITE_APP_SETTING === 'true'
</script>

<template>
  <div
    class="layout"
    :style="{
      '--g-main-sidebar-actual-width': mainSidebarActualWidth,
      '--g-sub-sidebar-actual-width': subSidebarActualWidth,
    }"
  >
    <div id="app-main" :class="{ 'main-page-maximize': settingsStore.mainPageMaximizeStatus }">
      <Header />
      <div class="wrapper">
        <div class="sidebar-container" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
          <MainSidebar />
          <SubSidebar />
        </div>
        <div class="sidebar-mask" :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()" />
        <div class="main-container" :style="{ 'padding-bottom': routeInfo.meta.paddingBottom }">
          <Topbar />
          <div class="main">
            <div v-show="settingsStore.mainPageMaximizeStatus" class="exit-main-page-maximize" @click="settingsStore.setMainPageMaximize()">
              <SvgIcon name="i-ri:logout-box-line" />
            </div>
            <RouterView v-slot="{ Component, route }">
              <Transition :name="settingsStore.settings.mainPage.enableTransition ? settingsStore.settings.mainPage.transitionMode : ''" mode="out-in">
                <KeepAlive :include="keepAliveStore.list">
                  <component :is="Component" v-show="!(isIframe || isLink)" :key="route.fullPath" />
                </KeepAlive>
              </Transition>
            </RouterView>
            <IframeView v-show="isIframe && !isLink" />
            <LinkView v-if="isLink" />
          </div>
          <Copyright />
        </div>
      </div>
    </div>
    <Search />
    <!--    <Preferences v-if="settingsStore.settings.userPreferences.enable" /> -->
    <HotkeysIntro />
    <template v-if="enableAppSetting">
      <div class="app-setting" @click="eventBus.emit('global-app-setting-toggle')">
        <SvgIcon name="i-uiw:setting-o" class="icon" />
      </div>
      <AppSetting />
    </template>
    <BackTop />
  </div>
</template>

<style scoped>
[data-app-width-mode="adaption"] {
  #app-main {
    width: 100%;
  }
}

[data-app-width-mode="adaption-min-width"] {
  #app-main {
    width: max(var(--g-app-width), 100%);
  }
}

[data-app-width-mode="center"] {
  #app-main {
    width: var(--g-app-width);
  }
}

[data-app-width-mode="center-max-width"] {
  #app-main {
    width: min(var(--g-app-width), 100%);
  }
}

[data-mode="mobile"] {
  #app-main {
    width: 100%;
  }

  .sidebar-container {
    transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));

    [dir="rtl"] & {
      transform: translateX(calc(var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)));
    }

    &.show {
      transform: translateX(0);
    }
  }

  .main-container {
    margin-inline-start: 0 !important;
  }

  &[data-menu-mode="single"] {
    .sidebar-container {
      transform: translateX(calc(var(--g-sub-sidebar-width) * -1));

      [dir="rtl"] & {
        transform: translateX(var(--g-sub-sidebar-width));
      }

      &.show {
        transform: translateX(0);
      }
    }
  }
}

.layout {
  height: 100%;
}

#app-main {
  height: 100%;
  margin: 0 auto;

  /* 当前标签页全屏 */
  &.main-page-maximize {
    header,
    .sidebar-container {
      display: none;
    }

    .wrapper {
      padding-top: 0;

      .main-container {
        margin-inline-start: 0;

        .topbar-container {
          display: none;
        }

        .main {
          margin: 0;
        }
      }
    }

    :deep([data-fixed-calc-width]) {
      width: 100%;
      transform: translateX(-50%);
    }
  }
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1010;
    display: flex;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: width 0.3s, transform 0.3s, box-shadow 0.3s, top 0.3s;

    &:has(> .main-sidebar-container.main-sidebar-enter-active),
    &:has(> .main-sidebar-container.main-sidebar-leave-active) {
      overflow: hidden;
    }
  }

  .sidebar-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    visibility: hidden;
    background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    opacity: 0;
    transition: all 0.2s;

    &.show {
      visibility: visible;
      opacity: 1;
    }
  }

  .main-sidebar-container:not(.main-sidebar-leave-active) + .sub-sidebar-container {
    inset-inline-start: var(--g-main-sidebar-width);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin-inline-start: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    background-color: var(--g-bg);
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: margin-inline-start 0.3s, background-color 0.3s, box-shadow 0.3s;

    .main {
      position: relative;
      flex: auto;
      height: 100%;
      overflow: hidden;
      transition: 0.3s;

      .exit-main-page-maximize {
        --uno: bg-stone-7 dark-bg-stone-3 text-stone-3 dark-text-stone-7 op-50 hover-op-100 transition-opacity;

        position: fixed;
        top: -40px;
        right: -40px;
        z-index: 1000;
        width: 80px;
        height: 80px;
        cursor: pointer;
        border-radius: 50%;

        i {
          position: absolute;
          bottom: 16px;
          left: 16px;
        }
      }
    }

    .topbar-container.has-tabbar + .main {
      margin: var(--g-tabbar-height) 0 0;
    }

    .topbar-container.has-toolbar + .main {
      margin: var(--g-toolbar-height) 0 0;
    }

    .topbar-container.has-tabbar.has-toolbar + .main {
      margin: calc(var(--g-tabbar-height) + var(--g-toolbar-height)) 0 0;
    }
  }
}

header:not(.header-leave-active) + .wrapper {
  padding-top: var(--g-header-height);

  .sidebar-container {
    top: var(--g-header-height);

    :deep(.sub-sidebar-container) .sidebar-logo {
      display: none;
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);
    }
  }
}

.app-setting {
  --uno: text-white dark-text-dark bg-ui-primary;

  position: fixed;
  inset-inline-end: 0;
  top: calc(50% + 250px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 5px 0 0 5px;

  [dir="rtl"] & {
    border-radius: 0 5px 5px 0;
  }

  .icon {
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}

/* 主内容区动画 */
.fade-enter-active,
.slide-left-enter-active,
.slide-right-enter-active,
.slide-top-enter-active,
.slide-bottom-enter-active {
  transition: 0.2s;
}

.fade-leave-active,
.slide-left-leave-active,
.slide-right-leave-active,
.slide-top-leave-active,
.slide-bottom-leave-active {
  transition: 0.15s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-from {
  margin-left: 20px;
  opacity: 0;
}

.slide-left-leave-to {
  margin-left: -20px;
  opacity: 0;
}

.slide-right-enter-from {
  margin-left: -20px;
  opacity: 0;
}

.slide-right-leave-to {
  margin-left: 20px;
  opacity: 0;
}

.slide-top-enter-from {
  margin-top: 20px;
  opacity: 0;
}

.slide-top-leave-to {
  margin-top: -20px;
  opacity: 0;
}

.slide-bottom-enter-from {
  margin-top: -20px;
  opacity: 0;
}

.slide-bottom-leave-to {
  margin-top: 20px;
  opacity: 0;
}
</style>
