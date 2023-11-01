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
              class="menu-item-container w-full h-full flex justify-between items-center gap-1 px-2! py-4 transition-all cursor-pointer group text-[var(--g-main-sidebar-menu-color)] hover:(text-[var(--g-main-sidebar-menu-hover-color)] bg-[var(--g-main-sidebar-menu-hover-bg)])"
              @click="switchTo(index)"
            >
              <div class="inline-flex flex-col justify-center items-center flex-1 gap-[2px] w-full">
                <SvgIcon
                  v-if="item.meta?.icon" :name="item.meta.icon" :size="20"
                  async class="menu-item-container-icon transition-transform group-hover:scale-120"
                />
                <span
                  class="flex-1 text-sm w-full text-center truncate transition-width transition-height transition-opacity"
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
        class="menu" collapse
        show-collapse-name
      />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.main-sidebar-container {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  box-shadow: 1px 0 0 0 var(--g-border-color);
  transition: background-color .3s, color .3s, box-shadow .3s;
  .sidebar-logo {
    background-color: var(--g-main-sidebar-bg);
    transition: background-color .3s;
  }

  .menu-active {
    &-arrow {
      .item-container::before,
      :deep(.menu-item::before) {
        content: "";
        opacity: 0;
        right: -5px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 5px solid var(--g-sub-sidebar-bg);
        transition: all 0.3s;

        @include position-center(y);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        opacity: 1;
        right: 8px;
      }
    }

    &-line {
      .item-container::before,
      :deep(.menu-item::before) {
        content: "";
        opacity: 0;
        left: 6px;
        width: 4px;
        height: 0;
        border-radius: 2px;
        background-color: var(--g-main-sidebar-menu-active-bg);
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        transition: all .3s;

        @include position-center(y);
      }

      .item-container.active::before,
      :deep(.menu-item.active::before) {
        opacity: 1;
        height: 20px;
      }
    }

    &-dot {
      .item-container::before,
      :deep(.menu-item::before) {
        content: "";
        opacity: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--g-main-sidebar-menu-active-bg);
        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
        transition: all 0.3s;

        @include position-center(y);
      }
      .item-container.active::before,
      :deep(.menu-item.active::before) {
        opacity: 1;
        left: 4px;
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
        height: 60px;
        padding: 0 5px;
        color: var(--g-main-sidebar-menu-color);
        background-color: var(--g-main-sidebar-menu-bg);

        .menu-item-container-icon {
          transform: scale(1);
          font-size: 24px !important;
        }
      }

      &:hover .menu-item-container {
        color: var(--g-main-sidebar-menu-hover-color);
        background-color: var(--g-main-sidebar-menu-hover-bg)
      }

      &.active .menu-item-container {
        color: var(--g-main-sidebar-menu-active-color) !important;
        background-color: var(--g-main-sidebar-menu-active-bg) !important
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
  transform: translate(calc(var(--g-main-sidebar-width) * -1))
}
</style>
