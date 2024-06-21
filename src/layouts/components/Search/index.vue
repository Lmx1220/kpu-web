<script lang="ts" setup>
import hotkeys from 'hotkeys-js'
import { Dialog, DialogDescription, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { cloneDeep } from 'lodash-es'
import Breadcrumb from '../Breadcrumb/index.vue'
import BreadcrumbItem from '../Breadcrumb/item.vue'
import type { Menu, Tabbar } from '@/types/global'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'

import useMenuStore from '@/store/modules/menu'
import { resolveRoutePath } from '@/util'
import eventBus from '@/util/eventBus'
import { i18nTitleInjectionKey } from '@/layouts/components/Menu/types.ts'

defineOptions({
  name: 'Search',
})
const overlayTransitionClass = ref({
  enter: 'ease-in-out duration-500',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in-out duration-500',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
})

const transitionClass = computed(() => {
  return {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    enterTo: 'opacity-100 translate-y-0 sm:scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
    leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
  }
})

const router = useRouter()
const { t } = useI18n()
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const tabbarStore = useTabbarStore()

interface listTypes {
  path: string
  icon?: string
  title?: string | (() => string)
  link?: string
  i18n?: string
  breadcrumb: any[]
}

const switchType = ref()

const i18nTitle = inject(i18nTitleInjectionKey)!
const isShow = ref(false)

const searchInput = ref('')
const sourceList: Ref<listTypes[]> = ref([])
const actived = ref(-1)

const searchInputRef = ref()
const searchResultRef = ref<OverlayScrollbarsComponentRef>()
const searchResultItemRef = ref<HTMLElement[]>([])
onBeforeUpdate(() => {
  searchResultItemRef.value = []
})

const resultList: Ref<listTypes[]> = computed(() => {
  let result = []
  result = sourceList.value.filter((item) => {
    let flag = false
    if (i18nTitle(item.title).includes(searchInput.value)) {
      flag = true
    }
    if (item?.path.includes(searchInput.value)) {
      flag = true
    }
    if (item.breadcrumb.some(b => i18nTitle(b.title).includes(searchInput.value))) {
      flag = true
    }
    return flag
  })
  return result
})
const input = ref<HTMLInputElement>()
watch(() => isShow.value, (val) => {
  if (val) {
    searchInput.value = ''
    actived.value = -1
    // 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
    hotkeys('up', keyUp)
    hotkeys('down', keyDown)
    hotkeys('enter', keyEnter)
    setTimeout(() => {
      input.value && input.value.focus()
    }, 500)
  }
  else {
    // document.querySelector('body')?.classList.remove('hidden')
    hotkeys.unbind('up', keyUp)
    hotkeys.unbind('down', keyDown)
    hotkeys.unbind('enter', keyEnter)
    setTimeout(() => {
      searchInput.value = ''
      actived.value = -1
    }, 500)
  }
})
watch(() => resultList.value, () => {
  actived.value = -1
  handleScroll()
})

onMounted(() => {
  eventBus.on('global-search-toggle', (_switchType: any) => {
    isShow.value || toSearch(_switchType as string)
    isShow.value = !isShow.value
  })
  hotkeys('alt+s', (e) => {
    if (settingsStore.settings.toolbar.navSearch) {
      e.preventDefault()
      toSearch()
      isShow.value = true
    }
  })
  hotkeys('esc', (e) => {
    if (settingsStore.settings.toolbar.navSearch) {
      e.preventDefault()
      isShow.value = false
    }
  })
  toSearch()
})
function toSwitchType(val: string | number | boolean) {
  input.value && input.value.focus()
  toSearch(val as string)
}
function toSearch(_switchType = 'menu') {
  switchType.value = _switchType
  sourceList.value = []
  switch (_switchType) {
    case 'menu':
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        menuStore.allMenus.forEach((item) => {
          getSourceListByMenus(item.children)
        })
      }
      break
    case 'tab':
      getTabbarList(tabbarStore.list)
      break
  }
}
function hasChildren(item: Menu.recordRaw) {
  let flag = true
  if (item.children) {
    if (item.children.every(i => i.meta?.menu === false)) {
      flag = false
    }
  }
  else {
    flag = false
  }
  return flag
}

function getSourceListByMenus(arr: Menu.recordRaw[], basePath?: string, icon?: string, breadcrumb?: { title?: string | (() => string) }[]) {
  arr.forEach((item) => {
    if (item.meta?.menu !== false) {
      const breadcrumbTemp = cloneDeep(breadcrumb) || []
      if (item.children && hasChildren(item)) {
        breadcrumbTemp.push({
          title: item.meta?.title,
        })
        getSourceListByMenus(item.children, resolveRoutePath(basePath, item.path), item.meta?.icon ?? icon, breadcrumbTemp)
      }
      else {
        breadcrumbTemp.push({
          title: item.meta?.title,
        })
        sourceList.value.push({
          path: resolveRoutePath(basePath, item.path),
          icon: item.meta?.icon ?? icon,
          title: item.meta?.title,
          link: item.meta?.link,
          breadcrumb: breadcrumbTemp,
        })
      }
    }
  })
}

