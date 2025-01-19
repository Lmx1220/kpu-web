<script setup lang="ts">
import type { SubMenuProps } from './types'
import { useTimeoutFn } from '@vueuse/core'
import Item from './item.vue'
import { rootMenuInjectionKey } from './types'

defineOptions({
  name: 'SubMenu',
})

const props = withDefaults(
  defineProps<SubMenuProps>(),
  {
    level: 0,
  },
)

const index = props.menu.path ?? JSON.stringify(props.menu)
const itemRef = useTemplateRef('itemRef')
const subMenuRef = useTemplateRef('subMenuRef')
const rootMenu = inject(rootMenuInjectionKey)!

const opened = computed(() => {
  return rootMenu.openedMenus.includes(props.uniqueKey.at(-1)!)
})
const transitionEvent = computed(() => {
  return {
    enter(el: HTMLElement) {
      if (el.offsetHeight > window.innerHeight) {
        el.style.height = `${window.innerHeight}px`
      }
    },
    afterEnter: () => {
    },
    beforeLeave: (el: HTMLElement) => {
      el.style.overflow = 'hidden'
      el.style.maxHeight = `${el.offsetHeight}px`
    },
    leave: (el: HTMLElement) => {
      el.style.maxHeight = '0'
    },
    afterLeave(el: HTMLElement) {
      el.style.overflow = ''
      el.style.maxHeight = ''
    },
  }
})

const transitionClass = computed(() => {
  return {
    enterActiveClass: 'ease-in-out duration-300',
    enterFromClass: 'opacity-0 translate-x-4',
    enterToClass: 'opacity-100',
    leaveActiveClass: 'ease-in-out duration-300',
    leaveFromClass: 'opacity-100',
    leaveToClass: 'opacity-0',
  }
})

const hasChildren = computed(() => {
  let flag = true
  if (props.menu.children) {
    if (props.menu.children.every((item: any) => item.meta?.menu === false)) {
      flag = false
    }
  }
  else {
    flag = false
  }
  return flag
})

function handleClick() {
  if (hasChildren.value) {
    rootMenu.handleMenuItemClick(index)
  }
}

let timeout: (() => void) | undefined

function handleMouseenter() {
  if (props.level === 0) {
    rootMenu.mouseInMenu = props.uniqueKey
    timeout?.()
    ;({ stop: timeout } = useTimeoutFn(() => {
      if (hasChildren.value) {
        rootMenu.openMenu(index, props.uniqueKey)
        nextTick(() => {
          const el = itemRef.value?.ref
          const subMenuEl = subMenuRef.value?.$el
          if (!el || !subMenuEl) {
            return
          }
          let top = 0
          let left = 0
          if (rootMenu.props.mode === 'vertical' || props.level !== 0) {
            top = el.getBoundingClientRect().top + el.scrollTop
            left = (rootMenu.props.direction === 'ltr' ? el.getBoundingClientRect().left : document.documentElement.clientWidth - el.getBoundingClientRect().right) + el.getBoundingClientRect().width
            if (top + subMenuEl.offsetHeight > window.innerHeight) {
              top = window.innerHeight - subMenuEl.offsetHeight
            }
          }
          else {
            top = el.getBoundingClientRect().top + el.getBoundingClientRect().height
            left = rootMenu.props.direction === 'ltr' ? el.getBoundingClientRect().left : document.documentElement.clientWidth - el.getBoundingClientRect().right
            if (top + subMenuEl.offsetHeight > window.innerHeight) {
              subMenuEl.style.height = `${window.innerHeight - top}px`
            }
          }
          if (left + subMenuEl.offsetWidth > document.documentElement.clientWidth) {
            left = (rootMenu.props.direction === 'ltr' ? el.getBoundingClientRect().left : document.documentElement.clientWidth - el.getBoundingClientRect().right) - el.getBoundingClientRect().width
          }
          subMenuEl.style.top = `${top}px`
          subMenuEl.style.insetInlineStart = `${left}px`
        })
      }
      else {
        const path = props.menu.children ? rootMenu.subMenus[index].indexPath.at(-1)! : rootMenu.items[index].indexPath.at(-1)!
        rootMenu.openMenu(path, rootMenu.subMenus[path].indexPath)
      }
    }, 300))
  }
}

function handleMouseleave() {
  if (props.level === 0) {
    rootMenu.mouseInMenu = []
    timeout?.()
    ;({ stop: timeout } = useTimeoutFn(() => {
      if (rootMenu.mouseInMenu.length === 0) {
        rootMenu.closeMenu(props.uniqueKey)
      }
      else {
        if (hasChildren.value) {
          !rootMenu.mouseInMenu.includes(props.uniqueKey.at(-1)!) && rootMenu.closeMenu(props.uniqueKey.at(-1)!)
        }
      }
    }, 300))
  }
}
function handleMouseenters() {
  timeout?.()
}
</script>

<template>
  <Item ref="itemRef" :unique-key="uniqueKey" :item="menu" :level="level" :sub-menu="hasChildren" @click="handleClick" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave" />
  <Teleport v-if="hasChildren" to="body" :disabled="level !== 0">
    <template v-if="level === 0">
      <Transition v-bind="transitionClass" v-on="transitionEvent">
        <KScrollArea
          v-show="opened" ref="subMenuRef" mask class="sub-menu z-3000 w-150 border rounded-lg bg-[var(--g-sub-sidebar-bg)] shadow-xl fixed! 2xl:w-200"
          @mouseenter="handleMouseenters"
          @mouseleave="handleMouseleave"
        >
          <div class="columns-3 p-2 px-3 2xl:columns-4">
            <div
              v-for="item in menu.children" :key="item.path ?? JSON.stringify(item)"
              class="w-full break-inside-avoid"
            >
              <SubMenu
                v-if="item.meta?.menu !== false"
                :unique-key="[...uniqueKey, item.path ?? JSON.stringify(item)]"
                :menu="item" :level="level + 1"
              />
            </div>
          </div>
        </KScrollArea>
      </Transition>
    </template>
    <template v-else>
      <template
        v-for="item in menu.children"
        :key="item.path ?? JSON.stringify(item)"
      >
        <SubMenu
          v-if="item.meta?.menu !== false"
          :unique-key="[...uniqueKey, item.path ?? JSON.stringify(item)]"
          :menu="item" :level="level + 1"
        />
      </template>
    </template>
  </Teleport>
</template>
