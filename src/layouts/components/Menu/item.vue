<script lang="ts" setup>
import type { SubMenuItemProps } from './types'
import { rootMenuInjectionKey } from './types'
import useI18nTitle from '@/util/composables/useI18nTitle.ts'

const props = withDefaults(
  defineProps<SubMenuItemProps>(),
  {
    level: 0,
    subMenu: false,
    expand: false,
    alwaysExpand: false,
  },
)
const { generateI18nTitle } = useI18nTitle()
const rootMenu = inject(rootMenuInjectionKey)!

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
  let icon = props.item.meta?.icon
  if (isActived.value && props.item.meta?.activeIcon) {
    icon = props.item.meta?.activeIcon
  }
  return icon
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
    ref="itemRef" :class="{
      'active': isItemActive,
      'px-2 py-1': rootMenu.props.rounded,
      'px-1! py-2!': rootMenu.props.rounded && rootMenu.isMenuPopup && props.level === 0 && rootMenu.props.mode === 'horizontal',
    }" class="menu-item relative transition-all"
  >
    <RouterLink v-slot="{ href, navigate }" custom :to="uniqueKey.at(-1) ?? ''">
      <HTooltip
        :enable="rootMenu.isMenuPopup && level === 0 && !subMenu"
        :text="generateI18nTitle(item.meta?.i18n, item.meta?.title)"
        placement="right" class="h-full w-full"
      >
        <component
          :is="subMenu ? 'div' : 'a'" v-bind="{
            ...(!subMenu && {
              href: item.meta?.link ? item.meta.link : href,
              target: item.meta?.newWindow || item.meta?.link ? '_blank' : '_self',
              class: 'no-underline',
            }),
          }" class="group menu-item-container h-full w-full flex items-center justify-between gap-1 px-5 py-4"
          :class="{
            ...rootMenu.isMenuPopup || !props.alwaysExpand ? {
              'cursor-pointer text-[var(--g-sub-sidebar-menu-color)] transition-all hover-bg-[var(--g-sub-sidebar-menu-hover-bg)] hover-text-[var(--g-sub-sidebar-menu-hover-color)]': true,
              'text-[var(--g-sub-sidebar-menu-active-color)]! bg-[var(--g-sub-sidebar-menu-active-bg)]!': isItemActive,
              'rounded-2': rootMenu.props.rounded,
              'px-2!': rootMenu.isMenuPopup && level === 0,
              'py-3!': rootMenu.props.rounded && rootMenu.isMenuPopup && level !== 0 }
              : {
                'py-2! opacity-30': true,
              },
          }" :title="generateI18nTitle(item.meta?.i18n, item.meta?.title)" v-on="{
            ...(!subMenu && {
              click: navigate,
            }),
          }"
        >
          <div
            :class="{
              'flex-col': rootMenu.isMenuPopup && level === 0 && rootMenu.props.mode === 'vertical',
              'gap-1!': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
              'w-full': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName && rootMenu.props.mode === 'vertical',
            }" :style="indentStyle" class="inline-flex flex-1 items-center justify-center gap-[12px]"
          >
            <SvgIcon
              v-if="icon" :name="icon" :size="20"
              async class="menu-item-container-icon"
              :class="{
                'transition-transform group-hover-scale-120': rootMenu.isMenuPopup || !props.alwaysExpand,
              }"
            />
            <span
              v-if="!(rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName)"
              :class="{
                'opacity-0 w-0 h-0': rootMenu.isMenuPopup && level === 0 && !rootMenu.props.showCollapseName,
                'w-full text-center': rootMenu.isMenuPopup && level === 0 && rootMenu.props.showCollapseName,
              }"
              class="w-0 flex-1 truncate text-sm transition-height transition-opacity transition-width"
            >
              {{ generateI18nTitle(item.meta?.i18n, item.meta?.title) }}
            </span>
            <HBadge
              v-if="props.item.meta?.badge"
              :class="{
                'opacity-0': rootMenu.isMenuPopup && level === 0,
              }"
              :value="typeof props.item.meta?.badge == 'function' ? props.item.meta?.badge() : props.item.meta?.badge"
              class="badge"
            />
          </div>
          <i
            v-if="subMenu && (!rootMenu.isMenuPopup || level !== 0) && (rootMenu.isMenuPopup || !props.alwaysExpand)"
            :class="[
              expand ? 'before:(-rotate-45 -translate-x-[2px]) after:(rotate-45 translate-x-[2px])' : 'before:(rotate-45 -translate-x-[2px]) after:(-rotate-45 translate-x-[2px])',
              rootMenu.isMenuPopup && level === 0 && 'opacity-0',
              rootMenu.isMenuPopup && level !== 0 && '-rotate-90 -top-[1.5px]',
            ]"
            class="relative ml-1 w-[10px] after:(absolute h-[1.5px] w-[6px] bg-current transition-transform-200 content-empty -translate-y-[1px]) before:(absolute h-[1.5px] w-[6px] bg-current transition-transform-200 content-empty -translate-y-[1px])"
          />
        </component>
      </HTooltip>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
:deep(.badge) {
  & > span {
    --at-apply: important-left-initial right-0;
  }
}
</style>
