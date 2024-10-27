<script setup lang="ts">
import type { window } from '#/global'
import useFavoritesStore from '@/store/modules/favorites.ts'
import useSettingsStore from '@/store/modules/settings'
import useWindowStore from '@/store/modules/window'
import eventBus from '@/utils/eventBus'
import storage from '@/utils/storage.ts'
import ContextMenu from '@imengyu/vue3-context-menu'
import hotkeys from 'hotkeys-js'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Sortable from 'sortablejs'
import Message from 'vue-m-message'
import Empty from './Empty/index.vue'

defineOptions({
  name: 'Dashboard',
})

const mode = ref('preview')
const settingsStore = useSettingsStore()
const favoritesStore = useFavoritesStore()
const windowStore = useWindowStore()

const { t } = useI18n()
const { generateI18nTitle } = useMenu()

const appWindow = useWindow()

const windowList = computed({
  get() {
    return windowStore.list
  },
  set(data: window[]) {
    windowStore.sort(data)
  },
})

const windowsRef = ref()
const dashboardContainerRef = ref()
const windowItemRef = ref<any>([])

const setWindowItemRef = (el: any) => windowItemRef.value.push(el)

onBeforeUpdate(() => {
  windowItemRef.value = []
})

const dragging = ref(false)
onMounted(() => {
  // eslint-disable-next-line no-new
  new Sortable(dashboardContainerRef.value.$el, {
    animation: 200,
    ghostClass: 'window-ghost',
    draggable: '.window',
    handle: '.draggable',
    onStart: () => {
      dragging.value = !0
    },
    onEnd: () => {
      dragging.value = !1
    },
    onUpdate: (e) => {
      if (e.newIndex !== void 0 && e.oldIndex !== void 0) {
        windowList.value.splice(e.newIndex, 0, windowList.value.splice(e.oldIndex, 1)[0])
      }
    },
  })
})
const focusList = ref<string[]>([])
const focus = ref(false)

function addFocus(name: string) {
  if (focusList.value.includes(name)) {
    focusList.value = focusList.value.filter(item => item !== name)
  }
  else if (focusList.value.length < settingsStore.settings.window.focusMaxNum) {
    focusList.value.push(name)
  }
  else {
    Message.warning(`最多可勾选不超过 ${settingsStore.settings.window.focusMaxNum} 个窗口`, {
      zIndex: 2000,
    })
  }
}

function enterFocus() {
  focus.value = true
  exitPreviewAllWindows()
}

watch(() => windowStore.list, (val) => {
  nextTick(() => {
    if (val.length > 0) {
      windowScrollTip()
    }
  })
}, {
  deep: true,
})

const showWindowScrollTip = ref(false)
function windowScrollTip() {
  if (windowsRef.value.scrollWidth > windowsRef.value.clientWidth && localStorage.getItem('windowScrollTip') === null) {
    showWindowScrollTip.value = true
    localStorage.setItem('windowScrollTip', '')
  }
}

// 记录进入窗口预览界面前 scrollLeft 的值，退出的时候可以进行复原
const originalScrollLeft = ref(0)
watch(() => settingsStore.previewAllWindows, (val) => {
  if (val) {
    mode.value = 'preview'
    focusList.value = []
    originalScrollLeft.value = windowsRef.value.scrollLeft
  }
})

onMounted(() => {
  hotkeys('alt+w', (e) => {
    if (settingsStore.settings.window.enableHotkeys && windowStore.list.length > 1 && windowStore.list.every(item => !item.isMaximize)) {
      e.preventDefault()
      if (settingsStore.previewAllWindows) {
        exitPreviewAllWindows()
      }
      else {
        settingsStore.$patch({
          previewAllWindows: true,
        })
      }
    }
  })
})

function scrollToOriginal(scrollLeft: number) {
  nextTick(() => {
    windowsRef.value.scroll(scrollLeft, 0)
  })
}
function scrollToWindow(windowName: string | unknown) {
  nextTick(() => {
    const index = windowStore.list.findIndex(item => item.name === windowName)
    const offsetLeft = windowItemRef.value[index].offsetLeft
    windowsRef.value.scrollTo({
      left: offsetLeft,
      behavior: 'smooth',
    })
  })
}
function focusPrev(name: string) {
  const index = windowStore.list.findIndex(item => item.name === name)
  if (index > 0) {
    scrollToWindow(windowStore.list[index - 1].name)
  }
}

function focusNext(name: string) {
  const index = windowStore.list.findIndex(item => item.name === name)
  if (index + 1 < windowStore.list.length) {
    scrollToWindow(windowStore.list[index + 1].name)
  }
}

