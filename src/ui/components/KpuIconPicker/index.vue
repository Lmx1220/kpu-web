<script setup lang="ts">
import svgs from '@/assets/svg'
import { icons as iconss } from '@/iconify'

defineOptions({
  name: 'KpuIconPicker',
})
withDefaults(defineProps<{
  size?: 'large' | 'default' | 'small'
}>(), {
  size: 'default',
})
const icons = [...iconss]
// 插入第3个位置
icons.splice(2, 0, {
  prefix: 'svg',
  info: {
    name: 'svg',
    total: svgs.length,
    author: { name: '', url: '' },
    license: { title: '', spdx: '', url: '' },
    samples: [],
    height: 0,
    displayHeight: 0,
    category: '',
    palette: false,
  },
  icons: svgs,
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
  // iconsFilter.push()
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
  <KpuPopover :collision-padding="5" class="p-0">
    <slot :icon="value">
      <KpuButton
        variant="outline"
        class="&_svg]:size-inherit"
        size="icon"
        :class="{
          'empty': value === '',
          [`icon-picker--${size}`]: true,
          'is-disabled': attrs.disabled === true,
        }" @click="dialogVisible = true"
      >
        <KpuIcon
          :name="value !== '' && value != null ? value : 'i-whh:googleplusold'" :size="16"
          :class="{ 'opacity-20': value === '' }"
        />
      </KpuButton>
    </slot>
    <!-- TODO 重构弹窗，不使用 element-plus 组件 -->
    <template #panel>
      <div class="h-500px w-600px flex-center of-hidden rounded-md">
        <KpuScrollArea :scrollbar="false" mask class="h-full w-150px shrink-0 border-r">
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
        </KpuScrollArea>
        <div class="h-full flex-col-center flex-1 p-6">
          <div class="search-bar">
            <KpuInput v-model="search" placeholder="搜索..." />
          </div>
          <div class="grid grid-cols-7 grid-rows-7 my-2 w-full flex-1 place-items-center gap-1">
            <KpuButton class="h-12 w-12" size="icon" variant="outline" @click="removeIcon">
              <KpuIcon name="i-ep:delete" :size="24" class="opacity-20" />
            </KpuButton>
            <KpuButton
              v-for="(icon, index) in currentIconList" :key="index" variant="ghost" size="icon" class="h-12 w-12 [&_svg]:size-inherit"
              @click="chooseIcon(activeName !== 'svg' ? `${activeName}:${icon}` : icon)"
            >
              <KpuIcon :name="activeName !== 'svg' ? `${activeName}:${icon}` : icon" :size="24" />
            </KpuButton>
            <!--            <div class="list-icon-preview-item" :class="previewIcon && previewIconPosition"> -->
            <!--              <KpuIcon :name="previewIcon" :size="108" /> -->
            <!--            </div> -->
          </div>
          <KpuPagination
            v-model:page="pagination.page" :size="pagination.pageSize"
            :total="iconList.length" @page-change="(page:number) => pagination.page = page"
          />
        </div>
      </div>
    </template>
  </KpuPopover>
</template>
