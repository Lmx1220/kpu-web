<script setup lang="ts">
import type { Tabbar } from '#/global'
import { $t } from '@/locales/utils'
import { useSlots } from '@/slots'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import storage from '@/utils/storage'
import { useMagicKeys } from '@vueuse/core'
import hotkeys from 'hotkeys-js'
import Sortable from 'sortablejs'
import { toast } from 'vue-sonner'

import MoreAction from './moreAction.vue'

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
const { generateI18nTitle } = useMenu()

const activedTabId = computed(() => tabbar.getId())
const isShowMoreAction = computed(() => tabbarStore.list.length > 1 && (tabbar.checkCloseOtherSide() || tabbar.checkCloseLeftSide() || tabbar.checkCloseRightSide()))

const tabsRef = useTemplateRef('tabsRef')
const tabContainerRef = useTemplateRef('tabContainerRef')
const tabRef = useTemplateRef<HTMLElement[]>('tabRef')
// onBeforeUpdate(() => {
//   tabRef.value = []
// })

const activePseudoTabStart = computed(() => {
  const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
  const offsetLeft = tabRef.value?.find(item => item.dataset.index && Number.parseInt(item.dataset.index) === index)?.offsetLeft
  return `${offsetLeft || 0}px`
})
const activePseudoTabWidth = computed(() => {
  const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
  const offsetWidth = tabRef.value?.find(item => item.dataset.index && Number.parseInt(item.dataset.index) === index)?.offsetWidth
  return `${offsetWidth || 0}px`
})

const isDragging = ref(false)
let tabSortable: Sortable
onMounted(() => {
  if (tabContainerRef.value) {
    tabSortable = new Sortable(tabContainerRef.value.$el, {
      animation: 300,
      delay: 400,
      delayOnTouchOnly: true,
      ghostClass: 'tab-ghost',
      draggable: '.tab',
      handle: '.drag-handle',
      onStart: () => {
        isDragging.value = true
      },
      onEnd: () => {
        isDragging.value = false
      },
      onMove: (evt) => {
        const dragged = evt.dragged
        const related = evt.related

        if (dragged.classList.contains('pinned')) {
          // 如果拖拽的元素是固定的，只允许拖到其他固定元素上
          return related.classList.contains('pinned')
        }
        else {
          // 如果拖拽的元素是可移动的，不允许拖到固定元素上
          return !related.classList.contains('pinned')
        }
      },
      onUpdate: (e) => {
        if (e.newIndex !== undefined && e.oldIndex !== undefined) {
          tabbarStore.sort(e.newIndex, e.oldIndex)
        }
      },
    })
  }
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
        tabRef.value && tabsRef.value?.scrollTo(tabRef.value[index].offsetLeft - tabsRef.value.ref?.$el.clientWidth * 0.4)
        tabbarScrollTip()
      }
    })
  }
}, {
  immediate: true,
  deep: true,
})

function tabbarScrollTip() {
  if (tabContainerRef.value?.$el.clientWidth > (tabsRef.value?.ref?.$el.clientWidth ?? 0) && localStorage.getItem('tabbarScrollTip') === undefined) {
    storage.local.set('tabbarScrollTip', '')
    const tips = toast.info('温馨提示', {
      description: '标签栏数量超过展示区域范围，可以将鼠标移到标签栏上，通过鼠标滚轮滑动浏览',
      position: 'top-center',
      duration: Infinity,
      action: {
        label: '知道了',
        onClick: () => toast.dismiss(tips),
      },
    })
  }
}

