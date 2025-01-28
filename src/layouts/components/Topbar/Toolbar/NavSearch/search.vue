<script setup lang="ts">
import type { Menu } from '@/types/global'
import Breadcrumb from '@/layouts/components/Breadcrumb/index.vue'
import BreadcrumbItem from '@/layouts/components/Breadcrumb/item.vue'
import { $t } from '@/locales/utils'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import { resolveRoutePath } from '@/utils'
import { cloneDeep } from 'es-toolkit'
import hotkeys from 'hotkeys-js'
import { match } from 'pinyin-pro'

defineOptions({
  name: 'Search',
})

const router = useRouter()
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const { generateI18nTitle } = useMenu()

interface listTypes {
  path: string
  icon?: string
  title?: string | (() => string)
  // i18n?: string
  link?: string
  breadcrumb: {
    title?: string | (() => string)
  }[]
}

const searchInput = ref('')
const sourceList = ref<listTypes[]>([])
const actived = ref(-1)
const [KpuModal, modalApi] = useKpuModal({
  onOpenChange(val) {
    if (val) {
      searchInput.value = ''
      actived.value = -1
      // 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
      hotkeys('up', keyUp)
      hotkeys('down', keyDown)
      hotkeys('enter', keyEnter)
      hotkeys('esc', (e) => {
        if (settingsStore.settings.navSearch.enableHotkeys) {
          e.preventDefault()
          modalApi.close()
        }
      })
    }
    else {
      hotkeys.unbind('up', keyUp)
      hotkeys.unbind('down', keyDown)
      hotkeys.unbind('enter', keyEnter)
      hotkeys.unbind('esc')
    }
  },
})
const dialogAreaRef = useTemplateRef('dialogAreaRef')
const searchResultItemRef = useTemplateRef<HTMLElement[]>('searchResultItemRef')

const resultList = computed(() => {
  let result = []
  result = sourceList.value.filter((item) => {
    let flag = false
    if (searchInput.value !== '') {
      if (item.path.includes(searchInput.value)) {
        flag = true
      }
      const title = match(generateI18nTitle(item.title).toString(), searchInput.value, { continuous: true })
      if (
        generateI18nTitle(item.title).toString().includes(searchInput.value)
        || (title && title.length > 0)
      ) {
        flag = true
      }
      if (item.breadcrumb.some((b) => {
        const title1 = match(generateI18nTitle(b.title).toString(), searchInput.value, { continuous: true })
        return generateI18nTitle(b.title).toString().includes(searchInput.value)
          || (title1 && title1?.length > 0)
      })) {
        flag = true
      }
    }
    return flag
  })
  return result
})
watch(() => resultList.value, () => {
  actived.value = -1
  handleScroll()
})

onMounted(() => {
  initSourceList()
  hotkeys('command+k, ctrl+k', (e) => {
    if (settingsStore.settings.navSearch.enableHotkeys) {
      e.preventDefault()
      modalApi.open()
    }
  })
})

onUnmounted(() => {
  hotkeys.unbind('command+k, ctrl+k')
})

function initSourceList() {
  sourceList.value = []
  menuStore.allMenus.forEach((item) => {
    getSourceListByMenus(item.children)
  })
}

