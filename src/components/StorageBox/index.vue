<script setup lang="ts">
import Message from 'vue-m-message'
import Sortable from 'sortablejs'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import storage from '@/util/storage.ts'
import useUserStore from '@/store/modules/user.ts'

defineOptions({
  name: 'StorageBox',
})
const props = withDefaults(
  defineProps<{
    data: any
    name: any
    title?: any
  }>(), {
    title: '储存箱',
  },
)
const emits = defineEmits < {
  takeOut: [any]
}>()
const userStore = useUserStore()
const dialog = ref({
  visible: false,
  name: '',
})
const data = ref <{ title: string, content: any }[]>([])
onMounted(() => {
  loadData()
})
function submit() {
  if (dialog.value.name) {
    data.value.push({
      title: dialog.value.name,
      content: JSON.stringify(props.data),
    })
    save()
    dialog.value.visible = false
    dialog.value.name = ''
  }
  else {
    Message.warning('名称不能为空', {
      zIndex: 2000,
    })
  }
}
function takeOut(content: any) {
  emits('takeOut', JSON.parse(content))
}
function remove(index: number) {
  data.value.splice(index, 1)
  save()
}
function move(newIndex: number, oldIndex: number) {
  data.value.splice(newIndex, 0, data.value.splice(oldIndex, 1)[0])
  save()
}
function save() {
  const storedData = storage.session.has('storageBoxData') ? JSON.parse(storage.session.get('storageBoxData') ?? '') : {}
  storedData[userStore.account] = storedData[userStore.account] || {}
  storedData[userStore.account][props.name] = data.value
  storage.session.set('storageBoxData', JSON.stringify(storedData))
}
function loadData() {
  if (storage.session.has('storageBoxData')) {
    data.value = JSON.parse(storage.session.get('storageBoxData') ?? '')[userStore.account][props.name] || []
  }
}
const containerRef = ref()
watch(() => containerRef.value, (value) => {
  value && new Sortable(containerRef.value, {
    animation: 200,
    ghostClass: 'draggable-ghost',
    draggable: '.draggable-item',
    onUpdate: (event: Sortable.SortableEvent) => {
      if (event.newIndex !== undefined && event.oldIndex !== undefined) {
        move(event.newIndex, event.oldIndex)
      }
    },
  })
},
)
</script>

<template>
  <HDropdown placement="buttonm">
    <template #dropdown>
      <div class="w-40">
        <div
          class="flex items-center justify-between px-4 py-3"
        >
          <div class="text-sm font-bold">
            我的快捷筛选
          </div>
          <SvgIcon name="i-ep:plus" class="cursor-pointer text-base" @click="dialog.visible = true" />
        </div>
        <OverlayScrollbarsComponent
          :options=" {
            scrollbars: {
              autoHide: 'leave',
              autoHideDelay: 300,
            },
          }"
          class="max-h-220px" defer
        >
          <div v-if="data.length > 0" ref="containerRef" class="flex flex-wrap items-center justify-between gap-2 px-4 pb-4">
            <div
              v-for="(item, index) in data" :key="`${index}_${item.title}`"
              class="draggable-item relative flex cursor-pointer items-center rounded px-2 py-2 ring-1 ring-stone-3 ring-inset hover-bg-stone-1 dark-ring-stone-7 dark-hover-bg-dark/50"
              :title="item.title"
              @click="takeOut(item.content)"
            >
              <div class="name flex-1 truncate pe-4">
                {{ item.title }}
              </div>
              <div class="right-1 h-5 w-6 rounded-full text-stone-3 !absolute dark-text-stone-7 hover-text-stone-7 dark-hover-text-stone-3" />
              <SvgIcon
                :size="14" name="ep:delete" @click.stop="remove(index)"
              />
            </div>
          </div>
          <div v-else flex="center col" py-6 text-stone-5>
            <SvgIcon :size="40" name="i-tabler:mood-empty" />
            <p m-2 text-base>
              空空如也
            </p>
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </template>
    <template #default>
      <slot>
        <SvgIcon name="ep:message-box" :size="16" />
      </slot>
      <HDialog v-model="dialog.visible" title="请输入一个方便记忆的名称">
        <template #footer>
          <HButton @click="dialog.visible = false">
            取消
          </HButton>
          <HButton @click="submit">
            确定
          </HButton>
        </template>
        <template #default>
          <HInput v-model="dialog.name" class="w-full!" />
        </template>
      </HDialog>
    </template>
  </HDropdown>
</template>

<style scoped lang="scss">

</style>
