<script setup lang="ts">
import { useSlots } from '@/slots'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import Logo from '../Logo/index.vue'
import Menu from '../Menu/index.vue'
import PanelMenu from '../PanelMenu/index.vue'
import ToolbarRightSide from '../Topbar/Toolbar/rightSide.vue'

defineOptions({
  name: 'LayoutHeader',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { switchTo } = useMenu()

const { generateI18nTitle } = useMenu()

function iconName(isActive: boolean, icon?: string, activeIcon?: string) {
  let name
  if ((!isActive && icon) || (isActive && !activeIcon)) {
    name = icon
  }
  else if (isActive && activeIcon) {
    name = activeIcon
  }
  return name
}
</script>

<template>
  <Transition name="header">
    <header
      v-if="settingsStore.mode === 'pc' && ['head', 'only-head', 'head-panel'].includes(settingsStore.settings.menu.mode)"
    >
      <component :is="useSlots('header-start')" />
      <div class="header-container">
        <Logo class="title" />
        <component :is="useSlots('header-after-logo')" />
        <KpuScrollArea :scrollbar="false" mask horizontal gradient-color="var(--g-header-bg)" class="menu-container h-full flex-1">
          <!-- 顶部模式 -->
          <div
            v-if="settingsStore.settings.menu.mode === 'head'" class="menu h-full flex of-hidden transition-all"
            :class="{
              [`menu-active-${settingsStore.settings.menu.style}`]: settingsStore.settings.menu.style !== '',
            }"
          >
            <template v-for="(item, index) in menuStore.allMenus" :key="index">
              <div
                class="menu-item relative mx-1 py-2 transition-all" :class="{
                  active: index === menuStore.actived,
                }"
              >
                <div
                  v-if="item.children && item.children.length !== 0"
                  class="group menu-item-container relative h-full w-full flex cursor-pointer items-center justify-between gap-1 rounded-lg px-3 text-[var(--g-header-menu-color)] transition-all hover-bg-[var(--g-header-menu-hover-bg)] hover-text-[var(--g-header-menu-hover-color)]"
                  :class="{
                    'text-[var(--g-header-menu-active-color)]! bg-[var(--g-header-menu-active-bg)]!': index === menuStore.actived,
                  }" :title="generateI18nTitle(item.meta?.title)" @click="switchTo(index)"
                >
                  <div class="inline-flex flex-1 items-center justify-center gap-1">
                    <KpuIcon
                      v-if="iconName(index === menuStore.actived, item.meta?.icon, item.meta?.activeIcon)"
                      :name="iconName(index === menuStore.actived, item.meta?.icon, item.meta?.activeIcon)!"
                      class="menu-item-container-icon transition-transform group-hover-scale-120"
                    />
                    <span class="w-full flex-1 truncate text-sm transition-height transition-opacity transition-width">
                      {{ generateI18nTitle(item.meta?.title) }}
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <!-- 顶部精简模式 -->
          <Menu
            v-else-if="settingsStore.settings.menu.mode === 'only-head'"
            :menu="menuStore.allMenus" :value="route.meta.activeMenu || route.path" mode="horizontal" show-collapse-name
            :direction="settingsStore.settings.app.direction"
            class="menu"
            :class="{
              [`menu-active-${settingsStore.settings.menu.style}`]: settingsStore.settings.menu.style !== '',
            }"
          />
          <PanelMenu
            v-else-if="settingsStore.settings.menu.mode === 'head-panel'"
            :menu="menuStore.allMenus"
            :value="route.meta.activeMenu || route.path"
            mode="horizontal"
            show-collapse-name
            :direction="settingsStore.settings.app.direction"
            class="menu"
            :class="{
              [`menu-active-${settingsStore.settings.menu.style}`]: settingsStore.settings.menu.style !== '',
            }"
          />
        </KpuScrollArea>
        <ToolbarRightSide />
      </div>
      <component :is="useSlots('header-end')" />
    </header>
  </Transition>
</template>

<style scoped>
[data-app-width-mode="center"],
[data-app-width-mode="center-max-width"] {
  header {
    width: var(--g-app-width);
    max-width: 100%;
    padding-right: initial;
  }
}

header {
  position: fixed;
  top: 0;
  right: var(--scrollbar-width, 0);
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  width: calc(100% - var(--scrollbar-width, 0px));
  height: var(--g-header-height);
  margin: 0 auto;
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  box-shadow: -1px 0 hsl(var(--border)), 1px 0 hsl(var(--border)), 0 1px hsl(var(--border));
  transition: background-color 0.3s;

  .header-container {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: var(--g-header-width);
    height: 100%;
    padding: 0 12px 0 20px;
    margin: 0 auto;

    :deep(a.title) {
      position: relative;
      flex: 0;
      width: inherit;
      height: inherit;
      padding: 0;
      background-color: inherit;

      .logo {
        width: initial;
        max-width: initial;
        height: min(70%, 50px);
      }

      span {
        font-size: 20px;
        color: var(--g-header-color);
        letter-spacing: 1px;
      }
    }

    .menu-container {
      .menu-active {
        &-arrow {
          .item-container::before,
          :deep(.menu-item::before) {
            position: absolute;
            bottom: 0;
            left: 50%;
            z-index: 1;
            width: 0;
            height: 0;
            content: "";
            border-right: 5px solid transparent;
            border-bottom: 5px solid var(--g-header-bg);
            border-left: 5px solid transparent;
            opacity: 0;
            transition: all 0.3s;
            transform: translate(-50%);
          }

          .item-container.active::before,
          :deep(.menu-item.active::before) {
            bottom: 8px;
            opacity: 1;
          }
        }

        &-line {
          .item-container::before,
          :deep(.menu-item::before) {
            position: absolute;
            bottom: 6px;
            left: 50%;
            z-index: 1;
            width: 0;
            height: 4px;
            content: "";
            background-color: var(--g-header-menu-active-bg);
            border-radius: 2px;
            box-shadow: 0 0 0 1px var(--g-header-bg);
            opacity: 0;
            transition: all 0.3s;
            transform: translate(-50%);
          }

          .item-container.active::before,
          :deep(.menu-item.active::before) {
            width: 20px;
            opacity: 1;
          }
        }

        &-dot {
          .item-container::before,
          :deep(.menu-item::before) {
            position: absolute;
            bottom: 0;
            left: 50%;
            z-index: 1;
            width: 10px;
            height: 10px;
            content: "";
            background-color: var(--g-header-menu-active-bg);
            border-radius: 50%;
            box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
            opacity: 0;
            transition: all 0.3s;
            transform: translate(-50%);
          }

          .item-container.active::before,
          :deep(.menu-item.active::before) {
            bottom: 4px;
            opacity: 1;
          }
        }
      }

      .menu {
        display: inline-flex;
        height: 100%;

        :deep(.menu-item) {
          .menu-item-container {
            color: var(--g-header-menu-color);

            &:hover {
              color: var(--g-header-menu-hover-color);
              background-color: var(--g-header-menu-hover-bg);
            }

            .menu-item-container-icon {
              font-size: 20px !important;
            }

            .badge {
              position: absolute;
              inset-inline-end: 0;
              top: 0.5rem;
              display: inline-flex;
              transform: scale(1);
            }
          }

          &.active .menu-item-container {
            color: var(--g-header-menu-active-color) !important;
            background-color: var(--g-header-menu-active-bg) !important;
          }
        }
      }
    }
  }
}

/* 头部动画 */
.header-enter-active,
.header-leave-active {
  transition: transform 0.3s;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(calc(var(--g-header-height) * -1));
}
</style>
