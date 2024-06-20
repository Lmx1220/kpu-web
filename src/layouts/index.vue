<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import { useTimeoutFn } from '@vueuse/core'
import AppSetting from './components/AppSetting/index.vue'
import Headers from './components/Header/index.vue'
import HotkeysIntro from './components/HotkeysIntro/index.vue'
import Copyright from './components/Copyright/index.vue'
import IframeView from './components/IframeView/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import Search from './components/Search/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import LinkView from './components/views/link.vue'
import eventBus from '@/util/eventBus'
import useMenu from '@/util/composables/useMenu'
import useMainPage from '@/util/composables/useMainPage'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import useKeepAliveStore from '@/store/modules/keepAlive'
import BackTop from '@/layouts/components/BackTop/index.vue'

defineOptions({
  name: 'Layout',
})
const route = useRoute()
const mainPage = useMainPage()
const menu = useMenu()
const settingsStore = useSettingsStore()
const keepAliveStore = useKeepAliveStore()
const menuStore = useMenuStore()
const isIframe = computed(() => !!route.meta.iframe)
const isLink = computed(() => !!route.meta.link)
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
  hotkeys('alt+up,alt+down', (e, hotkeysEvent) => {
    if (settingsStore.settings.menu.enableHotkeys) {
      e.preventDefault()
      switch (hotkeysEvent.key) {
        case 'alt+up':
          mainPage.maximize(true)
          break
        case 'alt+down':
          mainPage.maximize(false)
          break
      }
    }
  })
})
onUnmounted(() => {
  hotkeys.unbind('f5')
  hotkeys.unbind('alt+`')
  hotkeys.unbind('alt+up,alt+down')
})
let stops: Fn | null

function mouseenter() {
  stops && stops()
  settingsStore.setHoverSidebar(true)
}

function mouseleave() {
  stops == null || stops()

  const { stop } = useTimeoutFn(() => {
    settingsStore.setHoverSidebar(!1)
  }
  , 300)
  stops = stop
}

const enableAppSetting = import.meta.env.VITE_APP_SETTING === 'true'
</script>

<template>
  <div class="layout">
    <div id="app-main" :class="{ 'main-page-maximize': settingsStore.mainPageMaximizeStatus }">
      <Headers />
      <div class="wrapper">
        <div
          class="sidebar-container"
          :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <MainSidebar />
          <SubSidebar />
        </div>
        <!-- 手机模式,打开菜单栏屏障 -->
        <div
          class="sidebar-mask"
          :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }"
          @click="settingsStore.toggleSidebarCollapse()"
        />
        <div class="main-container" :style="{ paddingBottom: route.meta.paddingBottom }">
          <Topbar />
          <div class="main">
            <div
              v-show="settingsStore.mainPageMaximizeStatus" class="exit-main-page-maximize"
              @click="settingsStore.setMainPageMaximize()"
            >
              <SvgIcon name="i-ri:logout-box-line" />
            </div>
            <RouterView v-slot="{ Component, route }">
              <!--              <transition name="main" mode="out-in" appear> -->
              <Transition
                :name="settingsStore.settings.mainPage.enableTransition ? settingsStore.settings.mainPage.transitionMode : ''"
                mode="out-in" appear
              >
                <KeepAlive :include="keepAliveStore.list">
                  <component :is="Component" :key="route.fullPath" />
                </KeepAlive>
                <!--                <component :is="Component" :key="route.fullPath" /> -->
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

<style lang="scss" scoped>
[data-app-width-mode="adaption"] {
  #app-main {
    width: 100%;
  }
}

[data-app-width-mode="adaption-min-width"] #app-main {
  width: max(var(--g-app-width), 100%);
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
    transform: translate(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));

    &.show {
      transform: translate(0);
    }
  }

  .main-container {
    margin-left: 0 !important;
  }

  &[data-men-mode="signle"] {
    .sidebar-container {
      transform: translate(calc(var(--g-sub-sidebar-width) * -1));

      &.show {
        transform: translate(0);
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

  &.main-page-maximize {
    header,
    .sidebar-container {
      display: none;
    }

    .wrapper {
      padding-top: 0;

      .main-container {
        margin-left: 0;

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
    left: var(--g-main-sidebar-width);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    background-color: var(--g-bg);
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: margin-left 0.3s, background-color 0.3s, box-shadow 0.3s;

    .main {
      position: relative;
      flex: auto;
      height: 100%;
      overflow: hidden;
      transition: 0.3s;

      .exit-main-page-maximize {
        --at-apply:
          bg-stone-7 color-stone-3
          dark: bg-stone-3
          dark: color-stone-7;

        position: fixed;
        top: -40px;
        right: -40px;
        z-index: 1000;
        width: 80px;
        height: 80px;
        cursor: pointer;
        border-radius: 50%;
        opacity: 0.5;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 0.15s;
        transition-property: opacity;

        &:hover {
          opacity: 1;
        }

        i {
          position: absolute;
          bottom: 16px;
          left: 16px;
        }
      }
    }

    .topbar-container {
      &.has-tabbar + .main {
        margin: var(--g-tabbar-height) 0 0;
      }

      &.has-toolbar + .main {
        margin: var(--g-toolbar-height) 0 0;
      }

      &.has-toolbar.has-tabbar + .main {
        margin: calc(var(--g-toolbar-height) + var(--g-tabbar-height)) 0 0;
      }
    }
  }
}

header:not(.header-leave-active) + .wrapper {
  padding-top: var(--g-header-height);

  .sidebar-container {
    top: var(--g-header-height);

    :deep(.sidebar-logo) {
      display: none;
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);

      :deep(.tools) {
        display: none;
      }
    }
  }
}

.app-setting {
  @apply bg-ui-primary color-white dark:color-dark ;

  position: fixed;
  top: calc(50% + 250px);
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  .icon {
    animation: rotate 5s linear infinite;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-from {
  margin-left: 20px;
  opacity: 0;
}

.slide-left-leave-to,
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

.slide-top-leave-to,
.slide-bottom-enter-from {
  margin-top: -20px;
  opacity: 0;
}

.slide-bottom-leave-to {
  margin-top: 20px;
  opacity: 0;
}
</style>