function getTabbarList(tabbarList: Tabbar.recordRaw[]) {
  tabbarList.forEach((item) => {
    sourceList.value.push({
      icon: item.icon,
      title: typeof item.title === 'function' ? item.title() : item.title || '',
      path: item.fullPath,
      i18n: item.i18n,
      breadcrumb: [],
    })
  },
  )
}
function keyUp() {
  if (resultList.value.length) {
    actived.value -= 1
    if (actived.value < 0) {
      actived.value = resultList.value.length - 1
    }
    handleScroll()
  }
}
function keyDown() {
  if (resultList.value.length) {
    actived.value += 1
    if (actived.value > resultList.value.length - 1) {
      actived.value = 0
    }
    handleScroll()
  }
}
function keyEnter() {
  if (actived.value !== -1) {
    searchResultItemRef.value[actived.value].click()
  }
}
function handleScroll() {
  if (searchResultRef.value) {
    const contentDom = searchResultRef.value.osInstance()!.elements().content
    let scrollTo = 0
    if (actived.value !== -1) {
      scrollTo = contentDom.scrollTop
      const activedOffsetTop = searchResultItemRef.value.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.offsetTop ?? 0
      const activedClientHeight = searchResultItemRef.value.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.clientHeight ?? 0
      const searchScrollTop = contentDom.scrollTop
      const searchClientHeight = contentDom.clientHeight
      if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
        scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight
      }
      else if (activedOffsetTop <= searchScrollTop) {
        scrollTo = activedOffsetTop
      }
    }
    contentDom.scrollTo({
      top: scrollTo,
    })
  }
}

function pageJump(path: listTypes['path'], link: listTypes['link']) {
  if (link) {
    window.open(link, '_blank')
  }
  else {
    router.push(path)
  }
  isShow.value = false
}
</script>

<template>
  <TransitionRoot :show="isShow" as="template">
    <Dialog
      :initial-focus="searchInputRef" class="fixed inset-0 z-2000 flex"
      @close="isShow && eventBus.emit('global-search-toggle')"
    >
      <TransitionChild as="template" v-bind="overlayTransitionClass">
        <div class="fixed inset-0 bg-stone-200/75 backdrop-blur-sm transition-opacity dark:bg-stone-8/75" />
      </TransitionChild>
      <div class="fixed inset-0">
        <div class="h-full flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" v-bind="transitionClass">
            <DialogPanel class="relative h-full max-h-4/5 w-full flex flex-col text-left sm:max-w-2xl">
              <HTabList
                v-model="switchType"
                :options="[
                  { label: t('app.search.type.menu'), value: 'menu' },
                  { label: t('app.search.type.tab'), value: 'tab' },
                ]"
                class="mb-4 flex!" @change="toSwitchType"
                @click.stop="() => {}"
              />
              <div class="flex flex-col overflow-y-auto rounded-xl bg-white shadow-xl dark:bg-stone-8">
                <div border-b="~ solid stone-2 dark:stone-7" class="flex items-center px-4 py-3">
                  <SvgIcon :size="18" class="text-stone-5" name="ep:search" />
                  <input
                    ref="searchInputRef" v-model="searchInput" class="w-full border-0 rounded-md bg-transparent px-3 text-base text-dark dark:text-white focus:outline-none placeholder-stone-4 dark:placeholder-stone-5"
                    placeholder="搜索页面，支持标题、URL模糊查询"
                    @keydown.esc="eventBus.emit('global-search-toggle')" @keydown.up.prevent="keyUp"
                    @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter"
                  >
                </div>
                <DialogDescription class="relative m-0 of-y-hidden">
                  <OverlayScrollbarsComponent
                    ref="searchResultRef"
                    :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }"
                    defer
                    class="h-full"
                  >
                    <template v-if="resultList.length > 0">
                      <a
                        v-for="(item, index) in resultList" :key="item.path" ref="searchResultItemRef"
                        :class="{ 'bg-stone-2/40 dark:bg-stone-7/40': index === actived }"
                        :data-index="index" class="flex cursor-pointer items-center"
                        @click="pageJump(item.path, item.link)" @mouseover="actived = index"
                      >
                        <SvgIcon
                          v-if="item.icon" :class="{ 'scale-120 text-ui-primary': index === actived }" :name="item.icon" :size="20"
                          class="basis-16 transition"
                        />
                        <div
                          border-l="~ solid stone-2 dark:stone-7"
                          class="flex flex-1 flex-col gap-1 truncate px-4 py-3"
                        >
                          <div class="truncate text-base font-bold">{{
                            i18nTitle(item.title)
                          }}
                          </div>
                          <Breadcrumb v-if="item.breadcrumb.length" class="truncate">
                            <BreadcrumbItem v-for="(bc, bcIndex) in item.breadcrumb" :key="bcIndex" class="text-xs">
                              {{ i18nTitle(bc.title) }}
                            </BreadcrumbItem>
                          </Breadcrumb>
                        </div>
                      </a>
                    </template>
                    <template v-else>
                      <div flex="center col" py-6 text-stone-5>
                        <SvgIcon :size="40" name="tabler:mood-empty" />
                        <p m-2 text-base>
                          没有找到你想要的
                        </p>
                      </div>
                    </template>
                  </OverlayScrollbarsComponent>
                </DialogDescription>
                <div
                  v-if="settingsStore.mode === 'pc'" border-t="~ solid stone-2 dark:stone-7"
                  class="flex justify-between px-4 py-3"
                >
                  <div class="flex gap-8">
                    <div class="inline-flex items-center gap-1 text-xs">
                      <HKbd>
                        <SvgIcon :size="14" name="ion:md-return-left" />
                      </HKbd>
                      <span>访问</span>
                    </div>
                    <div class="inline-flex items-center gap-1 text-xs">
                      <HKbd>
                        <SvgIcon :size="14" name="ant-design:caret-up-filled" />
                      </HKbd>
                      <HKbd>
                        <SvgIcon :size="14" name="ant-design:caret-down-filled" />
                      </HKbd>
                      <span>切换</span>
                    </div>
                  </div>
                  <div
                    v-if="settingsStore.settings.navSearch.enableHotkeys"
                    class="inline-flex items-center gap-1 text-xs"
                  >
                    <HKbd>
                      ESC
                    </HKbd>
                    <span>退出</span>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss" scoped>
