<script setup lang="ts">
import type { Tabbar } from '#/global'
import { $t } from '@/locales'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import eventBus from '@/utils/eventBus'
import Sortable from 'sortablejs'

defineOptions({
  name: 'TabbarMoreAction',
})

const router = useRouter()

const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()

const tabbar = useTabbar()

const { generateI18nTitle } = useMenu()

const activedTabId = computed(() => tabbar.getId())

const dropdownTabContainerRef = ref()

// const searchInputRef = useTemplateRef('searchInputRef')

const isDragging = ref(false)
const isNavSearch = ref(false)
// let dropdownTabSortable: Sortable
watch(() => dropdownTabContainerRef.value, (val) => {
  if (val) {
    // eslint-disable-next-line no-new
    new Sortable(dropdownTabContainerRef.value.$el, {
      animation: 200,
      ghostClass: 'ghost',
      draggable: '.tab',
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

function actionCommand(command: 'search-tabs' | 'other-side' | 'left-side' | 'right-side') {
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
</script>

<template>
  <div>
    <KpuPopover align="end" class="min-w-auto p-0">
      <KpuButton variant="outline" size="icon" class="h-7 w-7">
        <KpuIcon name="i-ep:caret-bottom" />
      </KpuButton>
      <template #panel>
        <div class="max-h-[320px] w-[200px] flex flex-col">
          <div class="flex-center-between gap-2 p-4">
            <template v-if="isNavSearch">
              <KpuInput
                :placeholder="$t('searchPlaceholder')"
                class="h-8 w-0 flex-1 border border-input rounded-md bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <KpuButton variant="outline" size="icon" class="h-8 w-8" @click="isNavSearch = false">
                <KpuIcon name="i-ri:close-fill" :size="16" />
              </KpuButton>
            </template>
            <template v-else>
              <KpuTooltip :text="$t('app.tabbar.searchTabs')">
                <KpuButton
                  v-if="settingsStore.settings.toolbar.navSearch" variant="secondary" size="icon" class="h-8 w-8"
                  @click="isNavSearch = true"
                >
                  <KpuIcon name="i-ri:search-line" />
                </KpuButton>
              </KpuTooltip>
              <KpuTooltip :text="$t('app.tabbar.closeOtherSide')">
                <KpuButton
                  variant="secondary" size="icon" class="h-8 w-8" :disabled="!tabbar.checkCloseOtherSide()"
                  @click="actionCommand('other-side')"
                >
                  <KpuIcon name="i-ri:close-fill" />
                </KpuButton>
              </KpuTooltip>
              <KpuTooltip :text="$t('app.tabbar.closeLeftSide')">
                <KpuButton
                  variant="secondary" size="icon" class="h-8 w-8" :disabled="!tabbar.checkCloseLeftSide()"
                  @click="actionCommand('left-side')"
                >
                  <KpuIcon name="i-ph:arrow-line-left" />
                </KpuButton>
              </KpuTooltip>
              <KpuTooltip :text="$t('app.tabbar.closeRightSide')">
                <KpuButton
                  variant="secondary" size="icon" class="h-8 w-8" :disabled="!tabbar.checkCloseRightSide()"
                  @click="actionCommand('right-side')"
                >
                  <KpuIcon name="i-ph:arrow-line-right" />
                </KpuButton>
              </KpuTooltip>
            </template>
          </div>
          <KpuScrollArea :scrollbar="false" mask gradient-color="hsl(var(--popover))" class="mb-4 flex-1 -mt-2">
            <TransitionGroup
              ref="dropdownTabContainerRef" tag="div" class="tabs space-y-1"
              :class="{ dragging: isDragging }"
            >
              <div
                v-for="element in tabbarStore.list" :key="element.tabId" class="relative mx-4 h-8 rounded-md px-2 tab"
                :class="{
                  'bg-accent': element.tabId === activedTabId,
                  'pinned': element.isPermanent || element.isPin,
                }"
              >
                <div
                  :key="element.tabId" class="title"
                  :title="element.customTitleList.find(item => item.fullPath === element.fullPath)?.title || generateI18nTitle(element.title)"
                  @click="router.push(element.fullPath)"
                >
                  <KpuIcon
                    v-if="settingsStore.settings.tabbar.enableIcon && iconName(element.tabId === activedTabId, element.icon, element.activeIcon)"
                    :name="iconName(element.tabId === activedTabId, element.icon, element.activeIcon)!"
                  />
                  {{
                    element.customTitleList.find(item => item.fullPath === element.fullPath)?.title || generateI18nTitle(element.title)
                  }}
                </div>
                <KpuIcon
                  v-if="!element.isPermanent && element.isPin" name="i-ri:pushpin-2-fill" class="action-icon"
                  @click.stop="tabbarStore.unPin(element.tabId)"
                />
                <KpuIcon
                  v-else-if="!element.isPermanent && tabbarStore.list.length > 1" name="ri:close-fill"
                  class="action-icon" @click.stop="tabbar.closeById(element.tabId)"
                />
              </div>
            </TransitionGroup>
          </KpuScrollArea>
        </div>
      </template>
    </KpuPopover>
  </div>
</template>

<style scoped>
.tabs {
  &:not(.dragging) {
    .tab:hover {
      &:not(.actived) {
        --uno: bg-accent;
      }

      .action-icon {
        opacity: 1;
      }
    }
  }

  .tab {
    transition: background-color 0.3s;

    &:hover {
      .title {
        --uno: opacity-100;

        margin-inline-end: 20px;
        mask-image: linear-gradient(to right, #000 calc(100% - 44px), transparent);

        [dir="rtl"] & {
          mask-image: linear-gradient(to left, #000 calc(100% - 44px), transparent);
        }
      }
    }

    * {
      user-select: none;
    }

    .title {
      --uno: opacity-70 transition;

      position: relative;
      display: flex;
      gap: 5px;
      align-items: center;
      height: 100%;
      overflow: hidden;
      font-size: 14px;
      white-space: nowrap;
      cursor: pointer;
      mask-image: linear-gradient(to right, #000 calc(100% - 24px), transparent);

      [dir="rtl"] & {
        mask-image: linear-gradient(to left, #000 calc(100% - 24px), transparent);
      }

      i {
        flex-shrink: 0;
        font-size: 16px;
      }
    }

    .action-icon {
      --uno: transition -translate-y-1\/2;

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
      border-radius: 9999px;
      opacity: 0;

      &:hover {
        --uno: b bg-secondary;
      }
    }
  }
}
</style>
