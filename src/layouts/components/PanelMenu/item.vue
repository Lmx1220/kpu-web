<script setup lang="ts">
import type { SubMenuItemProps } from './types'
import { rootMenuInjectionKey } from './types'

const props = withDefaults(
  defineProps<SubMenuItemProps>(),
  {
    level: 0,
    subMenu: false,
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
  return `padding-inline-start: ${20 * (props.level ?? 0)}px`
})

defineExpose({
  ref: itemRef,
})
</script>

<template>
  <div
    ref="itemRef" class="menu-item relative transition-all" :class="{
      'active': isActived,
      'py-1': level !== 0,
      'py-1 px-2': level === 0 && rootMenu.props.mode === 'vertical',
      'px-1 py-2': level === 0 && rootMenu.props.mode === 'horizontal',
    }"
  >
    <router-link v-slot="{ href, navigate }" custom :to="uniqueKey.at(-1) ?? ''">
      <KTooltip
        :enable="level !== 0 || !subMenu" :text="generateI18nTitle(item.meta?.title)" placement="right"
        class="h-full w-full"
      >
        <component
          :is="subMenu ? 'div' : 'a'" v-bind="{
            ...(!subMenu && {
              href: item.meta?.link ? item.meta.link : href,
              target: item.meta?.newWindow || item.meta?.link ? '_blank' : '_self',
              class: 'no-underline',
            }),
          }" class="group menu-item-container relative h-full w-full flex items-center justify-between gap-1 rounded-lg px-2 py-2" :class="{
            ...(level !== 1 || level === 1 && !subMenu
              ? {
                'text-[var(--g-sub-sidebar-menu-color)] transition-all': true,
                'cursor-pointer': !subMenu || level === 0,
                'hover-bg-[var(--g-sub-sidebar-menu-hover-bg)] hover-text-[var(--g-sub-sidebar-menu-hover-color)]': !subMenu,
                'text-[var(--g-sub-sidebar-menu-active-color)]! bg-[var(--g-sub-sidebar-menu-active-bg)]!': rootMenu.activeIndex === uniqueKey.at(-1),
                'px-3!': level === 0,
                'py-1!': level > 1,
              }
              : {
                'bg-[var(--g-sub-sidebar-menu-hover-bg)] text-[var(--g-sub-sidebar-menu-hover-color)]': true,
              }
            ),
          }" :title="generateI18nTitle(item.meta?.title)" v-on="{
            ...(!subMenu && {
              click: navigate,
            }),
          }"
        >
          <div
            class="inline-flex flex-1 items-center justify-center gap-1" :class="{
              'flex-col': level === 0 && rootMenu.props.mode === 'vertical',
              'w-full': level === 0 && rootMenu.props.showCollapseName && rootMenu.props.mode === 'vertical',
            }" :style="indentStyle"
          >
            <KIcon
              v-if="icon" :name="icon" :size="16" class="menu-item-container-icon"
            />
            <span
              v-if="!(level === 0 && !rootMenu.props.showCollapseName)"
              class="w-0 flex-1 truncate text-sm transition-height transition-opacity transition-width"
              :class="{
                'text-xs!': level > 1,
                'opacity-0 w-0 h-0': level === 0 && !rootMenu.props.showCollapseName,
                'w-full text-center': level === 0 && rootMenu.props.showCollapseName,
              }"
            >
              {{ generateI18nTitle(item.meta?.title) }}
            </span>
            <KBadge
              v-if="item.meta?.badge"
              :value="typeof item.meta.badge === 'function' ? item.meta.badge() : item.meta.badge"
              :variant="typeof item.meta.badgeVariant == 'function' ? item.meta.badgeVariant() : item.meta.badgeVariant"
              class="badge transform-scale-80"
              :class="{
                hidden: level === 0,
              }"
            />
          </div>
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
