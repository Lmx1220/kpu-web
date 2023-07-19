<script lang="ts" setup>
import { icons } from '@/iconify'

const props = withDefaults(
  defineProps<{
    modelValue: string
    size: string
  }>(),
  {
    modelValue: '',
    size: 'default',
  },
)

const emits = defineEmits<{
  'update:modelValue': [
    value: string,
  ]
}>()

defineOptions({
  name: 'IconPicker',
})

const myValue = ref('')
watch(() => props.modelValue, (value) => {
  myValue.value = value
}, {
  immediate: true,
})

const dialogVisible = ref(false)
const activeName = ref(myValue.value.split(':')[0] || icons[0].prefix)
const search = ref('')
const pagination = ref({
  page: 1,
  pageSize: 29,
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

function handleTabChange() {
  pagination.value.page = 1
}

const previewIcon = ref('')
const previewIconIndex = ref(0)
const previewIconPosition = computed(() => {
  return [
    previewIconIndex.value < 18 ? 'top' : 'bottom',
    previewIconIndex.value % 6 >= 3 ? 'left' : 'right',
  ].join('-')
})
function showPreviewIcon(iconName: string, index: number) {
  previewIcon.value = iconName
  previewIconIndex.value = index
}
function hidePreviewIcon() {
  previewIcon.value = ''
  previewIconIndex.value = 0
}

function chooseIcon(val: string) {
  myValue.value = val
  emits('update:modelValue', val)
  dialogVisible.value = false
}
function removeIcon() {
  myValue.value = ''
  emits('update:modelValue', '')
  dialogVisible.value = false
}
</script>

<template>
  <svg-icon
    :class="{ empty: myValue === '', [`icon-picker--${size}`]: true }" :name="myValue !== '' ? myValue : 'i-ep:plus'"
    class="icon-picker" @click="dialogVisible = true"
  />
  <el-dialog v-model="dialogVisible" width="600px" :show-close="true" append-to-body>
    <div class="icon-picker-dialog-body">
      <el-tabs v-model="activeName" tab-position="left" class="demo-tabs" @tab-change="handleTabChange">
        <el-tab-pane v-for="item in icons" :key="item.prefix" :name="item.prefix">
          <template #label>
            <div class="icon-label">
              <div class="name">
                {{ item.info.name }}
              </div>
              <div class="total">
                {{ item.info.total }} 个
              </div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="main-container">
        <div class="search-bar">
          <el-input v-model="search" size="large" placeholder="搜索..." clearable>
            <template #prefix>
              <svg-icon name="i-ep:search" />
            </template>
          </el-input>
        </div>
        <div class="list-icon">
          <svg-icon class="list-icon-item empty" name="i-ep:delete" @click="removeIcon" />
          <svg-icon
            v-for="(icon, index) in currentIconList" :key="index" :name="`${activeName}:${icon}`"
            class="list-icon-item" @click="chooseIcon(`${activeName}:${icon}`)"
            @mouseout="hidePreviewIcon" @mouseover="showPreviewIcon(`${activeName}:${icon}`, index + 1)"
          />
          <svg-icon :class="previewIcon && previewIconPosition" :name="previewIcon" class="list-icon-preview-item" />
        </div>
        <el-pagination v-model:current-page="pagination.page" layout="prev, pager, next" :page-size="pagination.pageSize" :total="iconList.length" :pager-count="5" background />
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.icon-picker {
    width: 40px;
    height: 40px;
    line-height: 36px;
    text-align: center;
    color: var(--el-text-color-regular);
    border: 1px solid var(--el-border-color);
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 24px;
    vertical-align: middle;

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
    margin: calc((var(--el-dialog-padding-primary) + 10px + 30px) * -1) calc(var(--el-dialog-padding-primary) * -1) calc((var(--el-dialog-padding-primary) + 10px) * -1) calc(var(--el-dialog-padding-primary) * -1);

    .el-tabs {
        :deep(.el-tabs__nav-prev),
        :deep(.el-tabs__nav-next) {
            background-image: linear-gradient(to right, transparent, var(--el-fill-color));
        }

        :deep(.el-tabs__header .el-tabs__nav) {
            .el-tabs__active-bar {
                z-index: 0;
                width: 100%;
                background-color: unset;
                background-image: linear-gradient(to right, transparent, var(--el-fill-color));
                border-right: 2px solid var(--el-color-primary);
                transition: 0.3s;
            }

            .el-tabs__item {
                position: relative;
                margin-bottom: -2px;
                height: auto;
                transition: 0.3s;

                &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 2px;
                    background-image: linear-gradient(to right, transparent, var(--el-fill-color));
                }

                .icon-label {
                    display: flex;
                    flex-direction: column;
                    width: 120px;
                    text-align: left;
                    line-height: 20px;
                    padding: 15px 0;

                    .name {
                        font-size: 16px;
                        margin-bottom: 2px;
                        white-space: normal;
                        word-break: initial;
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
        margin-right: 11px;

        .search-bar {
            margin: 0 75px;

            .el-input {
                margin-top: 20px;
            }
        }

        .list-icon {
            position: relative;
            margin: 15px 0;
            min-height: 160px;

            .list-icon-item {
                margin: 5px;
                box-sizing: content-box;
                padding: 15px;
                font-size: 28px;
                cursor: pointer;
                border: 1px solid var(--el-border-color);
                transition: var(--el-transition-border);

                &:nth-child(6n + 6) {
                    margin-right: 0;
                }

                &:not(.empty):hover {
                    border-color: var(--el-border-color-darker);
                    background-color: var(--el-fill-color);
                    color: var(--el-color-primary);
                    transition: background-color 0.3s, var(--el-transition-border), var(--el-transition-color);
                }

                &.empty {
                    border-color: transparent;
                    color: var(--el-text-color-placeholder);
                    transition: var(--el-transition-color);

                    &:hover {
                        color: var(--el-text-color-disabled);
                    }
                }
            }

            .list-icon-preview-item {
                display: none;
                position: absolute;
                box-sizing: content-box;
                padding: 10px;
                border: 1px solid var(--el-border-color-darker);
                font-size: 108px;
                background: var(--el-fill-color);
                color: var(--el-color-primary);

                &.top-left {
                    display: block;
                    top: 5px;
                    left: 5px;
                }

                &.top-right {
                    display: block;
                    top: 5px;
                    right: 5px;
                }

                &.bottom-left {
                    display: block;
                    bottom: 5px;
                    left: 5px;
                }

                &.bottom-right {
                    display: block;
                    bottom: 5px;
                    right: 5px;
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