#search {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  visibility: hidden;
  background-image: radial-gradient(transparent 1px, rgb(0 0 0 / 30%) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  opacity: 0;
  transition: all 0.2s;

  &.searching {
    visibility: visible;
    opacity: 1;

    .container {
      filter: initial;
      transform: initial;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
    filter: blur(10px);
    transition: all 0.2s;
    transform: scale(1.1);

    .search-box {
      margin: 50px 20px 40px;
      text-align: center;

      .switch-type {
        margin: -20px 0 20px;
      }

      :deep(.el-input__inner) {
        height: 52px;
        line-height: 52px;
      }

      .tips {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 20px;
        font-size: 14px;
        line-height: 24px;
        color: #fff;

        .tip {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 20px;

          .el-tag {
            margin: 0 5px;

            &:first-child {
              margin-left: 0;
            }

            &:last-child {
              margin-right: 0;
            }

            :deep(.el-tag__content) {
              display: inline-flex;
              align-items: center;
            }
          }
        }
      }
    }

    .result {
      position: relative;
      margin: 0 20px 50px;
      overflow: auto;
      background-color: var(--el-bg-color);
      // max-height: calc(100% - 250px);
      border-radius: 5px;
      box-shadow: 0 0 0 1px var(--el-border-color-darker);

      &.mobile {
        max-height: calc(100% - 200px);
      }

      .item {
        display: flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.1s;

        &.actived {
          background-color: var(--el-bg-color-page);

          .icon {
            .icon {
              color: var(--el-color-primary);
              transform: scale(1.2);
            }
          }

          .info {
            border-left-color: var(--el-border-color);

            .title {
              color: var(--el-text-color-primary);
            }

            .breadcrumb,
            .path {
              color: var(--el-text-color-regular);
            }
          }
        }

        .icon {
          flex: 0 0 66px;
          text-align: center;

          .icon {
            font-size: 20px;
            color: var(--el-color-info);
            transition: all 0.1s;
          }
        }

        .info {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-around;
          height: 70px;
          padding: 5px 10px 7px;
          border-left: 1px solid var(--el-border-color-lighter);
          transition: all 0.1s;

          @include text-overflow(1, true);

          .title {
            font-size: 18px;
            font-weight: bold;
            color: var(--el-text-color-regular);

            @include text-overflow(1, true);

            .icon {
              font-size: 14px;
            }
          }

          .breadcrumb,
          .path {
            font-size: 12px;
            color: var(--el-text-color-secondary);
            transition: all 0.1s;

            @include text-overflow(1, true);
          }

          .breadcrumb {
            display: flex;
            align-items: center;

            span {
              display: flex;
              align-items: center;

              .icon {
                margin: 0 5px;
              }

              &:last-child .icon {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
