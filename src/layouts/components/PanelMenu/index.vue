<script setup lang="ts">
import SubMenu from './sub.vue'
import Item from './item.vue'
import type { MenuInjection, MenuProps } from './types'
import { rootMenuInjectionKey } from './types'

defineOptions({
  name: 'MainMenu',
})

const props = withDefaults(
  defineProps<MenuProps>(),
  {
    mode: 'vertical',
    collapse: false,
    showCollapseName: false,
    rounded: false,
    direction: 'ltr',
  },
)

const activeIndex = ref<MenuInjection['activeIndex']>(props.value)
const items = ref<MenuInjection['items']>({})
const subMenus = ref<MenuInjection['subMenus']>({})
// 合并 alwaysOpeneds 和 defaultOpeneds 并去重
const openedMenus = ref<MenuInjection['openedMenus']>([])
const mouseInMenu = ref<MenuInjection['mouseInMenu']>([])

// 解析传入的 menu 数据，并保存到 items 和 subMenus 对象中
function initItems(menu: MenuProps['menu'], parentPaths: string[] = []) {
  menu.forEach((item) => {
    const index = item.path ?? JSON.stringify(item)
    if (item.children) {
      const indexPath = [...parentPaths, index]
      subMenus.value[index] = {
        index,
        indexPath,
        active: false,
      }
      initItems(item.children, indexPath)
    }
    else {
      items.value[index] = {
        index,
        indexPath: parentPaths,
      }
    }
  })
}

const openMenu: MenuInjection['openMenu'] = (index) => {
  if (openedMenus.value.includes(index)) {
    return
  }
  openedMenus.value.push(index)
}
const closeMenu: MenuInjection['closeMenu'] = (index) => {
  if (Array.isArray(index)) {
    nextTick(() => {
      closeMenu(index.at(-1)!)
      if (index.length > 1) {
        closeMenu(index.slice(0, -1))
      }
    })
    return
  }
  Object.keys(subMenus.value).forEach((item) => {
    if (subMenus.value[item].indexPath.includes(index)) {
      openedMenus.value = openedMenus.value.filter(item => item !== index)
    }
  })
}

function setSubMenusActive(index: string) {
  for (const key in subMenus.value) {
    subMenus.value[key].active = false
  }
  subMenus.value[index]?.indexPath.forEach((idx) => {
    subMenus.value[idx].active = true
  })
  items.value[index]?.indexPath.forEach((idx) => {
    subMenus.value[idx].active = true
  })
}

const handleMenuItemClick: MenuInjection['handleMenuItemClick'] = (index) => {
  if (props.mode === 'horizontal' || props.collapse) {
    openedMenus.value = []
  }
  setSubMenusActive(index)
}
const handleSubMenuClick: MenuInjection['handleSubMenuClick'] = (index, indexPath) => {
  if (openedMenus.value.includes(index)) {
    closeMenu(index)
  }
  else {
    openMenu(index, indexPath)
  }
}

function initMenu() {
  const activeItem = activeIndex.value && items.value[activeIndex.value]
  setSubMenusActive(activeIndex.value)
  if (!activeItem || props.collapse) {
    return
  }
  // 展开该菜单项的路径上所有子菜单
  activeItem.indexPath.forEach((index) => {
    const subMenu = subMenus.value[index]
    subMenu && openMenu(index, subMenu.indexPath)
  })
}

watch(() => props.menu, (val) => {
  initItems(val)
  initMenu()
}, {
  deep: true,
  immediate: true,
})

watch(() => props.value, (currentValue) => {
  if (!items.value[currentValue]) {
    activeIndex.value = ''
  }
  const item = items.value[currentValue] || (activeIndex.value && items.value[activeIndex.value]) || items.value[props.value]
  if (item) {
    activeIndex.value = item.index
  }
  else {
    activeIndex.value = currentValue
  }
  initMenu()
})

watch(() => props.collapse, (value) => {
  if (value) {
    openedMenus.value = []
  }
  initMenu()
})

provide(rootMenuInjectionKey, reactive({
  props,
  items,
  subMenus,
  activeIndex,
  openedMenus,
  mouseInMenu,
  openMenu,
  closeMenu,
  handleMenuItemClick,
  handleSubMenuClick,
}))
</script>

<template>
  <div
    class="h-full w-full flex flex-col of-hidden transition-all" :class="{
      'flex-row! w-auto': props.mode === 'horizontal',
      'py-1': props.mode === 'vertical',
    }"
  >
    <template v-for="item in menu" :key="item.path ?? JSON.stringify(item)">
      <template v-if="item.meta?.menu !== false">
        <SubMenu v-if="item.children?.length" :menu="item" :unique-key="[item.path ?? JSON.stringify(item)]" />
        <Item v-else :item="item" :unique-key="[item.path ?? JSON.stringify(item)]" @click="handleMenuItemClick(item.path ?? JSON.stringify(item))" />
      </template>
    </template>
  </div>
</template>
