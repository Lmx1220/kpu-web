<script setup lang="ts">
import Logo from '../Logo/index.vue'
import ToolbarRightSide from '../Topbar/rightSide.vue'
import Menu from '../Menu/index.vue'
import PanelMenu from '../PanelMenu/index.vue'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'LayoutHeader',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { generateI18nTitle, switchTo } = useMenu()

const menuRef = ref()

// 顶部模式鼠标滚动
function handlerMouserScroll(event: WheelEvent) {
  if (event.deltaY || event.detail !== 0) {
    menuRef.value.scrollBy({
      left: (event.deltaY || event.detail) > 0 ? 50 : -50,
    })
  }
}
</script>

<template>
  <Transition name="header">
    <header
      v-if=" ['head', 'only-head', 'head-panel'].includes(settingsStore.settings.menu.mode)"
    >
      <div class="header-container">
        <Logo class="title" />
        <div ref="menuRef" class="menu-container scrollbar-none" @wheel.prevent="handlerMouserScroll">
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
                  class="group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 px-3 text-[var(--g-header-menu-color)] transition-all hover-(bg-[var(--g-header-menu-hover-bg)] text-[var(--g-header-menu-hover-color)])"
                  :class="{
                    'text-[var(--g-header-menu-active-color)]! bg-[var(--g-header-menu-active-bg)]!': index === menuStore.actived,
                    'rounded-2': settingsStore.settings.menu.isRounded,
                  }" :title="generateI18nTitle(item?.title)" @click="switchTo(index)"
                >
                  <div class="inline-flex flex-1 items-center justify-center gap-1">
                    <SvgIcon
                      v-if="item?.icon"
                      :name="item?.icon"
                      class="menu-item-container-icon transition-transform group-hover-scale-120"
                    />
                    <span class="w-full flex-1 truncate text-sm transition-height transition-opacity transition-width">
                      {{ generateI18nTitle(item?.title) }}
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
            :rounded="settingsStore.settings.menu.isRounded" :direction="settingsStore.settings.app.direction"
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
            :rounded="settingsStore.settings.menu.isRounded"
            panel
            :direction="settingsStore.settings.app.direction"
            class="menu"
            :class="{
              [`menu-active-${settingsStore.settings.menu.style}`]: settingsStore.settings.menu.style !== '',
            }"
          />
        </div>
        <ToolbarRightSide />
      </div>
    </header>
  </Transition>
</template>

<style scoped>
[data-app-width-mode="center"],
[data-app-width-mode="center-max-width"] {
  header {
    width: var(--g-app-width);
    max-width: 100%;
  }
}

header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--g-header-height);
  padding: 0 20px;
  margin: 0 auto;
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color), 0 1px 0 0 var(--g-border-color);
  transition: background-color 0.3s;

  .header-container {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    width: var(--g-header-width);
    height: 100%;
    margin: 0 auto;

    :deep(a.title) {
      position: relative;
      flex: 0;
      width: inherit;
      height: inherit;
      padding: inherit;
      background-color: inherit;

      .logo {
        width: initial;
        height: 40px;
      }

      span {
        font-size: 20px;
        color: var(--g-header-color);
        letter-spacing: 1px;
      }
    }

    .menu-container {
      flex: 1;
      height: 100%;
      padding: 0 20px;
      overflow-x: auto;
      mask-image: linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent);

      .menu-active {
        &-arrow {
          .item-container::before,
          :deep(.menu-item::before) {
            bottom: 0;
            left: 50%;
            width: 0;
            height: 0;
            content: "";
            border-right: 5px solid transparent;
            border-bottom: 5px solid var(--g-header-bg);
            border-left: 5px solid transparent;
            opacity: 0;
            transition: all 0.3s;
            transform: translateX(-50%);
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
            bottom: 6px;
            left: 50%;
            width: 0;
            height: 4px;
            content: "";
            background-color: var(--g-header-menu-active-bg);
            border-radius: 2px;
            box-shadow: 0 0 0 1px var(--g-header-bg);
            opacity: 0;
            transition: all 0.3s;
            transform: translateX(-50%);
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
            bottom: 0;
            left: 50%;
            width: 10px;
            height: 10px;
            content: "";
            background-color: var(--g-header-menu-active-bg);
            border-radius: 50%;
            box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
            opacity: 0;
            transition: all 0.3s;
            transform: translateX(-50%);
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
          }

          &.active .menu-item-container {
            color: var(--g-header-menu-active-color) !important;
            background-color: var(--g-header-menu-active-bg) !important;
          }
        }
      }
    }
  }

  @media screen and (max-width: $g-header-width) {
    .header-container {
      width: 100%;
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
