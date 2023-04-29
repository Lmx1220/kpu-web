<script setup lang="ts" name="SubSidebar">
import Logo from '../Logo/index.vue'
import SidebarItem from '../SidebarItem/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const sidebarScrollTop = ref(0)
function onSidebarScroll(e: Event) {
  sidebarScrollTop.value = (e.target as HTMLElement).scrollTop
}
const enableSidebar = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode)
    && menuStore.sidebarMenus.length !== 0
    && !(
      settingsStore.settings.menu.subMenuOnlyOneHide
      && menuStore.sidebarMenus.length === 1
      && (
        !menuStore.sidebarMenus[0].children
        || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.sidebar === false)
      )
    )
  )
})
</script>

<template>
  <div
    v-if="enableSidebar" class="sub-sidebar-container" :class="{
      'is-collapse': settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse,
    }" @scroll="onSidebarScroll"
  >
    <Logo
      :show-logo="settingsStore.settings.menu.menuMode === 'single'" class="sidebar-logo" :class="{
        'sidebar-logo-bg': settingsStore.settings.menu.menuMode === 'single',
        'shadow': sidebarScrollTop,
      }"
    />
    <!-- 侧边栏模式（无主导航）或侧边栏精简模式 -->
    <el-menu
      :unique-opened="settingsStore.settings.menu.subMenuUniqueOpened"
      :default-openeds="menuStore.defaultOpenedPaths" :default-active="$route.meta.activeMenu || $route.path"
      :collapse="settingsStore.mode === 'pc' && settingsStore.settings.menu.subMenuCollapse" :collapse-transition="false"
      :class="{
        'is-collapse-without-logo': settingsStore.settings.menu.menuMode !== 'single' && settingsStore.settings.menu.subMenuCollapse,
        [`menu-${settingsStore.settings.menu.menuFillStyle}`]: settingsStore.settings.menu.menuFillStyle !== '',
      }"
    >
      <transition-group name="sub-sidebar">
        <template v-for="(route, index) in menuStore.sidebarMenus">
          <SidebarItem
            v-if="route.meta?.sidebar !== false" :key="route.path || index" :item="route"
            :base-path="route.path || ''"
          />
        </template>
      </transition-group>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.sub-sidebar-container {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  // firefox隐藏滚动条
  scrollbar-width: none;

  // chrome隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  width: var(--g-sub-sidebar-width);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: var(--g-sub-sidebar-bg);
  box-shadow: 10px 0 10px -10px var(--g-box-shadow-color);
  transition: background-color 0.3s,
  var(--el-transition-box-shadow),
  left 0.3s,
  width 0.3s;

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

    .el-menu {
      width: var(--g-sub-sidebar-collapse-width);
    }
  }

  .sidebar-logo {
    background-color: var(--g-sub-sidebar-bg);
    transition: background-color 0.3s, var(--el-transition-box-shadow);

    &:not(.sidebar-logo-bg) {
      :deep(span) {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color);
      }
    }

    &.sidebar-logo-bg {
      background-color: var(--g-main-sidebar-bg);
    }

    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  .el-menu {
    border-right: 0;
    padding-top: var(--g-sidebar-logo-height);
    background-color: var(--g-sub-sidebar-bg);
    transition: background-color 0.3s, var(--el-transition-color), var(--el-transition-border), padding-top 0.3s;

    &:not(.el-menu--collapse) {
      width: inherit;
    }

    &.is-collapse-without-logo {
      padding-top: 0;
    }

    &.el-menu--collapse {
      :deep(.title-icon) {
        margin-right: 0;
      }

      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        span,
        .el-sub-menu__icon-arrow {
          display: none;
        }
      }
    }

    &.menu-radius:not(.el-menu--collapse) {
      .sidebar-item {
        padding: 0 10px;

        &:first-child {
          padding-top: 10px;
        }

        &:last-child {
          padding-bottom: 10px;
        }
      }

      :deep(.el-menu--inline),
      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        border-radius: 10px;
      }
    }
  }
}

// 次侧边栏动画
.sub-sidebar-enter-active {
  transition: 0.3s;
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
