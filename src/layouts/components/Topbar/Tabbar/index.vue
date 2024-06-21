<script lang="ts" setup>
import ContextMenu from '@imengyu/vue3-context-menu'
import Sortable from 'sortablejs'
import hotkeys from 'hotkeys-js'

import { ElMessageBox } from 'element-plus'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { useMagicKeys } from '@vueuse/core'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import storage from '@/util/storage'
import useTabbar from '@/util/composables/useTabbar'
import eventBus from '@/util/eventBus'
import type { Tabbar } from '@/types/global'
import useMainPage from '@/util/composables/useMainPage'
import { i18nTitleInjectionKey } from '@/layouts/components/Menu/types.ts'

defineOptions({
  name: 'Tabbar',
})

const route = useRoute()
const router = useRouter()
// const altKey = true
const altKey = useMagicKeys({ reactive: true })
const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()
const tabbar = useTabbar()
const mainPage = useMainPage()
const { t } = useI18n()

const i18nTitle = inject(i18nTitleInjectionKey)!

// 当前标签页指向路由
const activedTabId = computed(() => tabbar.getId())
// 当前标签页两侧是否有可关闭的标签页
const hasTabbarOtherSideCanClose = computed(() => tabbar.checkCloseOtherSide())
// 当前标签页左侧是否有可关闭的标签页
const hasTabbarLeftSideCanClose = computed(() => tabbar.checkCloseLeftSide())
// 当前标签页右侧是否有可关闭的标签页
const hasTabbarRightSideCanClose = computed(() => tabbar.checkCloseRightSide())

const isShowMoreAction = computed(() => tabbarStore.list.length > 1 && (hasTabbarOtherSideCanClose.value || hasTabbarLeftSideCanClose.value || hasTabbarRightSideCanClose.value))
const tabs = ref()
const tabContainer = ref()
const dropdownTabContainerRef = ref()

const tabbarList = ref<any[]>([])
function addTabbarList(tabbar: any) {
  tabbarList.value.push(tabbar)
}
onBeforeUpdate(() => {
  tabbarList.value = []
})
const leftPx = computed(() => {
  const tab = tabbarStore.list.findIndex(k => k.tabId === activedTabId.value)
  const find = tabbarList.value.find((item) => {
    return Number.parseInt(item.dataset.index) === tab
  })
  if (find == null) {
    return `${void 0}px`
  }
  else {
    return `${find.offsetLeft}px`
  }
})
const widthPx = computed(() => {
  const tab = tabbarStore.list.findIndex(k => k.tabId === activedTabId.value)
  const find = tabbarList.value.find(item => Number.parseInt(item.dataset.index) === tab)
  if (find == null) {
    return `${void 0}px`
  }
  else {
    return `${find.offsetWidth}px`
  }
})
const isDragging = ref(false)
let tabSortable: Sortable
// const tabContainer = ref<ComponentPublicInstance>()
onMounted(() => {
  tabSortable = new Sortable(tabContainer.value?.$el, {
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
    onUpdate: (e: Sortable.SortableEvent) => {
      if (e.newIndex !== undefined && e.oldIndex !== undefined) {
        tabbarStore.sort(e.newIndex, e.oldIndex)
      }
    },
  })
})
watch(() => tabContainer.value, (val) => {
  val && new Sortable(tabContainer.value?.$el, {
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
    onUpdate: (e: Sortable.SortableEvent) => {
      if (e.newIndex !== undefined && e.oldIndex !== undefined) {
        tabbarStore.sort(e.newIndex, e.oldIndex)
      }
    },
  })
})
watch(() => settingsStore.mode, (val) => {
  tabSortable?.option('disabled', val === 'mobile')
}, {
  immediate: true,
})

watch(() => route, (val) => {
  if (settingsStore.settings.tabbar.enable) {
    tabbarStore.add(val).then(() => {
      const index = tabbarStore.list.findIndex(item => `${item.tabId}` === activedTabId.value)
      if (index !== -1) {
        scrollTo(tabbarList.value[index]?.offsetLeft)
        tabbarScrollTip()
      }
    })
  }
}, {
  immediate: true,
  deep: true,
})

