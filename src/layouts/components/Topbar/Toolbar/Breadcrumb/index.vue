<script setup lang="ts">
import { compile } from 'path-to-regexp'
import Breadcrumb from '../../../Breadcrumb/index.vue'
import BreadcrumbItem from '../../../Breadcrumb/item.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu.ts'
import { i18nTitleInjectionKey } from '@/layouts/components/Menu/types.ts'

defineOptions({
  name: 'Breadcrumb',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const i18nTitle = inject(i18nTitleInjectionKey)!
const breadcrumbList = computed(() => {
  const breadcrumbList = []
  if (settingsStore.settings.home.enable) {
    breadcrumbList.push({
      path: settingsStore.settings.home.fullPath,
      title: settingsStore.settings.home.title,
    })
  }
  if (route.name !== 'home' && settingsStore.settings.breadcrumb.enableMainMenu && !['single'].includes(settingsStore.settings.menu.menuMode)) {
    const index = menuStore.allMenus.findIndex(item => item.children.some(p => route.fullPath.indexOf(`${p.path}/`) === 0 || route.fullPath === p.path))
    const parentMenu = menuStore.allMenus[index]
    if (parentMenu?.meta) {
      breadcrumbList.push({
        path: '',
        title: i18nTitle(parentMenu.meta?.title),
      })
    }
  }
  if (route.meta.breadcrumbNeste) {
    route.meta.breadcrumbNeste.forEach((item) => {
      if (item.hide === false) {
        breadcrumbList.push({
          path: item.path,
          title: i18nTitle(item.title),
        })
      }
    })
    const customTitle = settingsStore.customTitleList.find(customTitle => customTitle.fullPath === route.fullPath)
    if (customTitle) {
      customTitle.title && (breadcrumbList[breadcrumbList.length - 1].title = customTitle.title)
    }
  }

  return breadcrumbList
})

function pathCompile(path: string) {
  const toPath = compile(path)
  return toPath(route.params)
}
</script>

<template>
  <Breadcrumb
    v-if="settingsStore.settings.toolbar.breadcrumb && settingsStore.mode === 'pc' && settingsStore.settings.app.routeBaseOn !== 'filesystem'"
    class="breadcrumb" :class="{
      [`breadcrumb-${settingsStore.settings.breadcrumb.style}`]: settingsStore.settings.breadcrumb.style,
    }"
  >
    <TransitionGroup name="breadcrumb">
      <BreadcrumbItem v-for="(item, index) in breadcrumbList" :key="`${index}_${item.path}_${item.title}`" :to="index < breadcrumbList.length - 1 && item.path !== '' ? pathCompile(item.path) : ''">
        {{ item.title }}
      </BreadcrumbItem>
    </TransitionGroup>
  </Breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  padding-left: 10px;
  white-space: nowrap;

  &.breadcrumb-modern {
    :deep(.breadcrumb-item) {
      .text {
        padding: 6px 16px;
        clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%);
        background-color: rgb(231 229 228 / 80%);

        @at-root .dark & {
          background-color: rgb(41 37 36 / 80%);
        }

        &.is-link:hover {
          --at-apply: bg-stone-2 dark-bg-stone-8;
        }
      }

      &:first-child {
        .text {
          padding-left: 12px;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
          border-radius: 6px 0 0 6px;
        }
      }

      &:last-child:not(:first-child) {
        .text {
          --at-apply: bg-stone-2 dark-bg-stone-8;

          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);
          border-radius: 0 6px 6px 0;
        }
      }

      .separator {
        display: none;
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
