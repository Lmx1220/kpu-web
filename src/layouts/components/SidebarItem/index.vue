<script lang="ts" setup name="SidebarItem">
import SidebarItem from '../SidebarItem/index.vue'
import useSettingsStore from '@/store/modules/settings'
import type { Menu } from '@/types/global'
import { resolveRoutePath } from '@/util'
import useI18nTitle from '@/util/composables/useI18nTitle'

const props = defineProps({
  item: {
    type: Object as () => Menu.recordRaw,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
})

const settingsStore = useSettingsStore()

const { generateI18nTitle } = useI18nTitle()

const hasChildren = computed(() => {
  let flag = true
  if (props.item.children) {
    if (props.item.children.every(item => item.meta?.sidebar === false)) {
      flag = false
    }
  }
  else {
    flag = false
  }
  return flag
})

function iconName(isActive: boolean, icon: string | undefined, activeIcon: string | undefined) {
  let name = ''
  if ((!isActive && icon) || (isActive && !activeIcon)) {
    name = icon ?? ''
  }
  else if (isActive && activeIcon) {
    name = activeIcon
  }
  return name
}
function badge(badge: number | boolean | string | Function | undefined) {
  const res = {
    type: '', // text or dot
    value: '',
    visible: false,
  }
  if (badge) {
    res.visible = true
    res.value = typeof badge == 'function' ? badge() : badge
    if (typeof res.value == 'boolean') {
      res.type = 'dot'
      if (!res.value) {
        res.visible = false
      }
    }
    else if (typeof res.value == 'number') {
      res.type = 'text'
      if (res.value <= 0) {
        res.visible = false
      }
    }
    else {
      res.type = 'text'
      if (!res.value) {
        res.visible = false
      }
    }
  }
  return res
}
</script>

<template>
  <div class="sidebar-item">
    <el-sub-menu
      v-if="settingsStore.settings.app.routeBaseOn !== 'filesystem' && item.path === undefined"
      :title="generateI18nTitle(item.meta?.i18n, item.meta?.title)" :index="JSON.stringify(item)"
    >
      <template #title>
        <div class="item">
          <el-icon v-if="item.meta?.icon" class="title-icon">
            <svg-icon :name="item.meta.icon" />
          </el-icon>
          <span class="title">{{ generateI18nTitle(item.meta?.i18n, item.meta?.title) }}</span>
        </div>
      </template>
      <template v-for="route in item.children">
        <SidebarItem v-if="route.meta?.sidebar !== false" :key="route.path" :item="route" />
      </template>
    </el-sub-menu>
    <router-link
      v-else-if="!hasChildren" v-slot="{ href, navigate, isActive, isExactActive }" custom
      :to="resolveRoutePath(basePath, item.path)"
    >
      <a :href="item.meta?.link ? item.meta.link : href" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" :target="item.meta?.link ? '_blank' : '_self'" @click="navigate">
        <el-menu-item
          :title=" generateI18nTitle(item.meta?.i18n, item.meta?.title) "
          :index="resolveRoutePath(basePath, item.path)"
        >
          <el-icon v-if="iconName(isActive || isExactActive, item.meta?.icon, item.meta?.activeIcon)" class="title-icon">
            <svg-icon :name="iconName(isActive || isExactActive, item.meta?.icon, item.meta?.activeIcon)" />
          </el-icon>
          <span class="title">{{ generateI18nTitle(item.meta?.i18n, item.meta?.title) }}</span>
          <span
            v-if="badge(item.meta?.badge).visible" class="badge" :class="{
              'badge-dot': badge(item.meta?.badge).type === 'dot',
              'badge-text': badge(item.meta?.badge).type === 'text',
            }"
          >{{ badge(item.meta?.badge).type === 'text' ? badge(item.meta?.badge).value : '' }}</span>
        </el-menu-item>
      </a>
    </router-link>
    <el-sub-menu
      v-else :title=" generateI18nTitle(item.meta?.i18n, item.meta?.title) "
      :index="settingsStore.settings.app.routeBaseOn !== 'filesystem' ? resolveRoutePath(basePath, item.path) : JSON.stringify(item)"
    >
      <template #title>
        <el-icon v-if="item.meta?.icon" class="title-icon unactive">
          <svg-icon :name="item.meta.icon" />
        </el-icon>
        <el-icon v-if="item.meta?.activeIcon || item.meta?.icon" class="title-icon active">
          <svg-icon :name="item.meta.activeIcon || item.meta.icon || ''" />
        </el-icon>
        <span class="title">{{ generateI18nTitle(item.meta?.i18n, item.meta?.title) }}</span>
        <span
          v-if="badge(item.meta?.badge).visible" class="badge" :class="{
            'badge-dot': badge(item.meta?.badge).type === 'dot',
            'badge-text': badge(item.meta?.badge).type === 'text',
          }"
        >{{ badge(item.meta?.badge).type === 'text' ? badge(item.meta?.badge).value : '' }}</span>
      </template>
      <template v-for="route in item.children">
        <SidebarItem
          v-if="route.meta?.sidebar !== false" :key="route.path" :item="route"
          :base-path="resolveRoutePath(basePath, item.path || '')"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item {
  transition: padding 0.3s;
}

:deep(.el-menu-item),
:deep(.el-menu-item span.title),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu__title span.title) {
  flex: 1;
  vertical-align: inherit;

  @include text-overflow;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-sub-menu),
:deep(.el-menu-item) {
  .title-icon {
    font-size: 20px;
    transition: transform 0.3s;
    color: unset;
  }

  .title-icon+.title {
    margin: 0 10px;
  }

  &:hover>.title-icon,
  .el-sub-menu__title:hover>.title-icon {
    transform: scale(1.2);
  }
}

:deep(.el-sub-menu) {
  >.el-sub-menu__title>.title-icon.active {
    display: none;
  }

  &.is-active {
    >.el-sub-menu__title>.title-icon.unactive {
      display: none;
    }

    >.el-sub-menu__title>.title-icon.active {
      display: block;
    }
  }
}

a {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

.badge {
  position: absolute;
  z-index: 1;
  background-color: var(--g-badge-bg);
  box-shadow: 0 0 0 1px var(--g-badge-border-color);
  transition: background-color 0.3s, var(--el-transition-box-shadow);

  @include position-center(y);

  &-dot {
    right: 15px;
    border-radius: 50%;
    width: 6px;
    height: 6px;

    &::after {
      content: "";
      pointer-events: none;
      position: absolute;
      top: 0;
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      animation: dot-twinkling 1s infinite ease-in-out;
      background-color: var(--g-badge-bg);
      transition: background-color 0.3s;
    }
  }

  @keyframes dot-twinkling {
    0% {
      opacity: 0.6;
      transform: scale(0.8);
    }

    100% {
      opacity: 0;
      transform: scale(2.4);
    }
  }

  &-text {
    right: 15px;
    border-radius: 10px;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    color: var(--g-badge-color);
  }
}

.el-sub-menu__title {
  >.badge {
    &-dot {
      right: 40px;
    }

    &-text {
      right: 40px;
    }
  }
}
</style>
