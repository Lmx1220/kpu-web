<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import LinkView from './components/views/link.vue'
import Search from './components/Search/index.vue'
import HotkeysIntro from './components/HotkeysIntro/index.vue'
import AppSetting from './components/AppSetting/index.vue'
import Headers from './components/Header/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import IframeView from './components/IframeView/index.vue'
import eventBus from '@/util/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useKeepAliveStore from '@/store/modules/keepAlive'
import useMenuStore from '@/store/modules/menu'
import useMainPage from '@/util/composables/useMainPage'
import useMenu from '@/util/composables/useMenu'

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
    if (settingsStore.settings.toolbar.enablePageReload) {
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
</script>

<template>
  <div class="layout">
    <div id="app-main" :class="{ 'main-page-maximize': settingsStore.mainPageMaximizeStatus }">
      <Headers />
      <div class="wrapper">
        <div
          class="sidebar-container"
          :class="{ show: settingsStore.mode === 'mobile' && !settingsStore.settings.menu.subMenuCollapse }"
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
              <svg-icon name="i-ri:logout-box-line" />
            </div>
            <RouterView v-slot="{ Component, route }">
              <transition
                :name="settingsStore.settings.mainPage.enableTransition ? settingsStore.settings.mainPage.transitionMode : ''"
                mode="out-in" appear
              >
                <KeepAlive :include="keepAliveStore.list">
                  <component :is="Component" :key="route.fullPath" />
                </KeepAlive>
              </transition>
            </RouterView>
            <IframeView v-show="isIframe && !isLink" />
            <LinkView v-if="isLink" />
          </div>
          <Copyright />
        </div>
      </div>
      <el-backtop :right="20" :bottom="20" title="回到顶部" />
    </div>
    <Search />
    <HotkeysIntro />
    <div v-if="settingsStore.settings.app.enableAppSetting">
      <svg-icon class="app-setting" name="ep:setting" @click="eventBus.emit('global-app-setting-toggle')" />
      <AppSetting />
    </div>
  </div>
</template>

<style lang="scss" scoped>
[data-app-width-mode="adaption"] {
  #app-main {
    width: 100%;
  }
}

[data-app-width-mode="adaption-min-width"] {
  width: var(--g-app-width);
  min-width: 100%;
}

[data-app-width-mode="center"] {
  #app-main {
    width: var(--g-app-width);
  }
}

[data-app-width-mode="center-max-width"] {
  #app-main {
    width: var(--g-app-width);
    max-width: 100%;
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
  transition: var(--el-transition-all);

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
  box-shadow: -1px 0 0 0 var(--g-box-shadow-color);
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    z-index: 1010;
    top: 0;
    bottom: 0;
    display: flex;
    transition: transform 0.3s, top 0.3s;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
  }

  .sidebar-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    transition: all 0.2s;
    opacity: 0;
    visibility: hidden;

    &.show {
      opacity: 1;
      visibility: visible;
    }
  }

  .main-sidebar-container:not(.main-sidebar-leave-active)+.sub-sidebar-container {
    left: var(--g-main-sidebar-width)
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    background-color: var(--g-main-bg);
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: margin-left .3s, background-color .3s, var(--el-transition-box-shadow);

    .main {
      height: 100%;
      flex: auto;
      position: relative;
      overflow: hidden;
      transition: 0.3s;

      .exit-main-page-maximize {
        position: fixed;
        z-index: 1000;
        right: -40px;
        top: -40px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        cursor: pointer;
        background-color: var(--el-overlay-color-lighter);
        color: #eee;
        transition: background-color .3s, var(--el-transition-color);

        &:hover {
          background-color: var(--el-overlay-color-light);
          color: #fff
        }

        .icon {
          position: absolute;
          bottom: 16px;
          left: 16px;
        }
      }
    }

    .topbar-container {
      &.has-tabbar+.main {
        margin: var(--g-tabbar-height) 0 0;
      }

      &.has-toolbar+.main {
        margin: var(--g-topbar-height) 0 0;
      }

      &.has-toolbar.has-tabbar+.main {
        margin: calc(var(--g-topbar-height) + var(--g-tabbar-height)) 0 0;
      }
    }
  }
}

header:not(.header-leave-active)+.wrapper {
  padding-top: var(--g-header-height);

  .sidebar-container {
    top: var(--g-header-height);

    :deep(.sidebar-logo) {
      display: none;
    }

    :deep(.el-menu) {
      padding-top: 0
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);

      :deep(.tools) {
        display: none
      }

    }
  }
}

.app-setting {
  position: fixed;
  z-index: 10;
  right: 0;
  top: calc(50% + 250px);
  width: 50px;
  height: 50px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 24px;
  color: #fff;
  background-color: var(--el-color-primary);
  cursor: pointer;

  i {
    animation: rotate 5s linear infinite;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0)
  }

  100% {
    transform: rotate(360deg)
  }
}

// #TODO 未完成 侧边栏动画待查
// 主内容区动画
.fade-enter-active,
.slide-left-enter-active,
.slide-right-enter-active,
.slide-top-enter-active,
.slide-bottom-enter-active {
  transition: .2s;
}

.fade-leave-active,
.slide-left-leave-active,
.slide-right-leave-active,
.slide-top-leave-active,
.slide-bottom-leave-active {
  transition: .15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-from {
  opacity: 0;
  margin-left: 20px;
}

.slide-left-leave-to,
.slide-right-enter-from {
  opacity: 0;
  margin-left: -20px;
}

.slide-right-leave-to {
  opacity: 0;
  margin-left: 20px;
}

.slide-top-enter-from {
  opacity: 0;
  margin-top: 20px;
}

.slide-top-leave-to,
.slide-bottom-enter-from {
  opacity: 0;
  margin-top: -20px;
}

.slide-bottom-leave-to {
  opacity: 0;
  margin-top: 20px;
}
</style>
