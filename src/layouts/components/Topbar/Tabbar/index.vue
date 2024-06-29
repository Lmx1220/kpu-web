<script setup lang="ts">
import Sortable from 'sortablejs'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import { useI18n } from 'vue-i18n'
import hotkeys from 'hotkeys-js'
import Message from 'vue-m-message'
import { useMagicKeys } from '@vueuse/core'
import MoreAction from './moreAction.vue'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import storage from '@/util/storage'
import { i18nTitleInjectionKey } from '@/util/injectionKeys'
import type { Tabbar } from '#/global'

defineOptions({
  name: 'Tabbar',
})

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()

const tabbar = useTabbar()
const mainPage = useMainPage()

const keys = useMagicKeys({ reactive: true })

const { t } = useI18n()

const generateI18nTitle = inject(i18nTitleInjectionKey, Function, true)

const activedTabId = computed(() => tabbar.getId())
const isShowMoreAction = computed(() => tabbarStore.list.length > 1 && (tabbar.checkCloseOtherSide() || tabbar.checkCloseLeftSide() || tabbar.checkCloseRightSide()))

const tabsRef = ref()
const tabContainerRef = ref()
const tabRef = shallowRef<HTMLElement[]>([])
onBeforeUpdate(() => {
  tabRef.value = []
})

const activePseudoTabStart = computed(() => {
  const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
  if (settingsStore.settings.app.direction === 'ltr') {
    return `${tabRef.value.find(item => Number.parseInt(item.dataset.index!) === index)?.offsetLeft || 0}px`
  }
  else {
    return `${tabsRef.value.offsetWidth - (tabRef.value.find(item => Number.parseInt(item.dataset.index!) === index)?.getBoundingClientRect().right || 0)}px`
  }
})
const activePseudoTabWidth = computed(() => {
  const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
  return `${tabRef.value.find(item => Number.parseInt(item.dataset.index!) === index)?.offsetWidth || 0}px`
})

const isDragging = ref(false)
let tabSortable: Sortable
onMounted(() => {
  tabSortable = new Sortable(tabContainerRef.value.$el, {
    animation: 200,
    ghostClass: 'tab-ghost',
    draggable: '.tab',
    handle: '.drag-handle',
    filter: '.no-drag',
    onStart: () => {
      isDragging.value = true
    },
    onEnd: () => {
      isDragging.value = false
    },
    onUpdate: (e) => {
      if (e.newIndex !== undefined && e.oldIndex !== undefined) {
        tabbarStore.sort(e.newIndex, e.oldIndex)
      }
    },
  })
})
watch([
  () => settingsStore.mode,
  () => settingsStore.settings.app.direction,
], (val) => {
  nextTick(() => {
    tabSortable?.option('disabled', val[0] === 'mobile' || val[1] === 'rtl')
  })
}, {
  immediate: true,
})

watch(() => route, (val) => {
  if (settingsStore.settings.tabbar.enable) {
    tabbarStore.add(val).then(() => {
      const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
      if (index !== -1) {
        scrollTo(tabRef.value[index].offsetLeft)
        tabbarScrollTip()
      }
    })
  }
}, {
  immediate: true,
  deep: true,
})