function hasChildren(item: Menu.recordRaw) {
  let flag = true
  if (item.children?.every(i => i.meta?.menu === false)) {
    flag = false
  }
  return flag
}
function getSourceListByMenus(arr: Menu.recordRaw[], basePath?: string, icon?: string, breadcrumb?: { title?: string | (() => string), i18n?: string }[]) {
  arr.forEach((item) => {
    if (item.meta?.menu !== false) {
      const breadcrumbTemp = cloneDeep(breadcrumb) || []
      if (item.children && hasChildren(item)) {
        breadcrumbTemp.push({
          title: item.meta?.title,
          // i18n: item.meta?.i18n,
        })
        getSourceListByMenus(item.children, resolveRoutePath(basePath, item.path), item.meta?.icon ?? icon, breadcrumbTemp)
      }
      else {
        breadcrumbTemp.push({
          title: item.meta?.title,
          // i18n: item.meta?.i18n,
        })
        sourceList.value.push({
          path: resolveRoutePath(basePath, item.path),
          icon: item.meta?.icon ?? icon,
          title: item.meta?.title,
          // i18n: item.meta?.i18n,
          link: item.meta?.link,
          breadcrumb: breadcrumbTemp,
        })
      }
    }
  })
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
    searchResultItemRef.value?.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.click()
  }
}
function handleScroll() {
  if (dialogAreaRef.value?.ref?.el?.viewportElement) {
    const contentDom = dialogAreaRef.value.ref.el.viewportElement
    let scrollTo = 0
    if (actived.value !== -1) {
      scrollTo = contentDom.scrollTop
      const activedOffsetTop = searchResultItemRef.value?.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.offsetTop ?? 0
      const activedClientHeight = searchResultItemRef.value?.find(item => Number.parseInt(item.dataset.index!) === actived.value)?.clientHeight ?? 0
      const searchScrollTop = contentDom.scrollTop
      const searchClientHeight = contentDom.clientHeight
      if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
        scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight
      }
      else if (activedOffsetTop <= searchScrollTop) {
        scrollTo = activedOffsetTop - 16
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
  modalApi.close()
}
</script>

<template>
  <KpuModal :footer="false" :closable="false" :fullscreen-button="false" border class="w-full lg-max-w-2xl" content-class="flex flex-col p-0 min-h-auto" header-class="p-0" footer-class="p-0">
    <template #header>
      <div class="h-12 flex flex-shrink-0 items-center">
        <div class="h-full w-14 flex-center">
          <KpuIcon name="i-ri:search-line" :size="18" class="text-foreground/30" />
        </div>
        <input v-model="searchInput" :placeholder="$t('app.search.input')" class="h-full w-full border-0 rounded-md bg-transparent text-base text-foreground focus-outline-none placeholder-foreground/30" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter">
        <div v-if="settingsStore.mode === 'mobile'" class="h-full w-14 flex-center border-s">
          <KpuIcon name="i-carbon:close" :size="18" @click="() => modalApi.close()" />
        </div>
      </div>
    </template>
    <template v-if="settingsStore.mode === 'pc'" #footer>
      <div class="w-full flex justify-between px-4 py-3">
        <div class="flex gap-8">
          <div class="inline-flex items-center gap-1 text-xs">
            <KpuKbd>
              <KpuIcon name="i-ion:md-return-left" :size="14" />
            </KpuKbd>
            <span>{{ $t('app.search.enter') }}</span>
          </div>
          <div class="inline-flex items-center gap-1 text-xs">
            <KpuKbd>
              <KpuIcon name="i-ant-design:caret-up-filled" :size="14" />
            </KpuKbd>
            <KpuKbd>
              <KpuIcon name="i-ant-design:caret-down-filled" :size="14" />
            </KpuKbd>
            <span>{{ $t('app.search.up_down') }}</span>
          </div>
        </div>
        <div v-if="settingsStore.settings.navSearch.enableHotkeys" class="inline-flex items-center gap-1 text-xs">
          <KpuKbd>
            ESC
          </KpuKbd>
          <span>{{ $t('app.search.esc') }}</span>
        </div>
      </div>
    </template>
    <KpuScrollArea ref="dialogAreaRef" class="flex-1">
      <div>
        <template v-if="resultList.length > 0">
          <div v-for="(item, index) in resultList" ref="searchResultItemRef" :key="item.path" class="p-4" :data-index="index" @click="pageJump(item.path, item.link)" @mouseover="actived = index">
            <a class="flex cursor-pointer items-center border rounded-lg" :class="{ '-mt-4': index !== 0, 'bg-accent': index === actived }">
              <KpuIcon v-if="item.icon" :name="item.icon" :size="20" class="basis-16 transition" :class="{ 'scale-120 text-primary': index === actived }" />
              <div class="flex flex-1 flex-col gap-1 truncate border-s px-4 py-3">
                <div class="truncate text-start text-base font-bold">{{ generateI18nTitle(item.title) }}</div>
                <Breadcrumb v-if="item.breadcrumb.length" class="truncate">
                  <BreadcrumbItem v-for="(bc, bcIndex) in item.breadcrumb" :key="bcIndex" class="text-xs">
                    {{ generateI18nTitle(bc.title) }}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </a>
          </div>
        </template>
        <template v-else-if="searchInput === ''">
          <div class="h-full flex-col-center py-6 text-secondary-foreground/50">
            <KpuIcon name="i-tabler:mood-smile" :size="40" />
            <p class="m-2 text-base">
              {{ $t('app.search.welcome') }}
            </p>
          </div>
        </template>
        <template v-else>
          <div class="h-full flex-col-center py-6 text-secondary-foreground/50">
            <KpuIcon name="i-tabler:mood-empty" :size="40" />
            <p class="m-2 text-base">
              {{ $t('app.search.empty') }}
            </p>
          </div>
        </template>
      </div>
    </KpuScrollArea>
  </KpuModal>
</template>
