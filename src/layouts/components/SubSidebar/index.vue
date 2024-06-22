<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import Logo from '../Logo/index.vue'
import Menu from '../Menu/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

defineOptions({
  name: 'SubSidebar',
})

const route = useRoute()
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const subSidebarRef = ref()
const showShadowTop = ref(false)
const showShadowBottom = ref(false)
function onSidebarScroll() {
  const scrollTop = subSidebarRef.value.scrollTop
  showShadowTop.value = scrollTop > 0
  const clientHeight = subSidebarRef.value.clientHeight
  const scrollHeight = subSidebarRef.value.scrollHeight
  showShadowBottom.value = Math.ceil(scrollTop + clientHeight) < scrollHeight
}
const menuRef = ref()

onMounted(() => {
  onSidebarScroll()
  const { height } = useElementSize(menuRef)
  watch(() => height.value, () => {
    if (height.value > 0) {
      onSidebarScroll()
    }
  }, {
    immediate: true,
  })
})
const enableSidebar = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode)
    && menuStore.sidebarMenus.length !== 0
    && !(
      settingsStore.settings.menu.subMenuOnlyOneHide
      && menuStore.sidebarMenus.length === 1
      && (
        !menuStore.sidebarMenus[0].children
        || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.menu === false)
      )
    )
  )
})
const isCollapse = computed(() => {
  if (settingsStore.mode === 'pc') {
    return !!(settingsStore.settings.menu.subMenuCollapse && (!settingsStore.isHoverSidebar || (settingsStore.isHoverSidebar && !settingsStore.settings.menu.subMenuAutoCollapse)))
  }
  else {
    return settingsStore.settings.menu.subMenuCollapse
  }
})
</script>

<template>
  <div
    v-if="enableSidebar" class="sub-sidebar-container" :class="{
      'is-collapse': isCollapse,
      'shadow-side': settingsStore.isHoverSidebar && settingsStore.settings.menu.subMenuAutoCollapse && settingsStore.settings.menu.subMenuCollapse,
    }"
  >
    <Logo
      :class="{
        'sidebar-logo-bg': settingsStore.settings.menu.menuMode === 'single',
      }" :show-logo="settingsStore.settings.menu.menuMode === 'single'"
      class="sidebar-logo"
    />
    <div
      ref="subSidebarRef"
      class="sub-sidebar flex-1 transition-shadow-300"
      :class="{
        'shadow-top': showShadowTop,
        'shadow-bottom': showShadowBottom,
      }" @scroll="onSidebarScroll"
    >
      <!-- 侧边栏模式（无主导航）或侧边栏精简模式 -->
      <div ref="menuRef">
        <TransitionGroup name="sub-sidebar">
          <template v-for="(mainItem, mainIndex) in menuStore.allMenus" :key="mainIndex">
            <div v-show="mainIndex === menuStore.actived">
              <Menu
                :accordion="settingsStore.settings.menu.subMenuUniqueOpened"
                :collapse="isCollapse"
                :default-openeds="menuStore.defaultOpenedPaths"
                :always-openeds="menuStore.alwaysOpenedPaths"
                :menu="mainItem.children"
                :rounded="settingsStore.settings.menu.isRounded"
                :value="route.meta.activeMenu || route.path" class="menu"
              />
            </div>
          </template>
        </TransitionGroup>
      </div>
    </div>
    <div
      v-if="settingsStore.mode === 'pc'"
      class="relative flex items-center px-4 py-3"
      :class="{
        'justify-center': isCollapse,
        'justify-between': !isCollapse && settingsStore.settings.menu.enableSubMenuCollapseButton,
        'justify-end': !isCollapse && !settingsStore.settings.menu.enableSubMenuCollapseButton,
      }"
    >
      <span
        v-show="!isCollapse || isCollapse && !settingsStore.settings.menu.enableSubMenuCollapseButton"
        class="flex-center cursor-pointer rounded bg-stone-1 p-2 transition dark-bg-stone-9 hover:bg-stone-2 dark-hover:bg-stone-8"
        @click="() => settingsStore.toggleSidebarAutoCollapse()"
      >
        <SvgIcon :name="settingsStore.settings.menu.subMenuAutoCollapse ? 'i-lucide:pin-off' : 'i-lucide:pin'" />
      </span>
      <span
        v-show="settingsStore.settings.menu.enableSubMenuCollapseButton"
        class="flex-center cursor-pointer rounded bg-stone-1 p-2 transition dark-bg-stone-9 hover:bg-stone-2 dark-hover:bg-stone-8"
        :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }"
        @click="() => settingsStore.toggleSidebarCollapse()"
      >
        <SvgIcon name="toolbar-collapse" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-sidebar-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: var(--g-sub-sidebar-width);
  background-color: var(--g-sub-sidebar-bg);
  transition: background-color 0.3s, left 0.3s, width 0.3s;

  &.is-collapse {
    width: var(--g-sub-sidebar-collapse-width);

    .sidebar-logo {
      &:not(.sidebar-logo-bg) {
        display: none;
      }

      :deep(span) {
        display: none;
      }
    }
  }

  .sidebar-logo {
    background-color: var(--g-sub-sidebar-bg);
    transition: background-color 0.3s;

    &.sidebar-logo-bg {
      background-color: var(--g-sub-sidebar-logo-bg);

      :deep(span) {
        color: var(--g-sub-sidebar-logo-color);
      }
    }
  }

  .sub-sidebar {
    overflow: hidden auto;
    overscroll-behavior: contain;

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    &.shadow {
      box-shadow: inset 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  .menu {
    width: 100%;
  }
}

// 次侧边栏动画
.sub-sidebar-enter-active {
  transition: 0.2s;
}

.sub-sidebar-enter-from,
.sub-sidebar-leave-active {
  opacity: 0;
  transform: translateY(30px) skewY(10deg);
}

.sub-sidebar-leave-active {
  position: absolute;
}
</style>