function tabbarMaximizeTip() {
  if (!storage.local.has('tabbarMaximizeTip')) {
    storage.local.set('tabbarMaximizeTip', '')
    const tips = toast.info('温馨提示', {
      description: '可以通过双击标签栏进行最大化操作',
      position: 'top-center',
      duration: Infinity,
      action: {
        label: '知道了',
        onClick: () => toast.dismiss(tips),
      },
    })
  }
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

function contextMenuItems(routeItem: Tabbar.recordRaw) {
  return [
    [
      {
        label: $t('app.tabbar.reload'),
        icon: 'i-ri:refresh-line',
        disabled: routeItem.tabId !== activedTabId.value,
        handle: () => mainPage.reload(),
      },
      {
        label: $t('app.tabbar.close'),
        icon: 'i-ri:close-line',
        disabled: tabbarStore.list.length <= 1 || routeItem.isPin || routeItem.isPermanent,
        divided: true,
        handle: () => {
          tabbar.closeById(routeItem.tabId)
        },
      },
      {
        label: routeItem.isPin ? $t('app.tabbar.unpin') : $t('app.tabbar.pin'),
        icon: routeItem.isPin ? 'i-lucide:pin-off' : 'i-lucide:pin',
        // 主页不允许被固定，因为如果固定主页且主页未启用，会导致登录时进入路由死循环状态
        disabled: routeItem.fullPath === settingsStore.settings.home.fullPath || routeItem.isPermanent,
        handle: () => {
          if (routeItem.isPin) {
            tabbarStore.unPin(routeItem.tabId)
          }
          else {
            tabbarStore.pin(routeItem.tabId)
          }
        },
      },
      {
        label: $t('app.tabbar.maximize'),
        icon: 'i-ri:picture-in-picture-exit-line',
        handle: () => {
          if (routeItem.tabId !== activedTabId.value) {
            router.push(routeItem.fullPath)
          }
          tabbarMaximizeTip()
          settingsStore.setMainPageMaximize()
        },
      },
      {
        label: $t('app.tabbar.newWindow'),
        icon: 'i-ci:window',
        divided: true,
        handle: () => {
          const details = router.resolve(routeItem.fullPath)
          window.open(details.href, '_blank')
        },
      },
      {
        label: $t('app.tabbar.closeOtherSide'),
        disabled: !tabbar.checkCloseOtherSide(routeItem.tabId),
        handle: () => {
          tabbar.closeOtherSide(routeItem.tabId)
        },
      },
      {
        label: $t('app.tabbar.closeLeftSide'),
        disabled: !tabbar.checkCloseLeftSide(routeItem.tabId),
        handle: () => {
          tabbar.closeLeftSide(routeItem.tabId)
        },
      },
      {
        label: $t('app.tabbar.closeRightSide'),
        disabled: !tabbar.checkCloseRightSide(routeItem.tabId),
        handle: () => {
          tabbar.closeRightSide(routeItem.tabId)
        },
      },
    ],
  ]
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
        case 'alt+9': {
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
  <div class="tabbar">
    <component :is="useSlots('tabbar-start')" />
    <div class="tabbar-container">
      <KpuScrollArea
        ref="tabsRef" :scrollbar="false" horizontal mask gradient-color="var(--g-tabbar-bg)" class="tabs"
        :class="{
          'tabs-ontop': settingsStore.settings.topbar.switchTabbarAndToolbar,
          [`tabs-${settingsStore.settings.tabbar.style}`]: settingsStore.settings.tabbar.style !== '',
        }"
      >
        <TransitionGroup
          ref="tabContainerRef" :name="!isDragging ? 'tabbar' : undefined" tag="div"
          class="tab-container" :class="{ dragging: isDragging }"
        >
          <div
            v-for="(element, index) in tabbarStore.list"
            :key="settingsStore.settings.tabbar.mergeTabsBy === 'routeName' && element.routeName ? element.routeName : element.tabId"
            ref="tabRef" :data-index="index" class="tab" :class="{
              'tab-ontop': settingsStore.settings.topbar.switchTabbarAndToolbar,
              'actived': element.tabId === activedTabId,
              'pinned': element.isPermanent || element.isPin,
            }"
            :title="element.customTitleList.find((item:any) => item.fullPath === element.fullPath)?.title || generateI18nTitle(element.title)"
            @click="router.push(element.fullPath)"
            @dblclick="onTabbarDblclick(element)"
          >
            <KpuContextMenu :items="contextMenuItems(element)">
              <div class="size-full">
                <div class="tab-dividers" />
                <div class="tab-background" />
                <KpuTooltip :delay="1000" side="bottom">
                  <div class="tab-content">
                    <div :key="element.tabId" class="title">
                      <KpuIcon
                        v-if="settingsStore.settings.tabbar.enableIcon && iconName(element.tabId === activedTabId, element.icon, element.activeIcon)"
                        :name="iconName(element.tabId === activedTabId, element.icon, element.activeIcon)!" class="icon"
                      />
                      {{
                        element.customTitleList.find((item:any) => item.fullPath === element.fullPath)?.title || generateI18nTitle(element.title)
                      }}
                    </div>
                    <div v-if="!element.isPermanent && element.isPin" class="action-icon">
                      <KpuIcon name="i-ri:pushpin-2-fill" @click.stop="tabbarStore.unPin(element.tabId)" @dblclick.stop />
                    </div>
                    <div
                      v-else-if="!element.isPermanent && tabbarStore.list.length > 1" class="action-icon"
                      @click.stop="tabbar.closeById(element.tabId)" @dblclick.stop
                    >
                      <KpuIcon name="i-ri:close-fill" />
                    </div>
                    <div v-show="keys.alt && index < 9" class="hotkey-number">
                      {{ index + 1 }}
                    </div>
                    <div class="drag-handle" />
                  </div>
                  <template #content>
                    <div class="text-sm">
                      {{ generateI18nTitle(element.title) }}
                    </div>
                    <div class="text-accent-foreground/50">
                      {{ element.fullPath }}
                    </div>
                  </template>
                </KpuTooltip>
              </div>
            </KpuContextMenu>
          </div>
        </TransitionGroup>
      </KpuScrollArea>
      <div class="absolute end-0 top-0 z-10 h-full w-50px flex-center">
        <MoreAction v-if="isShowMoreAction" />
      </div>
    </div>
    <component :is="useSlots('tabbar-end')" />
  </div>
</template>

<style scoped>
.tabbar {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--g-tabbar-height);
  background-color: var(--g-tabbar-bg);
  transition: background-color 0.3s, box-shadow 0.3s;

  .dark & {
    box-shadow: 0 1px 0 0 hsl(var(--border)), 0 -1px 0 0 hsl(var(--border));
  }

  .tabbar-container {
    position: relative;
    flex: 1;
    height: 100%;

    .tabs {
      position: absolute;
      inset-inline: 0;
      margin-inline-end: 50px;
      white-space: nowrap;

      &.tabs-ontop {
        top: 0 !important;
        bottom: inherit !important;
      }

      .tab-container {
        position: relative;
        display: inline-block;

        &::after {
          position: absolute;
          bottom: 0;
          left: v-bind(activePseudoTabStart);
          z-index: 10;
          width: v-bind(activePseudoTabWidth);
          content: "";
          transition: width 0.3s, left 0.3s;
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
              background-color: var(--g-tabbar-tab-active-bg);
            }
          }

          .tab-dividers {
            position: absolute;
            inset-inline: -1px;
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
              --uno: transition;

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
                --uno: b bg-secondary;
              }
            }

            .hotkey-number {
              --uno: b -translate-y-1/2 bg-secondary;

              position: absolute;
              inset-inline-end: 0.5rem;
              top: 50%;
              z-index: 10;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 1.25rem;
              height: 1.25rem;
              font-size: 0.75rem;
              line-height: 1rem;
              color: var(--g-tabbar-tab-color);
              border-width: 1px;
              border-radius: 9999px;
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
                  background-color: var(--g-tabbar-tab-hover-bg);
                }
              }
            }
          }

          .tab {
            height: calc(var(--g-tabbar-height) - 6px);
            margin-inline: 6px -6px;
            line-height: calc(var(--g-tabbar-height) - 8px);

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
                width: 10px;
                height: 10px;
                content: "";
                background-color: transparent;
                mask-size: 10px;
                transition: background-color 0.3s;
              }

              &::before {
                left: -10px;
                mask-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 100c55.228 0 100-44.772 100-100v100H0z' fill='%23F8EAE7'/%3E%3C/svg%3E");
              }

              &::after {
                right: -10px;
                mask-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M100 100C44.772 100 0 55.228 0 0v100h100z' fill='%23F8EAE7'/%3E%3C/svg%3E");
              }
            }

            &.actived {
              .tab-background {
                &::before,
                &::after {
                  background-color: var(--g-tabbar-tab-active-bg);
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

            --uno: bg-primary;
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
                background-color: var(--g-tabbar-tab-active-bg);
              }
            }
          }
        }
      }
    }
  }
}

/* 标签栏动画 */
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