function tabbarScrollTip() {
  if (tabContainerRef.value.$el.clientWidth > tabsRef.value.clientWidth && !storage.local.has('tabbarScrollTip')) {
    storage.local.set('tabbarScrollTip', '')
    Message.info('标签栏数量超过展示区域范围，可以将鼠标移到标签栏上，通过鼠标滚轮滑动浏览', {
      title: '温馨提示',
      duration: 5000,
      closable: true,
      zIndex: 2000,
    })
  }
}
function tabbarMaximizeTip() {
  if (!storage.local.has('tabbarMaximizeTip')) {
    storage.local.set('tabbarMaximizeTip', '')
    Message.info('可以通过双击标签栏进行最大化操作', {
      title: '温馨提示',
      duration: 5000,
      closable: true,
      zIndex: 2000,
    })
  }
}
function handlerMouserScroll(event: WheelEvent) {
  tabsRef.value.scrollBy({
    left: event.deltaY || event.detail,
  })
}
function scrollTo(offsetLeft: number) {
  tabsRef.value.scrollTo({
    left: offsetLeft - 50,
    behavior: 'smooth',
  })
}
function onTabbarDblclick(routeItem: Tabbar.recordRaw) {
  switch (settingsStore.settings.tabbar.dblclickAction) {
    case 'reload':
      mainPage.reload()
      break
    case 'close':
      tabbar.closeById(routeItem.tabId)
      break
    case 'pin':
      routeItem.isPin ? tabbarStore.unPin(routeItem.tabId) : tabbarStore.pin(routeItem.tabId)
      break
    case 'maximize':
      settingsStore.setMainPageMaximize()
      break
    case 'window':
      window.open(router.resolve(routeItem.fullPath).href, '_blank')
      break
  }
}
function onTabbarContextmenu(event: MouseEvent, routeItem: Tabbar.recordRaw) {
  event.preventDefault()
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    zIndex: 1050,
    iconFontClass: '',
    customClass: 'tabbar-contextmenu',
    items: [
      {
        label: t('app.tabbar.reload'),
        icon: 'i-ri:refresh-line',
        disabled: routeItem.tabId !== activedTabId.value,
        onClick: () => mainPage.reload(),
      },
      {
        label: t('app.tabbar.close'),
        icon: 'i-ri:close-line',
        disabled: tabbarStore.list.length <= 1 || routeItem.isPin || routeItem.isPermanent,
        divided: true,
        onClick: () => {
          tabbar.closeById(routeItem.tabId)
        },
      },
      {
        label: routeItem.isPin ? t('app.tabbar.unpin') : t('app.tabbar.pin'),
        icon: routeItem.isPin ? 'i-lucide:pin-off' : 'i-lucide:pin',
        // 主页不允许被固定，因为如果固定主页且主页未启用，会导致登录时进入路由死循环状态
        disabled: routeItem.fullPath === settingsStore.settings.home.fullPath || routeItem.isPermanent,
        onClick: () => {
          if (routeItem.isPin) {
            tabbarStore.unPin(routeItem.tabId)
          }
          else {
            tabbarStore.pin(routeItem.tabId)
          }
        },
      },
      {
        label: t('app.tabbar.maximize'),
        icon: 'i-ri:picture-in-picture-exit-line',
        onClick: () => {
          if (routeItem.tabId !== activedTabId.value) {
            router.push(routeItem.fullPath)
          }
          tabbarMaximizeTip()
          settingsStore.setMainPageMaximize()
        },
      },
      {
        label: t('app.tabbar.newWindow'),
        icon: 'i-ci:window',
        divided: true,
        onClick: () => {
          const details = router.resolve(routeItem.fullPath)
          window.open(details.href, '_blank')
        },
      },
      {
        label: t('app.tabbar.closeOtherSide'),
        disabled: !tabbar.checkCloseOtherSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeOtherSide(routeItem.tabId)
        },
      },
      {
        label: t('app.tabbar.closeLeftSide'),
        disabled: !tabbar.checkCloseLeftSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeLeftSide(routeItem.tabId)
        },
      },
      {
        label: t('app.tabbar.closeRightSide'),
        disabled: !tabbar.checkCloseRightSide(routeItem.tabId),
        onClick: () => {
          tabbar.closeRightSide(routeItem.tabId)
        },
      },
    ],
  })
}

function iconName(isActive: boolean, icon: Tabbar.recordRaw['icon'], activeIcon: Tabbar.recordRaw['activeIcon']) {
  let name
  if ((!isActive && icon) || (isActive && !activeIcon)) {
    name = icon
  }
  else if (isActive && activeIcon) {
    name = activeIcon
  }
  return name
}

