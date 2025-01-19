<script setup lang="ts">
import { icons } from '@/iconify'

defineOptions({
  name: 'KIconPicker',
})

withDefaults(defineProps<{
  size?: 'large' | 'default' | 'small'
}>(), {
  size: 'default',
})
const value = defineModel<string>({
  default: '',
})
const attrs = useAttrs()
const dialogVisible = ref(false)
const activeName = ref(icons.some(item => item.prefix === value.value.split(':')[0]) ? value.value.split(':')[0] : icons[0].prefix)
const search = ref('')
const pagination = ref({
  page: 1,
  pageSize: 48,
})

const iconList = computed(() => {
  let iconsFilter = icons.filter((item) => {
    return item.prefix === activeName.value
  })[0].icons
  if (search.value) {
    iconsFilter = iconsFilter.filter((item) => {
      return item.includes(search.value)
    })
  }
  return iconsFilter
})
const currentIconList = computed(() => {
  return iconList.value.slice(
    (pagination.value.page - 1) * pagination.value.pageSize,
    (pagination.value.page - 1) * pagination.value.pageSize + pagination.value.pageSize,
  )
})

// function handleTabChange() {
//   pagination.value.page = 1
// }

// const previewIcon = ref('')
// const previewIconIndex = ref(0)
// const previewIconPosition = computed(() => {
//   return [
//     previewIconIndex.value < 18 ? 'top' : 'bottom',
//     previewIconIndex.value % 6 >= 3 ? 'left' : 'right',
//   ].join('-')
// })

// function showPreviewIcon(iconName: string, index: number) {
//   previewIcon.value = iconName
//   previewIconIndex.value = index
// }

// function hidePreviewIcon() {
//   previewIcon.value = ''
//   previewIconIndex.value = 0
// }

function chooseIcon(val: string) {
  value.value = val
  dialogVisible.value = false
}

function removeIcon() {
  value.value = ''
  dialogVisible.value = false
}
function handleTabChange(prefix: string) {
  activeName.value = prefix
  pagination.value.page = 1
}
</script>

<template>
  <KPopover :collision-padding="5" class="p-0">
    <slot :icon="value">
      <KButton
        variant="outline"
        class="&_svg]:size-inherit"
        size="icon"
        :class="{
          'empty': value === '',
          [`icon-picker--${size}`]: true,
          'is-disabled': attrs.disabled === true,
        }" @click="dialogVisible = true"
      >
        <SvgIcon
          :name="value !== '' && value != null ? value : 'i-whh:googleplusold'" :size="16"
          :class="{ 'opacity-20': value === '' }"
        />
      </KButton>
    </slot>
    <!-- TODO 重构弹窗，不使用 element-plus 组件 -->
    <template #panel>
      <div class="h-500px w-600px flex-center of-hidden rounded-md">
        <KScrollArea :scrollbar="false" mask class="h-full w-150px shrink-0 border-r">
          <div
            v-for="item in icons" :key="item.prefix"
            class="cursor-pointer px-4 py-3 transition-background-color space-y-2 hover-bg-accent/50"
            :class="{ 'bg-accent hover-bg-accent!': item.prefix === activeName }"
            @click="handleTabChange(item.prefix)"
          >
            <div class="text-base text-accent-foreground leading-tight">
              {{ item.info.name }}
            </div>
            <div class="text-xs text-accent-foreground/50">
              {{ item.info.total }} 个
            </div>
          </div>
        </KScrollArea>
        <div class="h-full flex-col-center flex-1 p-6">
          <div class="search-bar">
            <KInput v-model="search" placeholder="搜索..." />
          </div>
          <div class="grid grid-cols-7 grid-rows-7 my-2 w-full flex-1 place-items-center gap-1">
            <KButton class="h-12 w-12" size="icon" variant="outline" @click="removeIcon">
              <SvgIcon name="i-ep:delete" :size="24" class="opacity-20" />
            </KButton>
            <KButton
              v-for="(icon, index) in currentIconList" :key="index" variant="ghost" size="icon" class="h-12 w-12 [&_svg]:size-inherit"
              @click="chooseIcon(`${activeName}:${icon}`)"
            >
              <SvgIcon :name="`${activeName}:${icon}`" :size="24" />
            </KButton>
            <!--            <div class="list-icon-preview-item" :class="previewIcon && previewIconPosition"> -->
            <!--              <SvgIcon :name="previewIcon" :size="108" /> -->
            <!--            </div> -->
          </div>
          <KPagination
            v-model:page="pagination.page" :size="pagination.pageSize"
            :total="iconList.length" @page-change="(page:number) => pagination.page = page"
          />
        </div>
      </div>
    </template>
  </KPopover>
