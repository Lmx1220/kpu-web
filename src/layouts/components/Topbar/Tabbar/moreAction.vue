<script setup lang="ts">
import type { Tabbar } from '#/global'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import eventBus from '@/utils/eventBus'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Sortable from 'sortablejs'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'TabbarMoreAction',
})

const router = useRouter()

const settingsStore = useSettingsStore()
const tabbarStore = useTabbarStore()

const tabbar = useTabbar()

const { t } = useI18n()

const { generateI18nTitle } = useMenu()

const activedTabId = computed(() => tabbar.getId())

const dropdownTabContainerRef = ref()

const isDragging = ref(false)
// eslint-disable-next-line unused-imports/no-unused-vars
let dropdownTabSortable: Sortable
watch(() => dropdownTabContainerRef.value, (val) => {
  if (val) {
    dropdownTabSortable = new Sortable(dropdownTabContainerRef.value.$el, {
      animation: 200,
      ghostClass: 'ghost',
      draggable: '.tab',
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
    <HDropdown placement="bottom-end" popper-class="tabbar-dropdown">
      <div class="h-6 w-6 flex-center cursor-pointer rounded-1 bg-[var(--g-container-bg)] text-lg shadow transition-background-color transition-shadow">
        <SvgIcon name="i-ri:arrow-down-s-fill" />
      </div>
      <template #dropdown>
        <div class="quick-button">
          <button v-if="settingsStore.settings.toolbar.navSearch" class="button" @click="actionCommand('search-tabs')">
            <HTooltip :text="t('app.tabbar.searchTabs')">
              <SvgIcon name="i-ri:search-line" />
            </HTooltip>
          </button>
          <button class="button" :disabled="!tabbar.checkCloseOtherSide()" @click="actionCommand('other-side')">
            <HTooltip :text="t('app.tabbar.closeOtherSide')">
              <SvgIcon name="i-ri:close-fill" />
            </HTooltip>
          </button>
          <button class="button" :disabled="!tabbar.checkCloseLeftSide()" @click="actionCommand('left-side')">
            <HTooltip :text="t('app.tabbar.closeLeftSide')">
              <SvgIcon name="i-ph:arrow-line-left" />
            </HTooltip>
          </button>
          <button class="button" :disabled="!tabbar.checkCloseRightSide()" @click="actionCommand('right-side')">
            <HTooltip :text="t('app.tabbar.closeRightSide')">
              <SvgIcon name="i-ph:arrow-line-right" />
            </HTooltip>
          </button>
        </div>
        <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="max-h-[300px]">
          <TransitionGroup ref="dropdownTabContainerRef" :name="!isDragging ? 'dropdown-tab' : undefined" tag="div" class="tabs" :class="{ dragging: isDragging }">
            <div
              v-for="element in tabbarStore.list" :key="element.tabId" class="tab" :class="{
                'actived': element.tabId === activedTabId,
                'no-drag': element.isPermanent || element.isPin,
              }"
            >
              <div :key="element.tabId" class="title" :title="element.customTitleList.find(item => item.fullPath === element.fullPath)?.title || generateI18nTitle(element.title)" @click="router.push(element.fullPath)">
                <SvgIcon v-if="settingsStore.settings.tabbar.enableIcon && iconName(element.tabId === activedTabId, element.icon, element.activeIcon)" :name="iconName(element.tabId === activedTabId, element.icon, element.activeIcon)!" />
                {{ element.customTitleList.find(item => item.fullPath === element.fullPath)?.title || generateI18nTitle(element.title) }}
              </div>
              <SvgIcon v-if="!element.isPermanent && element.isPin" name="i-ri:pushpin-2-fill" class="action-icon" @click.stop="tabbarStore.unPin(element.tabId)" />
              <SvgIcon v-else-if="!element.isPermanent && tabbarStore.list.length > 1" name="ri:close-fill" class="action-icon" @click.stop="tabbar.closeById(element.tabId)" />
            </div>
          </TransitionGroup>
        </OverlayScrollbarsComponent>
      </template>
    </HDropdown>
  </div>
</template>

<style>
.tabbar-dropdown {
  .quick-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px 10px;

    .button {
      --uno: transition-colors;

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

      &:hover:not(:disabled) {
        --uno: text-ui-primary;
      }

      &:disabled {
        cursor: not-allowed;
      }

      i {
        font-size: 16px !important;
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
        --uno: transition;

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
          --uno: ring-1 ring-stone-3 dark-ring-stone-7;

          background-color: var(--g-bg);
        }
      }
    }
  }
}
</style>

<style scoped>
.tabbar-dropdown {
  .dropdown-tab-enter-from,
  .dropdown-tab-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }

  .dropdown-tab-enter-active {
    transition: all 0.3s;
  }

  .dropdown-tab-leave-active {
    position: absolute !important;
    transition: all 0.3s;
  }

  .dropdown-tab-move {
    transition: transform 0.3s;
  }
}
</style>