onMounted(() => {
  hotkeys('alt+left,alt+right,alt+w,alt+1,alt+2,alt+3,alt+4,alt+5,alt+6,alt+7,alt+8,alt+9,alt+0', (e, handle) => {
    if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.enableHotkeys) {
      e.preventDefault()
      switch (handle.key) {
        // 切换到当前标签页紧邻的上一个标签页
        case 'alt+left':
          if (tabbarStore.list[0].tabId !== activedTabId.value) {
            const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
            router.push(tabbarStore.list[index - 1].fullPath)
          }
          break
        // 切换到当前标签页紧邻的下一个标签页
        case 'alt+right':
          if (tabbarStore.list.at(-1)?.tabId !== activedTabId.value) {
            const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
            router.push(tabbarStore.list[index + 1].fullPath)
          }
          break
        // 关闭当前标签页
        case 'alt+w':
          tabbar.closeById(activedTabId.value)
          break
        // 切换到第 n 个标签页
        case 'alt+1':
        case 'alt+2':
        case 'alt+3':
        case 'alt+4':
        case 'alt+5':
        case 'alt+6':
        case 'alt+7':
        case 'alt+8':
        case 'alt+9':
        {
          const number = Number(handle.key.split('+')[1])
          tabbarStore.list[number - 1]?.fullPath && router.push(tabbarStore.list[number - 1].fullPath)
          break
        }
        // 切换到最后一个标签页
        case 'alt+0':
          router.push(tabbarStore.list[tabbarStore.list.length - 1].fullPath)
          break
      }
    }
  })
})
onUnmounted(() => {
  hotkeys.unbind('alt+left,alt+righ,alt+w,alt+1,alt+2,alt+3,alt+4,alt+5,alt+6,alt+7,alt+8,alt+9,alt+0')
})
</script>

<template>
  <div class="tabbar-container">
    <div
      ref="tabsRef" class="tabs" :class="{
        'tabs-ontop': settingsStore.settings.topbar.switchTabbarAndToolbar,
        [`tabs-${settingsStore.settings.tabbar.style}`]: settingsStore.settings.tabbar.style !== '',
      }" @wheel.prevent="handlerMouserScroll"
    >
      <TransitionGroup ref="tabContainerRef" :name="!isDragging ? 'tabbar' : undefined" tag="div" class="tab-container" :class="{ dragging: isDragging }">
        <div
          v-for="(element, index) in tabbarStore.list" :key="settingsStore.settings.tabbar.mergeTabsBy === 'routeName' && element.routeName ? element.routeName : element.tabId"
          ref="tabRef" :data-index="index" class="tab" :class="{
            'tab-ontop': settingsStore.settings.topbar.switchTabbarAndToolbar,
            'actived': element.tabId === activedTabId,
            'no-drag': element.isPermanent || element.isPin,
          }"
          :title="element.customTitleList.find(item => item.fullPath === element.fullPath)?.title || generateI18nTitle(element.title)"
          @click="router.push(element.fullPath)"
          @dblclick="onTabbarDblclick(element)"
          @contextmenu="onTabbarContextmenu($event, element)"
        >
          <div class="tab-dividers" />
          <div class="tab-background" />
          <div class="tab-content">
            <div :key="element.tabId" class="title">
              <SvgIcon v-if="settingsStore.settings.tabbar.enableIcon && iconName(element.tabId === activedTabId, element.icon, element.activeIcon)" :name="iconName(element.tabId === activedTabId, element.icon, element.activeIcon)!" class="icon" />
              {{ element.customTitleList.find(item => item.fullPath === element.fullPath)?.title || generateI18nTitle(element.title) }}
            </div>
            <div v-if="!element.isPermanent && element.isPin" class="action-icon">
              <SvgIcon name="i-ri:pushpin-2-fill" @click.stop="tabbarStore.unPin(element.tabId)" @dblclick.stop />
            </div>
            <div v-else-if="!element.isPermanent && tabbarStore.list.length > 1" class="action-icon" @click.stop="tabbar.closeById(element.tabId)" @dblclick.stop>
              <SvgIcon name="i-ri:close-fill" />
            </div>
            <div v-show="keys.alt && index < 9" class="hotkey-number">
              {{ index + 1 }}
            </div>
            <div class="drag-handle" />
          </div>
        </div>
      </TransitionGroup>
    </div>
    <MoreAction v-if="isShowMoreAction" class="more-action" />
  </div>
</template>

