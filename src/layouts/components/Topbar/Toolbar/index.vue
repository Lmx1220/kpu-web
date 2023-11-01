<script setup lang="ts">
import { compile } from 'path-to-regexp'
import Favorites from '../.././Favorites/index.vue'
import Tools from '../.././Tools/index.vue'
import Breadcrumb from '../../Breadcrumb/index.vue'
import BreadcrumbItem from '../../Breadcrumb/item.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import useI18nTitle from '@/util/composables/useI18nTitle'

defineOptions({
  name: 'Toolbar',
})
const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const { generateI18nTitle } = useI18nTitle()

const enableSubMenuCollapseButton = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode)
    && settingsStore.settings.menu.enableSubMenuCollapseButton
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

const breadcrumbList = computed(() => {
  const breadcrumbList = []
  if (settingsStore.settings.home.enable) {
    breadcrumbList.push({
      path: '/',
      title: settingsStore.settings.home.title,
      i18n: 'route.home',
    })
  }
  if (route.name !== 'home' && settingsStore.settings.breadcrumb.enableMainMenu && !['single'].includes(settingsStore.settings.menu.menuMode)) {
    const index = menuStore.allMenus.findIndex(item => item.children.some(p => route.fullPath.indexOf(`${p.path}/`) === 0 || route.fullPath === p.path))
    menuStore.allMenus[index]?.meta && breadcrumbList.push({
      path: '',
      title: menuStore.allMenus[index]?.meta?.title,
      i18n: menuStore.allMenus[index]?.meta?.i18n,
    })
  }
  if (route.meta.breadcrumbNeste) {
    breadcrumbList.push(...route.meta.breadcrumbNeste.filter(item => item.hide === false))
  }
  return breadcrumbList
})

function pathCompile(path: string) {
  const toPath = compile(path)
  return toPath(route.params)
}
</script>

<template>
  <div class="toolbar-container">
    <div class="left-box">
      <div
        v-if="enableSubMenuCollapseButton" :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }"
        class="flex-center px-2 py-1 cursor-pointer transition-transform"
        @click="settingsStore.toggleSidebarCollapse()"
      >
        <SvgIcon class="icon" name="toolbar-collapse" />
      </div>
      <HDropdown
        v-if="settingsStore.settings.favorites.enable && settingsStore.mode === 'pc'" class="sidebar-favorites"
        placement="bottom-start"
      >
        <SvgIcon name="i-uiw:star-off" />
        <template #dropdown>
          <Favorites />
        </template>
      </HDropdown>
      <Breadcrumb
        v-if="settingsStore.settings.breadcrumb.enable && settingsStore.mode === 'pc' && settingsStore.settings.app.routeBaseOn !== 'filesystem'"
        class="breadcrumb" :class="{
          [`breadcrumb-${settingsStore.settings.breadcrumb.style}`]: settingsStore.settings.breadcrumb.style,
        }"
      >
        <TransitionGroup name="breadcrumb">
          <BreadcrumbItem
            v-for="(item, index) in breadcrumbList" :key="JSON.stringify(item)"
            :to="index < breadcrumbList.length - 1 ? pathCompile(item.path) : ''"
          >
            {{
              index < breadcrumbList.length - 1 ? generateI18nTitle(item.i18n, item.title) : settingsStore.titleFirst
                ? settingsStore.title : generateI18nTitle(item.i18n, item.title) }}
          </BreadcrumbItem>
        </TransitionGroup>
      </Breadcrumb>
    </div>
    <Tools />
  </div>
</template>

<style lang="scss" scoped>
.toolbar-container {
  --at-apply: flex items-center justify-between h- [var(--g-toolbar-height)] bg- [var(--g-container-bg)];
  transition: background-color 0.3s;

  .left-box {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 50px;
    overflow: hidden;
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);

    .breadcrumb {
      padding-left: 10px;
      white-space: nowrap;

      &.breadcrumb-modern {
        :deep(.breadcrumb-item) {
          .text {
            background-color: rgba(231, 229, 228, .8);
            padding: 6px 16px;
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%);
            @at-root .dark & {
              background-color: rgba(41, 37, 36, .8);
            }
            &.is-link:hover {
              --at-apply: bg-stone-2
              dark: bg-stone-8;
            }
          }

          &:first-child {
            .text {
              padding-left: 12px;
              border-radius: 6px 0 0 6px;
              clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)
            }

            &:not(:first-child) {
              .text {
                --at-apply: bg-stone-2
                dark: bg-stone-8;
                border-radius: 0 6px 6px 0;
              }
            }
          }

          .separator {
            display: none
          }
        }
      }
    }

  }
}

// 面包屑动画
.breadcrumb-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
