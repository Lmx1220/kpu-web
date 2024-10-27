<script setup lang="ts">
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import Logo from '../Logo/index.vue'
import Menu from '../Menu/index.vue'
import PanelMenu from '../PanelMenu/index.vue'

defineOptions({
  name: 'MainSidebar',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { switchTo } = useMenu()

const { generateI18nTitle } = useMenu()
</script>

<template>
  <Transition name="main-sidebar">
    <div
      v-if="['side', 'only-side', 'side-panel'].includes(settingsStore.settings.menu.mode)"
      class="main-sidebar-container"
    >
      <Logo :show-title="false" class="sidebar-logo" />
      <!-- 侧边栏模式（含主导航） -->
      <div class="menu scrollbar-none">
        <div
          v-if="settingsStore.settings.menu.mode === 'side'"
          class="w-full flex flex-col of-hidden transition-all" :class="{
            [`menu-active-${settingsStore.settings.menu.style}`]: settingsStore.settings.menu.style !== '',
          }"
        >
          <template v-for="(item, index) in menuStore.allMenus" :key="index">
            <div
              class="menu-item relative px-2 py-1 transition-all" :class="{
                active: index === menuStore.actived,
              }"
            >
              <div
                v-if="item.children && item.children.length !== 0"
                class="group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 py-4 text-[var(--g-main-sidebar-menu-color)] transition-all hover-(bg-[var(--g-main-sidebar-menu-hover-bg)] text-[var(--g-main-sidebar-menu-hover-color)]) px-2!"
                :class="{
                  'text-[var(--g-main-sidebar-menu-active-color)]! bg-[var(--g-main-sidebar-menu-active-bg)]!': index === menuStore.actived,
                  'rounded-lg': settingsStore.settings.menu.isRounded,
                }" :title="generateI18nTitle(item?.title)" @click="switchTo(index)"
              >
                <div class="w-full inline-flex flex-1 flex-col items-center justify-center gap-1">
                  <SvgIcon
                    v-if=" item?.icon"
                    :name="item?.icon"
                    class="menu-item-container-icon transition-transform group-hover-scale-120"
                  />
                  <span
                    class="w-full flex-1 truncate text-center text-sm transition-height transition-opacity transition-width"
                  >
                    {{ generateI18nTitle(item?.title) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <!-- 侧边栏精简模式 -->
        <Menu
          v-else-if="settingsStore.settings.menu.mode === 'only-side'"
          :menu="menuStore.allMenus" :value="route.meta.activeMenu || route.path" show-collapse-name collapse
          :rounded="settingsStore.settings.menu.isRounded" :direction="settingsStore.settings.app.direction"
          class="-mt-2"
          :class="{
            [`menu-active-${settingsStore.settings.menu.style}`]: settingsStore.settings.menu.style !== '',
          }"
        />
        <PanelMenu
          v-else-if="settingsStore.settings.menu.mode === 'side-panel'"
          :menu="menuStore.allMenus"
          :value="route.meta.activeMenu || route.path"
          show-collapse-name collapse
          :rounded="settingsStore.settings.menu.isRounded" :direction="settingsStore.settings.app.direction"
          class="-mt-2"
          :class="{
            [`menu-active-${settingsStore.settings.menu.style}`]: settingsStore.settings.menu.style !== '',
          }"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.main-sidebar-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  box-shadow: 1px 0 0 0 var(--g-border-color);
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

  .sidebar-logo {
    background-color: var(--g-main-sidebar-bg);
    transition: background-color 0.3s;
  }

  .menu-active {
    &-arrow {
      .item-container::before,
      :deep(.menu-item::before) {
        position: absolute;
        inset-inline-end: -5px;
        top: 50%;
        width: 0;
        height: 0;
        content: "";
        border-block: 5px solid transparent;
        border-inline-end: 5px solid var(--g-main-sidebar-bg);
        opacity: 0;
        transition: all 0.3s;
        transform: translateY(-50%);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        inset-inline-end: 8px;
        opacity: 1;
      }
    }

    &-line {
      .item-container::before,
      :deep(.menu-item::before) {
        position: absolute;
        inset-inline-start: 6px;
        top: 50%;
        width: 4px;
        height: 0;
        content: "";
        background-color: var(--g-main-sidebar-menu-active-bg);
        border-radius: 2px;
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        opacity: 0;
        transition: all 0.3s;
        transform: translateY(-50%);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        height: 20px;
        opacity: 1;
      }
    }

    &-dot {
      .item-container::before,
      :deep(.menu-item::before) {
        position: absolute;
        inset-inline-start: 0;
        top: 50%;
        width: 10px;
        height: 10px;
        content: "";
        background-color: var(--g-main-sidebar-menu-active-bg);
        border-radius: 50%;
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        opacity: 0;
        transition: all 0.3s;
        transform: translateY(-50%);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        inset-inline-start: 4px;
        opacity: 1;
      }
    }
  }

  .menu {
    flex: 1;
    width: initial;
    overflow: hidden auto;
    overscroll-behavior: contain;

    :deep(.menu-item) {
      .menu-item-container {
        padding-block: 8px;
        color: var(--g-main-sidebar-menu-color);

        &:hover {
          color: var(--g-main-sidebar-menu-hover-color);
          background-color: var(--g-main-sidebar-menu-hover-bg);
        }

        .menu-item-container-icon {
          font-size: 20px !important;
        }
      }

      &.active .menu-item-container {
        color: var(--g-main-sidebar-menu-active-color) !important;
        background-color: var(--g-main-sidebar-menu-active-bg) !important;
      }
    }
  }
}

/* 主侧边栏动画 */
.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: 0.3s;
}

.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translateX(calc(var(--g-main-sidebar-width) * -1));

  [dir="rtl"] & {
    transform: translateX(var(--g-main-sidebar-width));
  }
}
</style>