function tabbarScrollTip() {
  if (tabContainer.value.$el.clientWidth > tabs.value.clientWidth && !storage.local.has('tabbarScrollTip')) {
    ElMessageBox.confirm('顶部标签栏数量超过展示区域范围，你可以将鼠标移到标签栏上，然后通过鼠标滚轮滑动浏览', '温馨提示', {
      confirmButtonText: '知道了',
      showCancelButton: false,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      type: 'info',
      center: true,
    }).then(() => {
      storage.local.set('tabbarScrollTip', '')
    })
  }
}
function tabbarMaximizeTip() {
  if (!storage.local.has('tabbarMaximizeTip')) {
    ElMessageBox.confirm('你也可以通过双击标签栏进行最大化操作', '温馨提示', {
      confirmButtonText: '知道了',
      showCancelButton: false,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      type: 'info',
      center: true,
    }).then(() => {
      storage.local.set('tabbarMaximizeTip', '')
    })
  }
}
function handlerMouserScroll(event: any) {
  tabs.value.scrollBy({
    left: (event.deltaY || event.detail) > 0 ? 50 : -50,
  })
}
function scrollTo(offsetLeft: any) {
  tabs.value.scrollTo({
    left: offsetLeft - 50,
    behavior: 'smooth',
  })
}

function actionCommand(command: string) {
  switch (command) {
    case 'search-tabs':
      eventBus.emit('global-search-toggle', 'tab')
      break
    case 'other-side':
      tabbar.closeOtherSide()
      break
    case 'left-side':
      tabbar.closeLeftSide()
      break
    case 'right-side':
      tabbar.closeRightSide()
      break
  }
}
function onTabbarContextmenu(event: MouseEvent, routeItem: Tabbar.recordRaw) {
  event.preventDefault()
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    zIndex: 1000,
    iconFontClass: '',
    customClass: 'contextmenu-custom',
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
          tabbar.closeById(`${routeItem.tabId}`)
        },
      },
      {
        label: routeItem.isPin ? t('app.tabbar.unpin') : t('app.tabbar.pin'),
        icon: routeItem.isPin ? 'i-lucide:pin-off' : 'i-lucide:pin',
        // 控制台页面不允许被固定，因为如果固定控制台且控制台被关闭后，会导致登录时进入路由死循环状态
        disabled: routeItem.fullPath === '/dashboard' || routeItem.isPermanent,
        onClick: () => {
          if (routeItem.isPin) {
            tabbarStore.unPin(`${routeItem.tabId}`)
          }
          else {
            tabbarStore.pin(`${routeItem.tabId}`)
          }
        },
      },
      {
        label: t('app.tabbar.maximize'),
        icon: 'i-ri:picture-in-picture-exit-line',
        onClick: () => {
          if (routeItem.tabId !== activedTabId.value) {
            router.push(`${routeItem.fullPath}`)
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
          const resolve = router.resolve(routeItem.fullPath)
          window.open(resolve.href, '_blank')
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
function iconName(enableIcon: boolean, icon: string | undefined, activeIcon: string | undefined) {
  // eslint-disable-next-line style/no-mixed-operators
  return !enableIcon && icon || enableIcon && activeIcon || icon || ''
}
onMounted(() => {
  hotkeys('alt+q,alt+e,alt+w,alt+1,alt+2,alt+3,alt+4,alt+5,alt+6,alt+7,alt+8,alt+9,alt+0', (keyboardEvent, hotkeysEvent) => {
    if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.enableHotkeys) {
      keyboardEvent.preventDefault()
      switch (hotkeysEvent.key) {
        case 'alt+q':
          if (tabbarStore.list[0].tabId !== activedTabId.value) {
            const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
            router.push(`${tabbarStore.list[index - 1].fullPath}`)
          }

          break
        case 'alt+e':
          if (tabbarStore.list.at(-1)?.tabId !== activedTabId.value) {
            const index = tabbarStore.list.findIndex(item => item.tabId === activedTabId.value)
            router.push(`${tabbarStore.list[index + 1].fullPath}`)
          }
          break
        case 'alt+w':
          tabbar.closeById(activedTabId.value)
          break
        case 'alt+1':
        case 'alt+2':
        case 'alt+3':
        case 'alt+4':
        case 'alt+5':
        case 'alt+6':
        case 'alt+7':
        case 'alt+8':
        case 'alt+9': {
          const index = Number(hotkeysEvent.key.split('+')[1])
          tabbarStore.list[index - 1].fullPath && router.push(`${tabbarStore.list[index - 1].fullPath}`)
          break
        }
        case 'alt+0':
          router.push(`${tabbarStore.list[tabbarStore.list.length - 1].fullPath}`)
          break
      }
    }
  })
})
onUnmounted(
  () => {
    hotkeys.unbind('alt+q,alt+e,alt+w,alt+1,alt+2,alt+3,alt+4,alt+5,alt+6,alt+7,alt+8,alt+9,alt+0')
  },
)
</script>

<template>
  <div class="tabbar-container">
    <div
      ref="tabs" class="tabs" :class="{
        'tabs-ontop': settingsStore.settings.topbar.switchTabbarAndToolbar,
        [`tabs-${settingsStore.settings.tabbar.style}`]: settingsStore.settings.tabbar.style,
      }" @wheel.prevent="handlerMouserScroll"
    >
      <TransitionGroup
        ref="tabContainer" :name="!isDragging ? 'tabbar' : undefined" tag="div" class="tab-container"
        :class="{ dragging: isDragging }"
      >
        <div
          v-for="(element, index) in tabbarStore.list" :key="element.tabId" :ref="addTabbarList" :class="{
            'tab-ontop': settingsStore.settings.topbar.switchTabbarAndToolbar,
            'actived': element.tabId === activedTabId,
            'no-drag': element.isPermanent || element.isPin,
          }" :data-index="index" class="tab"
          :title="element.customTitleList?.find((item) => item.fullPath === item.fullPath)?.title || i18nTitle(element.title)"
          @click="router.push(`${element.fullPath}`)" @dblclick="settingsStore.setMainPageMaximize()"
          @contextmenu="onTabbarContextmenu($event, element)"
        >
          <div class="tab-dividers" />
          <div class="tab-background" />
          <div class="tab-content">
            <div
              :key="element.tabId"
              class="title"
            >
              <SvgIcon
                v-if="settingsStore.settings.tabbar.enableIcon && iconName(element.tabId === activedTabId, element.icon, element.activeIcon)"
                :name="iconName(element.tabId === activedTabId, element.icon, element.activeIcon)" class="icon"
              />
              {{
                element.customTitleList?.find((item) => item.fullPath === item.fullPath)?.title || i18nTitle(element.title)
              }}
            </div>

            <div class="action-icon">
              <SvgIcon
                v-if="!element.isPermanent && element.isPin"
                name="i-ri:pushpin-2-fill" @click.stop="tabbarStore.unPin(`${element.tabId}`)"
              />

              <SvgIcon
                v-else-if="!element.isPermanent && tabbarStore.list.length > 1"
                name="i-ri:close-fill" @click.stop="tabbar.closeById(`${element.tabId}`)"
              />
            </div>

            <div v-show="altKey.alt && index < 9" class="hotkey-number">
              {{ index + 1 }}
            </div>
            <div class="drag-handle" />
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div v-if="isShowMoreAction" class="more-action">
      <HDropdown placement="bottom-end" popper-class="tabbar-dropdown">
        <div class="h-6 w-6 flex-center cursor-pointer rounded-1 bg-[var(--g-container-bg)] text-lg shadow transition-background-color transition-shadow">
          <SvgIcon name="i-ri:arrow-down-s-fill" />
        </div>
        <template #dropdown>
          <div class="quick-button">
            <button
              v-if="settingsStore.settings.toolbar.navSearch" :title="t('app.tabbar.searchTabs')" class="button"
              @click="actionCommand('search-tabs')"
            >
              <SvgIcon name="i-ep:search" />
            </button>
            <button
              class="button" :disabled="!tabbar.checkCloseOtherSide(activedTabId)"
              :title="t('app.tabbar.closeOtherSide')"
              @click="actionCommand('other-side')"
            >
              <SvgIcon name="i-ep:close" />
            </button>
            <button
              class="button" :disabled="!tabbar.checkCloseLeftSide(activedTabId)"
              :title="t('app.tabbar.closeLeftSide')"
              @click="actionCommand('left-side')"
            >
              <SvgIcon name="i-ph:arrow-line-left" />
            </button>
            <button
              class="button" :disabled="!tabbar.checkCloseRightSide(activedTabId)"
              :title="t('app.tabbar.closeRightSide')"
              @click="actionCommand('right-side')"
            >
              <SvgIcon name="i-ph:arrow-line-right" />
            </button>
          </div>
          <OverlayScrollbarsComponent
            :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" class="max-h-[300px]" defer
          >
            <TransitionGroup
              ref="dropdownTabContainerRef"
              :class="{ dragging: isDragging }" :name="!isDragging ? 'dropdown-tab' : undefined"
              class="tabs" tag="div"
            >
              <div
                v-for="element in tabbarStore.list" :key="element.tabId" class="tab" :class="{
                  'tab-ontop': settingsStore.settings.topbar.switchTabbarAndToolbar,
                  'actived': element.tabId === activedTabId,
                  'no-drag': element.isPermanent || element.isPin,
                }"
              >
                <div
                  class="title"
                  :title="element.customTitleList?.find((item:any) => item.fullPath === item.fullPath)?.title || i18nTitle(element.title)"
                  @click="router.push(`${element.fullPath}`)"
                >
                  <SvgIcon
                    v-if="settingsStore.settings.tabbar.enableIcon && iconName(element.tabId === activedTabId, element.icon, element.activeIcon)"
                    class="title-icon"
                    :name="iconName(element.tabId === activedTabId, element.icon, element.activeIcon)"
                  />
                  {{
                    element.customTitleList?.find((item:any) => item.fullPath === item.fullPath)?.title || i18nTitle(element.title)
                  }}
                </div>
                <SvgIcon
                  class="action-icon" name="ri:close-fill"
                  @click.stop="tabbar.closeById(`${element.tabId}`)"
                />
              </div>
            </TransitionGroup>
          </OverlayScrollbarsComponent>
        </template>
      </hdropdown>
    </div>
  </div>
