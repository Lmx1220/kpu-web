<script setup lang="ts">
import { useSlots } from '@/slots'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import Logo from '../Logo/index.vue'
import Menu from '../Menu/index.vue'

defineOptions({
  name: 'SubSidebar',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const enableSidebar = computed(() => {
  return settingsStore.mode === 'mobile' || (
    ['side', 'head', 'single'].includes(settingsStore.settings.menu.mode)
    && menuStore.sidebarMenus.length !== 0
    && !menuStore.sidebarMenus.every(item => item.meta?.menu === false)
  )
})

const isCollapse = computed(() => {
  if (settingsStore.mode === 'pc') {
    return !!(settingsStore.settings.menu.subMenuCollapse
      && (!settingsStore.isHoverSidebar
        || (settingsStore.isHoverSidebar && !settingsStore.settings.menu.subMenuAutoCollapse)))
  }
  else {
    return settingsStore.settings.menu.subMenuCollapse
  }
})

const transitionName = ref('')
watch(() => menuStore.actived, (val, oldVal) => {
  if (settingsStore.mode === 'mobile' || settingsStore.settings.menu.mode === 'side') {
    if (val > oldVal) {
      transitionName.value = 'sub-sidebar-y-start'
    }
    else {
      transitionName.value = 'sub-sidebar-y-end'
    }
  }
  else if (settingsStore.settings.menu.mode === 'head') {
    if (val > oldVal) {
      transitionName.value = 'sub-sidebar-x-start'
    }
    else {
      transitionName.value = 'sub-sidebar-x-end'
    }
  }
})
</script>

<template>
  <div
    v-if="enableSidebar" class="sub-sidebar-container" :class="{
      'is-collapse': isCollapse,
      'shadow-side': settingsStore.isHoverSidebar && settingsStore.settings.menu.subMenuAutoCollapse && settingsStore.settings.menu.subMenuCollapse,
    }"
  >
    <component :is="useSlots('sub-sidebar-top')" />
    <Logo
      :show-logo="settingsStore.settings.menu.mode === 'single'" class="sidebar-logo" :class="{
        'sidebar-logo-bg': settingsStore.settings.menu.mode === 'single',
      }"
    />
    <component :is="useSlots('sub-sidebar-after-logo')" />
    <KScrollArea :scrollbar="false" mask gradient-color="var(--g-sub-sidebar-bg)" class="flex-1">
      <TransitionGroup :name="transitionName">
        <template v-for="(mainItem, mainIndex) in menuStore.allMenus" :key="mainIndex">
          <div v-show="mainIndex === menuStore.actived">
            <Menu
              :menu="mainItem.children" :value="route.meta.activeMenu || route.path"
              :default-openeds="menuStore.defaultOpenedPaths"
              :always-openeds="menuStore.alwaysOpenedPaths"
              :accordion="settingsStore.settings.menu.subMenuUniqueOpened"
              :collapse="isCollapse"
              :direction="settingsStore.settings.app.direction"
              class="menu"
              :class="{
                '-mt-2': !(isCollapse || ['head', 'single'].includes(settingsStore.settings.menu.mode)),
              }"
            />
          </div>
        </template>
      </TransitionGroup>
    </KScrollArea>
    <div
      v-if="settingsStore.mode === 'pc' && settingsStore.settings.menu.enableSubMenuCollapseButton" class="relative flex items-center px-4 py-3" :class="{
        'justify-center': isCollapse,
        'justify-between': !isCollapse,
      }"
    >
      <KButton
        variant="secondary"
        size="icon"
        class="h-8 w-8"
        @click="settingsStore.toggleSidebarAutoCollapse()"
      >
        <SvgIcon :name="settingsStore.settings.menu.subMenuAutoCollapse ? 'i-lucide:pin-off' : 'i-lucide:pin'" :size="16" />
      </KButton>
      <KButton
        variant="secondary"
        size="icon"
        class="h-8 w-8 transition"
        :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }"
        @click="settingsStore.toggleSidebarCollapse()"
      >
        <SvgIcon name="toolbar-collapse" :size="16" />
      </KButton>
    </div>
    <component :is="useSlots('sub-sidebar-bottom')" />
  </div>
</template>

<style scoped>
.sub-sidebar-container {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: var(--g-sub-sidebar-width);
  background-color: var(--g-sub-sidebar-bg);
  box-shadow: -1px 0 hsl(var(--border)),1px 0 hsl(var(--border));
  transition: background-color 0.3s, inset-inline-start 0.3s, width 0.3s, box-shadow 0.3s;

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
  }

  &.shadow-side {
    box-shadow: 10px 0 10px -10px hsl(var(--border)),-10px 0 10px -10px hsl(var(--border))
  }

  .sidebar-logo {
    background-color: var(--g-sub-sidebar-bg);
    transition: background-color 0.3s;

    &.sidebar-logo-bg {
      background-color: var(--g-sub-sidebar-logo-bg);

      :deep(span) {
        color: var(--g-sub-sidebar-logo-color);
      }
    }
  }

  .menu {
    width: 100%;
  }
}

/* 次侧边栏动画 */
.sub-sidebar-x-start-enter-active,
.sub-sidebar-x-end-enter-active,
.sub-sidebar-y-start-enter-active,
.sub-sidebar-y-end-enter-active {
  transition: 0.2s;
}

.sub-sidebar-x-start-enter-from,
.sub-sidebar-x-start-leave-active {
  opacity: 0;
  transform: translateX(30px);
}

.sub-sidebar-x-end-enter-from,
.sub-sidebar-x-end-leave-active {
  opacity: 0;
  transform: translateX(-30px);
}

.sub-sidebar-y-start-enter-from,
.sub-sidebar-y-start-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

.sub-sidebar-y-end-enter-from,
.sub-sidebar-y-end-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}

.sub-sidebar-x-start-leave-active,
.sub-sidebar-x-end-leave-active,
.sub-sidebar-y-start-leave-active,
.sub-sidebar-y-end-leave-active {
  position: absolute;
}
</style>
