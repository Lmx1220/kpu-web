<script setup lang="ts">
import Logo from '../Logo/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import useI18nTitle from '@/util/composables/useI18nTitle'
import useMenu from '@/util/composables/useMenu'
import MainMenu from '@/layouts/components/Menu/index.vue'

defineOptions({
  name: 'MainSidebar',
})
const route = useRoute()
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const { generateI18nTitle } = useI18nTitle()
const { switchTo } = useMenu()
</script>

<template>
  <Transition name="main-sidebar">
    <div
      v-if="['side', 'only-side'].includes(settingsStore.settings.menu.menuMode) || (settingsStore.mode === 'mobile' && settingsStore.settings.menu.menuMode !== 'single')"
      class="main-sidebar-container"
    >
      <Logo :show-title="false" class="sidebar-logo" />
      <div
        v-if="settingsStore.settings.menu.menuMode === 'side' || (settingsStore.mode === 'mobile' && settingsStore.settings.menu.menuMode !== 'single')"
        :class="{
          [`menu-active-${settingsStore.settings.menu.menuActiveStyle}`]: settingsStore.settings.menu.menuActiveStyle !== '',
        }" class="menu flex flex-col of-hidden transition-all"
      >
        <template v-for="(item, index) in menuStore.allMenus">
          <div
            v-if="item.children && item.children.length !== 0" :key="index" :class="{
              'active': index === menuStore.actived,
              'px-2 py-1': settingsStore.settings.menu.isRounded,
            }"
            class="menu-item relative transition-all"
          >
            <div
              :class="{
                'text-[var(--g-main-sidebar-menu-active-color)]! bg-[var(--g-main-sidebar-menu-active-bg)]!': index === menuStore.actived,
                'rounded-2': settingsStore.settings.menu.isRounded,
              }"
              :title="generateI18nTitle(item.meta?.i18n, item.meta?.title)"
              class="group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 py-4 text-[var(--g-main-sidebar-menu-color)] transition-all hover:bg-[var(--g-main-sidebar-menu-hover-bg)] px-2! hover:text-[var(--g-main-sidebar-menu-hover-color)]"
              @click="switchTo(index)"
            >
              <div class="w-full inline-flex flex-1 flex-col items-center justify-center gap-1">
                <SvgIcon
                  v-if="item.meta?.icon" :name="item.meta.icon" :size="20"
                  async class="menu-item-container-icon transition-transform group-hover:scale-120"
                />
                <span
                  class="w-full flex-1 truncate text-center text-sm transition-height transition-opacity transition-width"
                >{{
                  generateI18nTitle(item.meta?.i18n, item.meta?.title)
                }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- 侧边栏精简模式 -->
      <MainMenu
        v-else-if="settingsStore.settings.menu.menuMode === 'only-side'"
        :class="{
          [`menu-active-${settingsStore.settings.menu.menuActiveStyle}`]: settingsStore.settings.menu.menuActiveStyle !== '',
        }"
        :menu="menuStore.allMenus"
        :rounded="settingsStore.settings.menu.isRounded"
        :value="route.meta.activeMenu || route.path"
        class="menu"
        show-collapse-name collapse
      />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
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
        right: -5px;
        width: 0;
        height: 0;
        content: "";
        border-top: 5px solid transparent;
        border-right: 5px solid var(--g-sub-sidebar-bg);
        border-bottom: 5px solid transparent;
        opacity: 0;
        transition: all 0.3s;

        @include position-center(y);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        right: 8px;
        opacity: 1;
      }
    }

    &-line {
      .item-container::before,
      :deep(.menu-item::before) {
        left: 6px;
        width: 4px;
        height: 0;
        content: "";
        background-color: var(--g-main-sidebar-menu-active-bg);
        border-radius: 2px;
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        opacity: 0;
        transition: all 0.3s;

        @include position-center(y);
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
        left: 0;
        width: 10px;
        height: 10px;
        content: "";
        background-color: var(--g-main-sidebar-menu-active-bg);
        border-radius: 50%;
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        opacity: 0;
        transition: all 0.3s;

        @include position-center(y);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        left: 4px;
        opacity: 1;
      }
    }
  }

  .menu {
    flex: 1;
    width: initial;
    overflow: hidden auto;
    overscroll-behavior: contain;
    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    :deep(.menu-item) {
      .menu-item-container {
        padding-block: 8px;
        color: var(--g-main-sidebar-menu-color);

        &:hover {
          color: var(--g-main-sidebar-menu-hover-color);
          background-color: var(--g-main-sidebar-menu-hover-bg);
        }

        .menu-item-container-icon {
          font-size: 24px !important;
        }
      }

      &.active .menu-item-container {
        color: var(--g-main-sidebar-menu-active-color) !important;
        background-color: var(--g-main-sidebar-menu-active-bg) !important;
      }
    }
  }
}

// 主侧边栏动画
.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: 0.3s;
}

.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translate(calc(var(--g-main-sidebar-width) * -1));
}
</style>