</template>

<style scoped>
.icon-picker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-picker-size);
  height: var(--icon-picker-size);
  font-size: var(--icon-picker-font-size);
  color: var(--el-text-color-regular);
  vertical-align: middle;
  cursor: pointer;
  border: var(--el-border);
  border-radius: var(--el-border-radius-base);
  transition: 0.3s;

  --icon-picker-size: var(--el-component-size);
  --icon-picker-font-size: var(--el-font-size-large);

  &--small {
    --icon-picker-size: var(--el-component-size-small);
    --icon-picker-font-size: var(--el-font-size-medium);
  }

  &--large {
    --icon-picker-size: var(--el-component-size-large);
    --icon-picker-font-size: var(--el-font-size-extra-large);
  }

  &.is-disabled {
    color: var(--el-text-color-disabled);
    pointer-events: none;
    cursor: not-allowed;
    border-color: var(--el-border-color-light);
  }

  &:hover {
    border: 1px solid var(--el-border-color-darker);
  }

  &.empty {
    color: var(--el-text-color-placeholder);
    border: 1px dashed var(--el-border-color);

    &:hover {
      color: var(--el-text-color-regular);
      border: 1px solid var(--el-border-color-darker);
    }
  }
}

.icon-picker-dialog-body {
  display: flex;
  height: 500px;
  margin: calc((var(--el-dialog-padding-primary) + 16px) * -1) calc((var(--el-dialog-padding-primary)) * -1) calc((var(--el-dialog-padding-primary)) * -1);

  .el-tabs {
    :deep(.el-tabs__nav-prev),
    :deep(.el-tabs__nav-next) {
      background-image: linear-gradient(to right, transparent, var(--el-fill-color));

      [dir="rtl"] & {
        background-image: linear-gradient(to left, transparent, var(--el-fill-color));
      }
    }

    :deep(.el-tabs__header .el-tabs__nav) {
      .el-tabs__active-bar {
        z-index: 0;
        width: 100%;
        background-color: unset;
        background-image: linear-gradient(to right, transparent, var(--el-fill-color));
        border-inline-end: 2px solid var(--el-color-primary);
        transition: 0.3s;

        [dir="rtl"] & {
          background-image: linear-gradient(to left, transparent, var(--el-fill-color));
        }
      }

      .el-tabs__item {
        position: relative;
        height: auto;
        margin-bottom: -2px;
        transition: 0.3s;

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          content: "";
          background-image: linear-gradient(to right, transparent, var(--el-fill-color));

          [dir="rtl"] & {
            background-image: linear-gradient(to left, transparent, var(--el-fill-color));
          }
        }

        .icon-label {
          display: flex;
          flex-direction: column;
          width: 120px;
          padding: 15px 0;
          line-height: 20px;
          text-align: left;

          .name {
            margin-bottom: 2px;
            font-size: 16px;
            word-break: initial;
            white-space: normal;
          }

          .total {
            font-size: 12px;
          }
        }
      }
    }
  }

  .main-container {
    flex: 1;
    margin-inline-end: 10px;

    .search-bar {
      margin: 0 75px;

      .el-input {
        margin-top: 20px;
      }
    }

    .list-icon {
      position: relative;
      min-height: 160px;
      margin: 15px 0;

      .list-icon-item {
        box-sizing: content-box;
        display: inline-flex;
        padding: 15px;
        margin: 5px;
        cursor: pointer;
        border: 1px solid var(--el-border-color);
        transition: var(--el-transition-border);

        &:not(.empty):hover {
          color: var(--el-color-primary);
          background-color: var(--el-fill-color);
          border-color: var(--el-border-color-darker);
          transition: background-color 0.3s, var(--el-transition-border), var(--el-transition-color);
        }

        &.empty {
          color: var(--el-text-color-placeholder);
          border-color: transparent;
          transition: var(--el-transition-color);

          &:hover {
            color: var(--el-text-color-disabled);
          }
        }
      }

      .list-icon-preview-item {
        position: absolute;
        box-sizing: content-box;
        display: none;
        padding: 10px;
        color: var(--el-color-primary);
        background: var(--el-fill-color);
        border: 1px solid var(--el-border-color-darker);

        &.top-left {
          inset-inline-start: 5px;
          top: 5px;
          display: inline-flex;
        }

        &.top-right {
          inset-inline-end: 6px;
          top: 5px;
          display: inline-flex;
        }

        &.bottom-left {
          inset-inline-start: 5px;
          bottom: 5px;
          display: inline-flex;
        }

        &.bottom-right {
          inset-inline-end: 6px;
          bottom: 5px;
          display: inline-flex;
        }
      }
    }

    .el-pagination {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