eventBus.on('scrollToWindow', scrollToWindow)

const focusTip = ref(false)

function onDashboardContextmenu(event: MouseEvent, item: window) {
  event.preventDefault()
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    zIndex: 3,
    iconFontClass: '',
    customClass: 'contextmenu-custom',
    items: [
      {
        label: t('app.window.reload'),
        icon: 'i-ri:refresh-line',
        onClick: () => appWindow.reload(item.name),
      },
      {
        label: t('app.window.remove'),
        icon: 'i-ri:close-line',
        divided: true,
        onClick: () => {
          appWindow.remove(item.name)
        },
      },
      {
        label: t('app.window.maximize'),
        icon: 'i-ri:picture-in-picture-exit-line',
        // 主页不允许被固定，因为如果固定主页且主页未启用，会导致登录时进入路由死循环状态
        onClick: () => {
          appWindow.toggleMaximize(item.name)
        },
      },
      {
        label: t('app.window.focus'),
        icon: 'i-ri:focus-3-line',
        divided: true,
        onClick: () => {
          scrollToWindow(item.name)
          if (!storage.local.has('windowFocusTip')) {
            focusTip.value = true
            storage.local.set('windowFocusTip', '')
          }
        },
      },
      {
        label: t('app.window.focusPrev'),
        disabled: windowStore.list[0].name === item.name,
        onClick: () => focusPrev(item.name),
      },
      {
        label: t('app.window.focusNext'),
        disabled: windowStore.list[windowStore.list.length - 1].name === item.name,
        divided: true,
        onClick: () => focusNext(item.name),
      },
      {
        label: t('app.window.removeOtherSide'),
        disabled: !windowStore.list.some(row => row.name !== item.name),
        onClick: () => {
          windowStore.removeOtherSide(item.name)
        },
      },
      {
        label: t('app.window.removeLeftSide'),
        disabled: windowStore.list[0].name === item.name,
        onClick: () => {
          windowStore.removeLeftSide(item.name)
        },
      },
      {
        label: t('app.window.removeRightSide'),
        disabled: windowStore.list[windowStore.list.length - 1].name === item.name,
        onClick: () => {
          windowStore.removeRightSide(item.name)
        },
      },
    ],
  })
}

function exitPreviewAllWindows() {
  if (settingsStore.previewAllWindows) {
    settingsStore.$patch({
      previewAllWindows: false,
    })
    scrollToOriginal(originalScrollLeft.value)
  }
}

function exitFocus() {
  if (focus.value) {
    focus.value = false
    focusList.value = []
  }
}
function maskClick(windowName: string) {
  exitPreviewAllWindows()
  setTimeout(() => {
    scrollToWindow(windowName)
  }, 0)
}
</script>