</template>

<style lang="scss">
.mx-menu-bar {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
  background-color: var(--mx-menu-backgroud);

  &.mini {
    flex-grow: 0;
  }

  .mx-menu-bar-content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .mx-menu-bar-item {
    padding: 2px 8px;
    color: var(--mx-menu-text);
    user-select: none;
    background-color: var(--mx-menu-backgroud);
    border-radius: 5px;

    &:hover {
      color: var(--mx-menu-hover-text);
      background-color: var(--mx-menu-hover-backgroud);

      .mx-menu-bar-icon-menu {
        fill: var(--mx-menu-hover-text);
      }
    }

    &.active,
    &:active {
      color: var(--mx-menu-active-text);
      background-color: var(--mx-menu-active-backgroud);
    }

    &.active .mx-menu-bar-icon-menu,
    &:active .mx-menu-bar-icon-menu {
      fill: var(--mx-menu-active-text);
    }
  }

  .mx-menu-bar-icon-menu {
    width: var(--mx-menu-icon-size);
    height: var(--mx-menu-icon-size);
    fill: var(--mx-menu-text);
  }

  &.flat .mx-menu-bar-item {
    border-radius: 0;
  }
}

.mx-menu-ghost-host {
  --at-apply: z-100;

  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  &.fullscreen {
    position: fixed;
  }

  .mx-context-menu {
    --at-apply: flex ring-stone-3 dark:ring-stone-7;

    background-color: var(--g-container-bg);

    .mx-context-menu-items .mx-context-menu-item {
      --at-apply: transition;

      &:not(.disabled):hover {
        --at-apply: cursor-pointer bg-stone-1 dark:bg-stone-9;
      }

      span {
        --at-apply: color-initial;
      }

      .icon {
        --at-apply: w-4 m-r-10px color-initial;
      }

      .disabled span,
      .disabled .icon {
        --at-apply: opacity-25;
      }
    }

    .mx-context-menu-item-sperator {
      background-color: var(--g-container-bg);

      &::after {
        --at-apply: bg-stone-2 dark:bg-stone-7;
      }
    }
  }
}