<style lang="scss">
.tabbar-contextmenu {
  .mx-context-menu {
    --at-apply: fixed ring-1 ring-stone-2 dark-ring-stone-7 shadow-2xl;

    background-color: var(--g-container-bg);

    .mx-context-menu-items .mx-context-menu-item {
      --at-apply: transition-background-color;

      &:not(.disabled):hover {
        --at-apply: cursor-pointer bg-stone-1 dark-bg-stone-9;
      }

      span {
        color: initial;
      }

      .icon {
        color: initial;
      }

      &.disabled span,
      &.disabled .icon {
        opacity: 0.25;
      }
    }

    .mx-context-menu-item-sperator {
      background-color: var(--g-container-bg);

      &::after {
        --at-apply: bg-stone-2 dark-bg-stone-7;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.tabbar-container {
  position: relative;
  height: var(--g-tabbar-height);
  background-color: var(--g-bg);
  transition: background-color 0.3s;

  .tabs {
    position: absolute;
    right: 0;
    left: 0;
    padding-inline-end: 50px;
    overflow-y: hidden;
    white-space: nowrap;

    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    &.tabs-ontop {
      top: 0 !important;
      bottom: inherit !important;
    }

    .tab-container {
      display: inline-block;

      &::after {
        position: absolute;
        inset-inline-start: v-bind(activePseudoTabStart);
        bottom: 0;
        z-index: 10;
        width: v-bind(activePseudoTabWidth);
        content: "";
        transition: width 0.3s, inset-inline-start 0.3s;
      }

      &:not(.dragging) {
        .tab {
          &:not(.actived):hover {
            z-index: 3;

            &::before,
            &::after {
              content: none;
            }

            & + .tab .tab-dividers::before {
              opacity: 0;
            }

            .tab-content {
              .title,
              .action-icon {
                color: var(--g-tabbar-tab-hover-color);
              }
            }

            .tab-background {
              background-color: var(--g-tabbar-tab-hover-bg);
            }
          }
        }
      }

      .tab {
        position: relative;
        display: inline-block;
        min-width: var(--g-tabbar-tab-min-width);
        max-width: var(--g-tabbar-tab-max-width);
        height: var(--g-tabbar-height);
        font-size: 14px;
        line-height: calc(var(--g-tabbar-height) - 2px);
        vertical-align: bottom;
        pointer-events: none;
        cursor: pointer;

        * {
          user-select: none;
        }

        &.actived {
          z-index: 5;

          &::before,
          &::after {
            content: none;
          }

          & + .tab .tab-dividers::before {
            opacity: 0;
          }

          .tab-content {
            .title,
            .action-icon {
              color: var(--g-tabbar-tab-active-color);
            }
          }

          .tab-background {
            background-color: var(--g-container-bg);
          }
        }

        &.tab-ghost {
          opacity: 0 !important;
        }

        .tab-dividers {
          position: absolute;
          inset-inline: -1px -1px;
          top: 50%;
          z-index: 0;
          height: 14px;
          transform: translateY(-50%);

          &::before {
            position: absolute;
            inset-inline-start: 1px;
            top: 0;
            bottom: 0;
            display: block;
            width: 1px;
            content: "";
            background-color: var(--g-tabbar-dividers-bg);
            opacity: 1;
            transition: opacity 0.2s ease, background-color 0.3s;
          }
        }

        &:first-child .tab-dividers::before {
          opacity: 0;
        }

        .tab-background {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          transition: opacity 0.3s, background-color 0.3s;
        }

        .tab-content {
          display: flex;
          width: 100%;
          height: 100%;
          pointer-events: all;

          .title {
            display: flex;
            flex: 1;
            gap: 5px;
            align-items: center;
            height: 100%;
            padding: 0 10px;
            margin-inline-end: 10px;
            overflow: hidden;
            color: var(--g-tabbar-tab-color);
            white-space: nowrap;
            mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
            transition: margin-inline-end 0.3s;

            [dir="rtl"] & {
              mask-image: linear-gradient(to left, #000 calc(100% - 20px), transparent);
            }

            &:has(+ .action-icon) {
              margin-inline-end: 28px;
            }

            .icon {
              flex-shrink: 0;
            }
          }

          .action-icon {
            position: absolute;
            inset-inline-end: 0.5em;
            top: 50%;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.5em;
            height: 1.5em;
            font-size: 12px;
            color: var(--g-tabbar-tab-color);
            border-radius: 50%;
            transform: translateY(-50%);

            &:hover {
              --at-apply: ring-1 ring-stone-3 dark-ring-stone-7;

              background-color: var(--g-bg);
            }
          }

          .hotkey-number {
            --at-apply: ring-1 ring-stone-3 dark-ring-stone-7;

            position: absolute;
            top: 50%;
            right: 0.5em;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.5em;
            height: 1.5em;
            font-size: 12px;
            color: var(--g-tabbar-tab-color);
            background-color: var(--g-bg);
            border-radius: 50%;
            transform: translateY(-50%);
          }

          .drag-handle {
            position: absolute;
            inset: 0;
            z-index: 9;
          }
        }
      }
    }

    &.tabs-fashion {
      bottom: 0;

      .tab-container {
        &:not(.dragging) {
          .tab:not(.actived):hover {
            .tab-background {
              &::before,
              &::after {
                box-shadow: 0 0 0 20px var(--g-tabbar-tab-hover-bg);
              }
            }
          }
        }

        .tab {
          height: calc(var(--g-tabbar-height) - 10px);
          margin-inline: 10px -10px;
          line-height: calc(var(--g-tabbar-height) - 12px);

          &:last-child {
            margin-inline-end: 0;
          }

          &.tab-ontop .tab-background {
            transform: rotate(180deg);
          }

          .tab-background {
            border-radius: 10px 10px 0 0;

            &::before,
            &::after {
              position: absolute;
              bottom: 0;
              width: 20px;
              height: 20px;
              content: "";
              border-radius: 100%;
              box-shadow: 0 0 0 20px transparent;
              transition: box-shadow 0.3s;
            }

            &::before {
              left: -20px;
              clip-path: inset(50% -10px 0 50%);
            }

            &::after {
              right: -20px;
              clip-path: inset(50% 50% 0 -10px);
            }
          }

          &.actived {
            .tab-background {
              &::before,
              &::after {
                box-shadow: 0 0 0 20px var(--g-container-bg);
              }
            }
          }
        }
      }
    }

    &.tabs-card {
      .tab-container {
        .tab {
          height: calc(var(--g-tabbar-height) - 10px);
          margin: 5px 0 5px 5px;

          .tab-dividers {
            display: none;
          }

          .tab-background {
            border-radius: 5px;
          }
        }
      }
    }

    &.tabs-square {
      .tab-container {
        &::after {
          height: 2px;

          --at-apply: bg-ui-primary;
        }

        &:has(> .tab.tab-ontop) {
          &::after {
            top: 0;
            bottom: unset;
          }

          .tab {
            .tab-background {
              top: 0;
              bottom: unset;
            }
          }
        }

        .tab {
          &:not(.actived):hover {
            .tab-background {
              height: 100%;
            }
          }

          .tab-background {
            top: unset;
            bottom: 0;
            height: 0;
            background-color: var(--g-tabbar-tab-hover-bg);
            transition: height 0.3s;
          }

          &.actived {
            .tab-background {
              height: 100%;
              background-color: var(--g-container-bg);
            }
          }
        }
      }
    }
  }

  .more-action {
    position: absolute;
    inset-inline-end: 0;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 100%;
    background-image: linear-gradient(to right, transparent, var(--g-bg));

    [dir="rtl"] & {
      background-image: linear-gradient(to left, transparent, var(--g-bg));
    }
  }
}

// 标签栏动画
.tabs {
  .tabbar-move,
  .tabbar-enter-active,
  .tabbar-leave-active {
    transition: all 0.3s;
  }

  .tabbar-enter-from,
  .tabbar-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  &.tabs-ontop {
    .tabbar-enter-from,
    .tabbar-leave-to {
      opacity: 0;
      transform: translateY(-30px);
    }
  }

  .tabbar-leave-active {
    position: absolute !important;
  }
}
</style>
