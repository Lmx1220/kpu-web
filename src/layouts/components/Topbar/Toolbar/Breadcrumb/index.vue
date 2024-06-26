<script setup lang="ts">
import { compile } from 'path-to-regexp'
import Breadcrumb from '../../../Breadcrumb/index.vue'
import BreadcrumbItem from '../../../Breadcrumb/item.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import { i18nTitleInjectionKey } from '@/util/injectionKeys'

defineOptions({
  name: 'Breadcrumb',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true)

const breadcrumbList = computed(() => {
  const breadcrumbList = []
  if (settingsStore.settings.home.enable) {
    breadcrumbList.push({
      path: settingsStore.settings.home.fullPath,
      title: generateI18nTitle(settingsStore.settings.home.title),
    })
  }
  if (route.fullPath !== settingsStore.settings.home.fullPath && settingsStore.settings.breadcrumb.enableMainMenu && !['single'].includes(settingsStore.settings.menu.menuMode)) {
    const index = menuStore.allMenus.findIndex(item => item.children.some(r => route.fullPath.indexOf(`${r.path}/`) === 0 || route.fullPath === r.path))
    menuStore.allMenus[index]?.meta && breadcrumbList.push({
      path: '',
      title: generateI18nTitle(menuStore.allMenus[index].meta?.title),
    })
  }
  if (route.meta.breadcrumbNeste) {
    route.meta.breadcrumbNeste.forEach((item) => {
      if (item.hide === false) {
        breadcrumbList.push({
          path: item.path,
          title: generateI18nTitle(item.title),
        })
      }
    })
    const findItem = settingsStore.customTitleList.find(item => item.fullPath === route.fullPath)
    if (findItem) {
      breadcrumbList[breadcrumbList.length - 1].title = findItem.title
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
    v-if="settingsStore.mode === 'pc' && settingsStore.settings.app.routeBaseOn !== 'filesystem'" class="breadcrumb whitespace-nowrap px-2" :class="{
      [`breadcrumb-${settingsStore.settings.breadcrumb.style}`]: settingsStore.settings.breadcrumb.style !== '',
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
  &.breadcrumb-modern {
    :deep(.breadcrumb-item) {
      .text {
        --at-apply: bg-stone-2/80 dark-bg-stone-8/80;

        padding: 6px 16px;
        clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%);

        [dir="rtl"] & {
          clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 50%, 100% 100%, 8px 100%, 0 50%);
        }

        &.is-link:hover {
          --at-apply: bg-stone-2 dark-bg-stone-8;
        }
      }

      &:first-child .text {
        padding-inline-start: 12px;
        clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
        border-radius: 6px 0 0 6px;

        [dir="rtl"] & {
          clip-path: polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%);
          border-radius: 0 6px 6px 0;
        }
      }

      &:last-child:not(:first-child) .text {
        --at-apply: bg-stone-2 dark-bg-stone-8;

        padding-inline-end: 12px;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);
        border-radius: 0 6px 6px 0;

        [dir="rtl"] & {
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 50%, 100% 100%, 0 100%);
          border-radius: 6px 0 0 6px;
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