.tabbar-dropdown {
  .quick-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px 10px;

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      cursor: pointer;
      background-color: var(--g-bg);
      border: none;
      border-radius: 5px;
      outline: none;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.15s;
      transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke;

      &:hover:not(:disabled) {
        --at-apply: color-ui-primary;
      }

      &:disabled {
        cursor: not-allowed;
      }

      .icon {
        font-size: 14px;
      }
    }
  }

  .tabs {
    width: 200px;
    padding: 0 0 10px;

    &:not(.dragging) {
      .tab:hover {
        &:not(.actived) {
          background-color: var(--g-bg);
        }

        .action-icon {
          opacity: 1;
        }
      }
    }

    .tab {
      position: relative;
      width: calc(100% - 30px);
      height: 30px;
      padding: 0 5px;
      margin: 0 15px;
      background-color: var(--g-container-bg);
      border-radius: 5px;
      transition: background-color 0.3s;

      &.actived {
        background-color: var(--g-bg);
      }

      &.ghost {
        opacity: 0;
      }

      &:hover {
        .title {
          margin-right: 20px;
          opacity: 1;
          mask-image: linear-gradient(to right, #000 calc(100% - 44px), transparent);
        }
      }

      * {
        user-select: none;
      }

      .title {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        overflow: hidden;
        font-size: 14px;
        white-space: nowrap;
        cursor: pointer;
        opacity: 0.7;
        mask-image: linear-gradient(to right, #000 calc(100% - 24px), transparent);
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 0.15s;
        transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;

        .i {
          margin-right: 5px;
          font-size: 16px;
        }
      }

      .action-icon {
        transition-property: color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
        transition-duration: .15s;
        position: absolute;
        inset-inline-end: 6px;
        top: 50%;
        z-index: 10;
        width: 1.5em;
        height: 1.5em;
        margin-top: -9px;
        font-size: 12px;
        color: var(--g-tabbar-tab-color);
        pointer-events: all;
        border-radius: 50%;
        opacity: 0;

        &:hover {
          --at-apply: ring-1 ring-stone-3 dark:ring-stone-7;

          background-color: var(--g-bg);
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
[data-overlayscrollbars-viewport] {
  overscroll-behavior: contain;
}

.tabbar-container {
  position: relative;
  height: var(--g-tabbar-height);
  background-color: var(--g-bg);
  transition: background-color 0.3s;

  .tabs {
    position: absolute;
    right: 0;
    left: 0;
    padding-right: 50px;
    overflow-y: hidden;
    white-space: nowrap;
    // firefox隐藏滚动条
    scrollbar-width: none;

    // chrome隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    &.tabs-ontop {
      top: 0;
      bottom: inherit;
    }

    .tab-container {
      display: inline-block;

      &::after {
        position: absolute;
        bottom: 0;
        left: v-bind("leftPx");
        z-index: 10;
        width: v-bind("widthPx");
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
          top: 50%;
          right: -1px;
          left: -1px;
          z-index: 0;
          height: 14px;
          transform: translateY(-50%);

          &::before {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 1px;
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
        }

        .tab-content {
          display: flex;
          width: 100%;
          height: 100%;
          pointer-events: all;

          .title {
            display: flex;
            flex: 1;
            align-items: center;
            height: 100%;
            padding: 0 10px;
            margin-right: 10px;
            overflow: hidden;
            color: var(--g-tabbar-tab-color);
            white-space: nowrap;
            mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
            transition: margin-right 0.3s;

            &:has(+.action-icon) {
              margin-right: 28px;
            }

            .icon {
              margin-right: 5px;
            }
          }

          .action-icon {
            position: absolute;
            inset-inline-end: .5em;
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
              --at-apply: ring-1 ring-stone-3 dark:ring-stone-7;

              background-color: var(--g-bg);
            }
          }

          .hotkey-number {
            --at-apply: ring-1 ring-stone-3 dark:ring-stone-7 flex-center absolute z-10 top-1\/2 right-[0.5em] -translate-y-1\/2 w-6 h-6 border-rd-1\/2 font-size-12px;

            color: var(--g-tabbar-tab-color);
            background-color: var(--g-bg);
          }
        }

        .drag-handle {
          --at-apply: absolute z-9 top-0 right-0 bottom-0 left-0;
        }
      }
    }

    &.tabs-fashion {
      bottom: -1px;

      .tab-container {
        &:not(.dragging) {
          .tab:not(.actived):hover {
            & + .tab .tab-dividers::before {
              opacity: 0;
            }

            .tab-background {
              opacity: 1;

              &::before,
              &::after {
                box-shadow: 0 0 0 20px var(--g-tabbar-tab-hover-bg);
              }
            }
          }
        }

        .tab {
          height: calc(var(--g-tabbar-height) - 10px);
          margin-right: -10px;
          margin-left: 10px;
          line-height: calc(var(--g-tabbar-height) - 12px);

          &:last-child {
            margin-right: 0;
          }

          &.tab-ontop .tab-background {
            transform: rotate(180deg);
          }

          &:not(.actived) .tab-background {
            opacity: 0;
          }

          .tab-background {
            background-color: var(--g-tabbar-tab-hover-bg);
            border-radius: 10px 10px 0 0;
            transition: opacity 0.3s, background-color 0.3s;

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
            & + .tab .tab-dividers::before {
              opacity: 0;
            }

            .tab-background {
              background-color: var(--g-container-bg);
              opacity: 1;

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
        &:not(.dragging) {
          .tab:not(.actived):hover {
            .tab-background {
              background-color: var(--g-tabbar-tab-hover-bg);
            }
          }
        }

        .tab {
          height: calc(var(--g-tabbar-height) - 10px);
          margin-top: 5px;
          margin-left: 5px;
          line-height: calc(var(--g-tabbar-height) - 12px);

          .tab-dividers {
            display: none;
          }

          .tab-background {
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          &.actived {
            .tab-background {
              background-color: var(--g-container-bg);
            }
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

        &:has(>.tab.tab-ontop) {
          &::after {
            top: 0;
            bottom: unset;
          }

          .tab .tab-background {
            top: 0;
            bottom: unset;
          }
        }

        .tab:not(.actived):hover {
          .tab-background {
            height: 100%;
          }
        }

        .tab {
          .tab-background {
            top: unset;
            bottom: 0;
            height: 0;
            background-color: var(--g-tabbar-tab-hover-bg);
            transition: height 0.3s;
          }

          &.actived .tab-background {
            height: 100%;
            background-color: var(--g-container-bg);
          }
        }
      }
    }
  }

  .more-action {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 100%;
    background-image: linear-gradient(to right, transparent, var(--g-bg));

    .icon {
      --at-apply: shadow transition w-6 h-6 border-rd-5px font-size-16px cursor-pointer;

      color: var(--el-text-color-primary);
      background-color: var(--g-container-bg);
    }
  }
}

// 标签栏动画
.tabs {
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

  .tabbar-enter-active {
    transition: all 0.3s;
  }

  .tabbar-leave-active {
    position: absolute !important;
    transition: all 0.3s;
  }

  .tabbar-move {
    transition: transform 0.3s;
  }
}

.tabbar-dropdown .dropdown-tab-enter-from,
.tabbar-dropdown .dropdown-tab-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.tabbar-dropdown {
  .dropdown-tab-enter-active {
    transition: all 0.3s;
  }

  .dropdown-tab-leave-active {
    position: absolute !important;
    transition: all 0.3s;
  }

  .dropdown-tab-move[data-v-5cbb47a6] {
    transition: transform 0.3s;
  }
}
</style>