<template>
  <div
    ref="windowsRef" class="dashboard" :class="{
      [`scroll-snap-${settingsStore.settings.window.autoPosition}`]: settingsStore.settings.window.autoPosition !== '',
      'preview-all': settingsStore.previewAllWindows,
      'focus': focus,
    }" @click="exitPreviewAllWindows"
  >
    <div class="preview-all-mode">
      <HTabList
        v-model="mode"
        :options="[
          { label: '预览', value: 'preview' },
          { label: '排序', value: 'drag' },
        ]"
        class="w-sm"
        @click.stop
      />
    </div>
    <TransitionGroup
      v-show="windowStore.list.length > 0"
      ref="dashboardContainerRef" :name="dragging ? undefined : 'window'" tag="div" class="dashboard-container"
      :class="{
        'mode-drag': settingsStore.previewAllWindows && mode === 'drag',
        'dragging': dragging,
      }"
    >
      <div
        v-for="element in windowList" :key="element.name" :ref="setWindowItemRef" class="window"
        :class="{
          'window-focus': focus && focusList.findIndex(item => item === element.name) >= 0,
        }"
        :style="`--g-window-width: ${typeof settingsStore.settings.window.defaultWidth === 'string' ? settingsStore.settings.window.defaultWidth : `${settingsStore.settings.window.defaultWidth}px`};`"
      >
        <div
          class="window-container" :class="{
            maximize: element.isMaximize,
            preview: settingsStore.previewAllWindows,
          }"
        >
          <div v-if="!element.noTitle" class="header" @dblclick="scrollToWindow(element.name)" @contextmenu="(e) => onDashboardContextmenu(e, element)">
            <div class="titles">
              <HTooltip v-if="element.title" :text="element.breadcrumbNeste?.map(bc => generateI18nTitle(bc.title)).join('/') as string" placement="bottom-start" :delay="500">
                <span class="title">
                  {{ generateI18nTitle(element.title) }}
                </span>
              </HTooltip>
            </div>
            <div class="btns" @dblclick.stop>
              <div v-if="settingsStore.settings.toolbar.favorites && favoritesStore.canAdd(element.name)" class="btn" @click="() => favoritesStore.isAdd(element.name) ? favoritesStore.remove(element.name) : favoritesStore.add(element.name)">
                <SvgIcon :name="favoritesStore.isAdd(element.name) ? 'i-tabler:star-filled' : 'i-tabler:star'" />
              </div>
              <div class="btn" @click="appWindow.toggleMaximize(element.name)">
                <SvgIcon name="i-ri:picture-in-picture-exit-line" />
              </div>
              <div class="btn" @click="appWindow.remove(element.name)">
                <SvgIcon name="i-ep:close-bold" />
              </div>
            </div>
          </div>
          <div class="maximize-exit" @click="appWindow.toggleMaximize(element.name)">
            <SvgIcon name="i-ri:picture-in-picture-2-line" class="icon" />
          </div>
          <div class="flex-1 of-auto overscroll-contain">
            <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="h-full">
              <Component :is="element.name" v-if="!element.reload" :params="element.params" />
            </OverlayScrollbarsComponent>
          </div>
          <div class="mask" @click="maskClick(element.name)">
            <div class="w-full flex-center flex-1 cursor-pointer pt-[10%] text-5xl c-stone-3 text-shadow transition dark-c-stone-7 hover-c-stone-5">
              点击进入
            </div>
            <div
              class="h-[20%] w-full flex-center cursor-pointer border-t border-t-stone-3 border-t-dashed c-stone-3 transition dark-border-t-stone-7 dark-c-stone-7 hover-c-stone-5"
              :class="{ 'c-stone-5': focusList.includes(element.name) }"
              @click.stop="addFocus(element.name)"
            >
              <SvgIcon :name="focusList.includes(element.name) ? 'i-material-symbols:check-box' : 'i-material-symbols:check-box-outline'" :size="60" />
            </div>
          </div>
          <div class="draggable" @click.stop>
            <div class="title">
              {{ generateI18nTitle(element.title) }}
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
    <Empty v-show="windowStore.list.length === 0" />
  </div>
  <div
    class="preview-all-focus-actions" :class="{
      show: (settingsStore.previewAllWindows && mode === 'preview' || focus) && focusList.length > 0,
    }"
  >
    <span v-if="focusList.length === 1">再勾选一个窗口，可开启专注模式</span>
    <HButton v-else-if="settingsStore.previewAllWindows && mode === 'preview' && focusList.length > 1" @click.stop="enterFocus">
      进入专注模式
    </hbutton>
    <HButton v-else-if="focus" @click.stop="exitFocus">
      退出专注模式
    </hbutton>
  </div>
  <HDialog v-model="focusTip" title="温馨提示">
    <div class="text-center text-sm">
      你可以通过双击标题栏快速聚焦窗口
    </div>
  </HDialog>
  <HDialog v-model="showWindowScrollTip" title="温馨提示">
    <div class="text-sm">
      当前窗口数量已超过浏览器展示区域，你可以通过拖动窗口下方的滚动条进行定位，除此之外，我们推荐使用以下三种更高效的方式进行窗口定位：
      <ol>
        <li>在窗口展示区域内，按住 Shift 键，滑动鼠标滚轮</li>
        <li>在窗口标题区域，双击或右键选择“聚焦”选项</li>
        <li>使用 Alt + W 快捷键进入预览界面</li>
      </ol>
    </div>
  </HDialog>
</template>

