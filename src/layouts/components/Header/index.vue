<script lang="ts" setup>
import Logo from '../Logo/index.vue'
import Tools from '../Tools/index.vue'
import SidebarItem from '../SidebarItem/index.vue'
import useI18nTitle from '@/util/composables/useI18nTitle'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import useMenu from '@/util/composables/useMenu'

defineOptions({
  name: 'Headers',
})
const route = useRoute()
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const { switchTo } = useMenu()

const { generateI18nTitle } = useI18nTitle()
</script>

<template>
  <transition name="header">
    <header v-if="settingsStore.mode === 'pc' && ['head', 'only-head'].includes(settingsStore.settings.menu.menuMode)">
      <div class="header-container">
        <div class="main">
          <Logo />
          <!-- 顶部模式 -->
          <div
            v-if="settingsStore.settings.menu.menuMode === 'head'"
            class="nav" :class="{
              [`nav-fill-${settingsStore.settings.menu.menuFillStyle}`]: settingsStore.settings.menu.menuFillStyle !== '',
              [`nav-active-${settingsStore.settings.menu.menuActiveStyle}`]: settingsStore.settings.menu.menuActiveStyle !== '',
            }"
          >
            <template v-for="(item, index) in menuStore.allMenus" :key="index">
              <div v-if="item.children && item.children.length !== 0" class="item-container" :class="{ active: index === menuStore.actived }">
                <div class="item" @click="switchTo(index)">
                  <svg-icon v-if="item.meta?.icon" :name="item.meta.icon" />
                  <span>{{ generateI18nTitle(item.meta?.i18n, item.meta?.title) }}</span>
                </div>
              </div>
            </template>
          </div>
          <!-- 顶部精简模式 -->
          <el-menu
            v-else-if="settingsStore.settings.menu.menuMode === 'only-head'" mode="horizontal" :default-active="route.meta.activeMenu || route.path" class="el-menu-nav" :class="{
              [`nav-fill-${settingsStore.settings.menu.menuFillStyle}`]: settingsStore.settings.menu.menuFillStyle !== '',
              [`nav-active-${settingsStore.settings.menu.menuActiveStyle}`]: settingsStore.settings.menu.menuActiveStyle !== '',
            }"
          >
            <template v-for="(route, index) in menuStore.allMenus">
              <SidebarItem v-if="route.meta?.sidebar !== false" :key="index" :item="route" />
            </template>
          </el-menu>
        </div>
        <Tools />
      </div>
    </header>
  </transition>
</template>

<style lang="scss" scoped>
[data-app-width-mode="center"],
[data-app-width-mode="center-max-width"] {
    header {
        width: var(--g-app-width);
        max-width: 100%;
    }
}

