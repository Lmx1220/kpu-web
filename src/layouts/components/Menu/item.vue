<script setup lang="ts">
import type { SubMenuItemProps } from './types'
import qs from 'qs'
import { rootMenuInjectionKey } from './types'

const props = withDefaults(
  defineProps<SubMenuItemProps>(),
  {
    level: 0,
    subMenu: false,
    expand: false,
    alwaysExpand: false,
  },
)

const rootMenu = inject(rootMenuInjectionKey)!
const { generateI18nTitle } = useMenu()

const itemRef = ref<HTMLElement>()

const isActived = computed(() => {
  return props.subMenu
    ? rootMenu.subMenus[props.uniqueKey.at(-1)!].active
    : rootMenu.activeIndex === props.uniqueKey.at(-1)!
})

const isItemActive = computed(() => {
  return isActived.value && (!props.subMenu || rootMenu.isMenuPopup)
})

const icon = computed(() => {
  let icon
  if (props.item.meta?.icon) {
    icon = props.item.meta.icon
  }
  if (isActived.value) {
    if (props.item.meta?.activeIcon) {
      icon = props.item.meta.activeIcon
    }
  }
  return icon
})

// 缩进样式
const indentStyle = computed(() => {
  return !rootMenu.isMenuPopup
    ? `padding-inline-start: ${20 * (props.level ?? 0)}px`
    : ''
})

defineExpose({
  ref: itemRef,
})
</script>

<template>
  <div
    ref="itemRef" class="menu-item relative transition-all" :class="{
      'active': isItemActive,
      'py-1 px-2': (rootMenu.isMenuPopup && rootMenu.props.mode === 'vertical') || (rootMenu.isMenuPopup && level !== 0 && rootMenu.props.mode === 'horizontal') || !rootMenu.isMenuPopup,
      'px-1 py-2': rootMenu.isMenuPopup && level === 0 && rootMenu.props.mode === 'horizontal',
    }"
  >
    <router-link v-slot="{ href, navigate }" custom :to="(uniqueKey.at(-1) ?? '') + (item.meta?.query ? `?${qs.stringify(item.meta?.query)}` : '')">
      <KTooltip :disabled="!rootMenu.isMenuPopup || level !== 0 || subMenu" :text="generateI18nTitle(item.meta?.title)" :side="rootMenu.props.mode === 'vertical' ? 'right' : 'bottom'" class="h-full w-full">
        <component
          :is="subMenu ? 'div' : 'a'" v-bind="{
            ...(!subMenu && {
              href: item.meta?.link ? item.meta.link : href,
              target: item.meta?.newWindow || item.meta?.link ? '_blank' : '_self',
              class: 'no-underline',
            }),
          }" class="group menu-item-container relative h-full w-full flex items-center justify-between gap-1 rounded-lg px-4 py-3" :class="{
            ...(rootMenu.isMenuPopup || !alwaysExpand
              ? {
                'cursor-pointer text-[var(--g-sub-sidebar-menu-color)] transition-all hover-bg-[var(--g-sub-sidebar-menu-hover-bg)] hover-text-[var(--g-sub-sidebar-menu-hover-color)]': true,
                'text-[var(--g-sub-sidebar-menu-active-color)]! bg-[var(--g-sub-sidebar-menu-active-bg)]!': isItemActive,
                'px-3!': rootMenu.isMenuPopup && level === 0,
                'py-3!': rootMenu.isMenuPopup && level !== 0,
              }
              : {
                'py-2! opacity-50 font-bold': true,
              }
            ),
          }" :title="generateI18nTitle(item.meta?.title)" v-on="{
            ...(!subMenu && {
              click: navigate,
            }),
          }"
        >
          <div
            class="inline-flex flex-1 items-center justify-center gap-[12px]" :class="{
              'flex-col': rootMenu.isMenuPopup && level === 0 && rootMenu.props.mode === 'vertical',
              'gap-1!': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
              'w-full': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName && rootMenu.props.mode === 'vertical',
            }" :style="indentStyle"
          >
            <SvgIcon
              v-if="icon" :name="icon" :size="18" class="menu-item-container-icon" :class="{
                'transition-transform group-hover-scale-120': rootMenu.isMenuPopup || !alwaysExpand,
              }"
            />
            <span
              v-if="!(rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName)"
              class="w-0 flex-1 truncate text-sm transition-height transition-opacity transition-width"
              :class="{
                'opacity-0 w-0 h-0': rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName,
                'w-full text-center': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
              }"
            >
              {{ generateI18nTitle(item.meta?.title) }}
            </span>
            <KBadge
              v-if="item.meta?.badge && !(rootMenu.isMenuPopup && level === 0)"
              :value="typeof item.meta.badge === 'function' ? item.meta.badge() : item.meta.badge"
              :variant="typeof item.meta.badgeVariant == 'function' ? item.meta.badgeVariant() : item.meta.badgeVariant"
              class="badge"
              :class="{ hidden: rootMenu.isMenuPopup && level === 0 }"
            />
          </div>
          <i
            v-if="
              subMenu
                && (!rootMenu.isMenuPopup || level !== 0) // 非收起模式，非一级的子菜单
                && (rootMenu.isMenuPopup || !alwaysExpand) // 收起模式，非始终展开的子菜单
            "
            class="relative ms-1 w-[10px] after:absolute before:absolute after:h-[1.5px] after:w-[6px] before:h-[1.5px] before:w-[6px] after:bg-current before:bg-current after:transition-transform-200 before:transition-transform-200 after:content-empty before:content-empty after:-translate-y-[1px] before:-translate-y-[1px]"
            :class="[
              expand ? 'before:-rotate-45 before:-translate-x-[2px] after:rotate-45 after:translate-x-[2px]' : 'before:rotate-45 before:-translate-x-[2px] after:-rotate-45 after:translate-x-[2px]',
              rootMenu.isMenuPopup && level === 0 && 'opacity-0',
              rootMenu.isMenuPopup && level !== 0 && '-rotate-90 -top-[1.5px]',
            ]"
          />
        </component>
      </KTooltip>
    </router-link>
  </div>
</template>

<style scoped>
.badge {
  :deep(>div>div) {
    inset-inline-start: initial !important;
    inset-inline-end: 0;
  }
}
</style>