<style>
.contextmenu-custom {
  --uno: fixed ring-1 ring-stone-2 dark-ring-stone-7 shadow-2xl;

  background-color: var(--g-app-bg);

  .mx-context-menu-items .mx-context-menu-item {
    --uno: transition-background-color;

    &:not(.disabled):hover {
      --uno: cursor-pointer bg-stone-1 dark-bg-stone-9;
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
    background-color: var(--g-app-bg);

    &::after {
      --uno: bg-stone-2 dark-bg-stone-7;
    }
  }
}
</style>

<style scoped>
.dashboard {
  --uno: absolute top-0 bottom-0 w-full of-x-auto of-y-hidden transition;

  &[class*="scroll-snap"] {
    scroll-snap-type: x mandatory;
  }

  &.scroll-snap-start .window {
    scroll-snap-align: start;
  }

  &.scroll-snap-center .window {
    scroll-snap-align: center;
  }

  &.scroll-snap-end .window {
    scroll-snap-align: end;
  }

  &.preview-all {
    --uno: fixed z-2000 top-0 bottom-0 left-0 right-0 of-y-auto bg-stone-200/75 dark-bg-stone-8/75 backdrop-blur-sm;

    .preview-all-mode {
      display: block;
    }

    .dashboard-container {
      --uno: flex-wrap justify-center bottom-a h-max pb-15;

      &:not(.mode-drag) {
        align-items: center;

        .window {
          height: var(--g-window-height);
          margin-inline-end: calc(var(--g-window-width) * (var(--g-window-perview-scale) - 1));
          margin-bottom: calc(var(--g-window-height) * (var(--g-window-perview-scale) - 1));
          user-select: none;
          transform: scale(var(--g-window-perview-scale));
          transform-origin: top left;
        }
      }

      &.mode-drag .window {
        width: 200px;
        margin-right: unset;

        .window-container {
          margin: 8px;

          > * {
            display: none;
          }

          .draggable {
            display: block;
          }
        }
      }
    }
  }

  .preview-all-mode {
    display: none;
    padding: 20px 0;
    text-align: center;
  }

  &.focus {
    --uno: fixed z-2000 top-0 bottom-0 left-0 right-0 of-y-auto bg-stone-200/75 dark-bg-stone-8/75 backdrop-blur-sm;

    .dashboard-container {
      align-items: stretch;
      justify-content: space-between;
      height: calc(100% - 80px);

      >.window {
        display: none;
        flex: unset;
        width: 100%;
        padding: 10px;
        margin-inline-end: unset;
        overflow: auto;

        .window-container {
          width: 100%;
          height: 100%;
          margin: 0;

          .header {
            display: none;
          }
        }

        &.window-focus {
          display: block;
        }
      }
    }
  }

  .dashboard-container {
    display: flex;
    height: 100%;
  }

  .window {
    display: flex;
    flex: none;
    width: var(--g-window-width);
    margin-inline-end: -16px;

    &.window-ghost {
      opacity: 0;
    }

    .window-container {
      --uno: shadow hover-shadow-lg transition;

      display: flex;
      flex: 1;
      flex-direction: column;
      width: calc(100% - 32px);
      margin: 16px;
      background-color: var(--g-app-bg);

      &.maximize {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        width: 100%;
        height: 100%;
        margin: 0;

        .header {
          display: none;
        }

        .maximize-exit {
          display: block;
        }
      }

      &.preview {
        .mask {
          display: flex;
        }
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        padding: 10px;
        border-bottom: 1px solid var(--g-border-color);

        .titles {
          display: flex;
          align-items: center;

          .title {
            --uno: c-dark dark-c-light;

            font-size: 14px;
            font-weight: bold;
          }

          .title + .btns {
            margin-left: 10px;
          }
        }

        .btns {
          display: flex;
          gap: 5px;

          .btn {
            --uno: c-dark dark-c-light bg-stone-1 hover-bg-stone-2 dark-bg-stone-9 dark-hover-bg-stone-8 transition;

            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 3px;
          }
        }
      }

      .maximize-exit {
        position: fixed;
        top: -40px;
        right: -40px;
        z-index: 1000;
        display: none;
        width: 80px;
        height: 80px;
        cursor: pointer;
        background-color: #0000004d;
        border-radius: 50%;
        transition: 0.3s;

        .icon {
          position: absolute;
          bottom: 16px;
          left: 16px;
          transition: 0.3s;
        }

        &:hover {
          background-color: #000000b3;

          .icon {
            color: #fff;
          }
        }
      }

      .mask {
        --uno: bg-stone-1/75 dark-bg-stone-9/75;

        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        margin: 16px;
      }
    }

    .draggable {
      display: none;
      padding: 10px;
      cursor: move;

      .title {
        display: -webkit-box;
        height: 48px;
        overflow: hidden;
        font-size: 14px;
        line-height: 24px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.preview-all-focus-actions {
  position: fixed;
  bottom: -3.75rem;
  left: 0;
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.75rem;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  transition-property: bottom;

  &.show {
    bottom: 0;
  }

  span {
    font-size: 1.125rem;
    line-height: 1.75rem;

    --uno: text-shadow;
  }
}

.window-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.window-enter-active {
  transition: all 0.5s;
}
</style>