header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    height: var(--g-header-height);
    color: var(--g-header-color);
    background-color: var(--g-header-bg);
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: var(--el-transition-all), background-color 0.3s;

    .header-container {
        width: var(--g-header-width);
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .main {
            flex: 1;
            display: flex;
            align-items: center;
            height: 100%;

            .nav-fill {
                &-radius {
                    .item-container {
                        margin-right: 5px;

                        &:last-child {
                            margin-right: 0;
                        }

                        .item {
                            border-radius: 5px;
                            margin: 10px 0;
                        }
                    }

                    .sidebar-item {
                        margin-right: 5px;

                        &:last-child {
                            margin-right: 0;
                        }

                        :deep(.el-sub-menu__title .item) {
                            height: calc(100% - 20px);
                            border-radius: 5px;
                            margin: 10px 0;
                        }
                    }
                }
            }

            .nav-active {
                &-arrow {
                    .item-container::before,
                    .sidebar-item :deep(.el-sub-menu__title::before) {
                        content: "";
                        opacity: 0;
                        bottom: -5px;
                        width: 0;
                        height: 0;
                        border-right: 5px solid transparent;
                        border-left: 5px solid transparent;
                        border-bottom: 5px solid var(--g-sub-sidebar-bg);
                        transition: all 0.3s;

                        @include position-center(x);
                    }

                    .item-container.active::before,
                    .sidebar-item :deep(.is-active .el-sub-menu__title::before) {
                        opacity: 1;
                        bottom: 0;
                    }
                }

                &-line {
                    .item-container::before,
                    .sidebar-item :deep(.el-sub-menu__title::before) {
                        content: "";
                        opacity: 0;
                        bottom: 8px;
                        width: 0;
                        height: 4px;
                        border-radius: 2px;
                        background-color: var(--g-header-menu-active-bg);
                        box-shadow: 0 0 0 1px var(--g-header-bg);
                        transition: all 0.3s;

                        @include position-center(x);
                    }

                    .item-container.active::before,
                    .sidebar-item :deep(.is-active .el-sub-menu__title::before) {
                        opacity: 1;
                        width: 20px;
                    }
                }

                &-dot {
                    .item-container::before,
                    .sidebar-item :deep(.el-sub-menu__title::before) {
                        content: "";
                        opacity: 0;
                        bottom: 0;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: var(--g-header-menu-active-bg);
                        box-shadow: 0 0 0 1px var(--g-main-sidebar-bg);
                        transition: all 0.3s;

                        @include position-center(x);
                    }

                    .item-container.active::before,
                    .sidebar-item :deep(.is-active .el-sub-menu__title::before) {
                        opacity: 1;
                        bottom: 5px;
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

    :deep(a.title) {
        position: relative;
        width: inherit;
        height: inherit;
        padding: inherit;
        background-color: inherit;

        .logo {
            width: 50px;
            height: 50px;
        }

        span {
            font-size: 24px;
            letter-spacing: 1px;
            color: var(--g-header-color);
        }
    }

    .nav {
        display: flex;
        height: 100%;
        margin-left: 50px;

        .item-container {
            position: relative;
            display: flex;
            width: initial;
            transition: var(--el-transition-all);

            .item {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 0 5px;
                width: 80px;
                cursor: pointer;
                color: var(--g-header-menu-color);
                background-color: var(--g-header-bg);
                transition: var(--el-transition-all), background-color 0.3s, var(--el-transition-color);

                &:hover {
                    color: var(--g-header-menu-hover-color);
                    background-color: var(--g-header-menu-hover-bg);
                }

              .icon {
                font-size: 24px;
              }

                span {
                    text-align: center;
                    word-break: break-all;

                    @include text-overflow(1, false);
                }
            }

            &.active .item {
                color: var(--g-header-menu-active-color);
                background-color: var(--g-header-menu-active-bg);
            }
        }
    }

    .el-menu-nav {
        flex: 1;
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 50px;
        border-bottom: none;
        background-color: inherit;

        .sidebar-item {
            transition: all 0.3s;
        }

        .sidebar-item,
        :deep(.el-sub-menu),
        :deep(.el-sub-menu__title) {
            height: 100%;
            display: flex;
            align-items: center;
        }

        :deep(.el-sub-menu.is-active) {
            .el-sub-menu__title {
                background-color: initial !important;

                .item {
                    color: var(--g-header-menu-active-color) !important;
                    background-color: var(--g-header-menu-active-bg) !important;
                }
            }
        }

        :deep(.el-sub-menu__title) {
            padding: 0;
            width: initial;

            &:hover {
                background-color: initial !important;
            }

            .item {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 0 5px;
                width: 80px;
                height: 100%;
                line-height: initial;
                color: var(--g-header-menu-color) !important;
                transition: all 0.3s;

                &:hover {
                    color: var(--g-header-menu-hover-color) !important;
                    background-color: var(--g-header-menu-hover-bg) !important;

                  .icon {
                    transform: scale(1);
                  }
                }

              .icon {
                margin: 0 auto;
                font-size: 24px;
                vertical-align: middle;
                color: inherit;
              }

                .title {
                    flex: initial;
                    margin: initial;
                    height: initial;
                    line-height: initial;
                    text-align: center;
                    font-size: 16px;
                    word-break: break-all;
                    white-space: initial;

                    @include text-overflow(1, false);
                }
            }

            .el-sub-menu__icon-arrow {
                display: none;
            }
        }
    }

    :deep(.tools) {
        padding: 0;

      .buttons .item .icon {
        color: var(--g-header-color);
      }

        .user-container {
            font-size: 16px;
            color: var(--g-header-color);
        }
    }
}
// 头部动画
.header-enter-active,
.header-leave-active {
    transition: transform 0.3s;
}

.header-enter-from,
.header-leave-to {
    transform: translateY(calc(var(--g-header-height) * -1));
}
</style>
