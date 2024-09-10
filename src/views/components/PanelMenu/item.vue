<script setup lang="ts">
import type { SubMenuItemProps } from './types'
import { rootMenuInjectionKey } from './types'

defineOptions({
  name: 'SubMenuItem',
})
const props = withDefaults(
  defineProps<SubMenuItemProps>(),
  {
    level: 0,
    subMenu: false,
    expand: false,
  },
)

const rootMenu = inject(rootMenuInjectionKey)!
const { generateI18nTitle } = useMenu()

const itemRef = ref<HTMLElement>()

const isActived = computed(() => {
  return props.subMenu
    ? rootMenu.subMenus[props.uniqueKey[props.uniqueKey.length - 1]]?.active
    : rootMenu.activeIndex === props.uniqueKey[props.uniqueKey.length - 1]
})

const isItemActive = computed(() => {
  return isActived.value && (!props.subMenu || rootMenu.isMenuPopup)
})

const icon = computed(() => {
  return props?.item?.icon
})

// 缩进样式
const indentStyle = computed(() => {
  return !rootMenu.isMenuPopup
    ? `padding-left: ${20 * (props.level ?? 0)}px`
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
    <HTooltip
      :enable="rootMenu.isMenuPopup && level === 0 && !subMenu" :text="generateI18nTitle(item?.title)" placement="right"
      class="h-full w-full"
    >
      <div
        class="group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 px-4 py-3 text-[var(--g-sub-sidebar-menu-color)] transition-all hover-bg-[var(--g-sub-sidebar-menu-hover-bg)] hover-text-[var(--g-sub-sidebar-menu-hover-color)]" :class="{
          'text-[var(--g-sub-sidebar-menu-active-color)]! bg-[var(--g-sub-sidebar-menu-active-bg)]!': isItemActive,
          'rounded-lg': rootMenu.props.rounded,
          'px-3!': rootMenu.isMenuPopup && level === 0,
          'py-3!': rootMenu.props.rounded && rootMenu.isMenuPopup && level !== 0,
        }" :title="generateI18nTitle(item?.title)"
      >
        <div
          class="inline-flex flex-1 items-center justify-center gap-[12px]" :class="{
            'flex-col': rootMenu.isMenuPopup && level === 0 && rootMenu.props.mode === 'vertical',
            'gap-1!': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
            'w-full': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName && rootMenu.props.mode === 'vertical',
          }" :style="indentStyle"
        >
          <SvgIcon
            v-if="icon" :name="icon" :size="18" class="menu-item-container-icon transition-transform group-hover-scale-120"
          />
          <span
            v-if="!(rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName)"
            class="w-0 flex-1 truncate text-sm transition-height transition-opacity transition-width"
            :class="{
              'opacity-0 w-0 h-0': rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName,
              'w-full text-center': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
            }"
          >
            {{ generateI18nTitle(item?.title) }}
          </span>
          <HBadge
            v-if="item?.badge && !(rootMenu.isMenuPopup && level !== 0)"
            :value="typeof item.badge === 'function' ? item.badge() : item.badge"
            class="badge"
          />
        </div>
        <i
          v-if="subMenu && !(rootMenu.isMenuPopup && level === 0)" class="relative ml-1 w-[10px] after:(absolute h-[1.5px] w-[6px] bg-current transition-transform-200 content-empty -translate-y-[1px]) before:(absolute h-[1.5px] w-[6px] bg-current transition-transform-200 content-empty -translate-y-[1px])" :class="[
            expand ? 'before:(-rotate-45 -translate-x-[2px]) after:(rotate-45 translate-x-[2px])' : 'before:(rotate-45 -translate-x-[2px]) after:(-rotate-45 translate-x-[2px])',
            rootMenu.isMenuPopup && level === 0 && 'opacity-0',
            rootMenu.isMenuPopup && level !== 0 && '-rotate-90 -top-[1.5px]',
          ]"
        />
      </div>
    </HTooltip>
  </div>
</template>

<style scoped>
.badge {
  :deep(> span) {
    inset-inline-start: initial !important;
    inset-inline-end: 0;
  }
}
</style>
