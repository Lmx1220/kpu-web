<script setup lang="ts">
import Sortable from 'sortablejs'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Message from 'vue-m-message'
import useUserStore from '@/store/modules/user'
import storage from '@/util/storage'

defineOptions({
  name: 'StorageBox',
})

const props = withDefaults(
  defineProps<{
    data: object | any[]
    name: string
    title?: string
  }>(),
  {
    title: '储存箱',
  },
)

const emits = defineEmits<{
  takeOut: [
    value: object | any[],
  ]
}>()

const slots = useSlots()

const userStore = useUserStore()

const list = ref<{
  title: string
  content: string
}[]>([])
const dialog = ref({
  visible: false,
  name: '',
})

onMounted(() => {
  recoveryStorage()
})

function onAdd() {
  if (dialog.value.name) {
    list.value.push({
      title: dialog.value.name,
      content: JSON.stringify(props.data),
    })
    updateStorage()
    dialog.value.visible = false
    dialog.value.name = ''
  }
  else {
    Message.warning('名称不能为空', {
      zIndex: 2000,
    })
  }
}

function onGet(content: string) {
  emits('takeOut', JSON.parse(content))
}

function onRemove(index: number) {
  list.value.splice(index, 1)
  updateStorage()
}

function sortStorage(newIndex: number, oldIndex: number) {
  list.value.splice(newIndex, 0, list.value.splice(oldIndex, 1)[0])
  updateStorage()
}

function updateStorage() {
  const storageBoxData = storage.session.has('storageBoxData') ? JSON.parse(storage.session.get('storageBoxData') as string) : {}
  storageBoxData[userStore.account] = storageBoxData[userStore.account] || {}
  storageBoxData[userStore.account][props.name] = list.value
  storage.session.set('storageBoxData', JSON.stringify(storageBoxData))
}

function recoveryStorage() {
  if (storage.session.has('storageBoxData')) {
    list.value = JSON.parse(storage.session.get('storageBoxData') as string)[userStore.account][props.name] || []
  }
}

const containerRef = ref()

// eslint-disable-next-line unused-imports/no-unused-vars
let sortable: Sortable
watch(() => containerRef.value, (val) => {
  if (val) {
    sortable = new Sortable(containerRef.value, {
      animation: 200,
      ghostClass: 'draggable-ghost',
      draggable: '.draggable-item',
      onUpdate: (e) => {
        if (e.newIndex !== undefined && e.oldIndex !== undefined) {
          sortStorage(e.newIndex, e.oldIndex)
        }
      },
    })
  }
})
</script>

<template>
  <HDropdown placement="bottom">
    <slot v-if="slots.default" />
    <SvgIcon v-else name="i-ep:message-box" :size="16" />
    <HDialog v-model="dialog.visible" title="请输入一个方便记忆的名称">
      <HInput v-model="dialog.name" class="w-full!" />
      <template #footer>
        <HButton outline class="mr-2" @click="dialog.visible = false">
          取消
        </HButton>
        <HButton @click="onAdd">
          确定
        </HButton>
      </template>
    </HDialog>
    <template #dropdown>
      <div class="w-40">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="text-sm font-bold">
            {{ title }}
          </div>
          <SvgIcon name="i-ep:plus" class="cursor-pointer text-base" @click="dialog.visible = true" />
        </div>
        <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="max-h-200px">
          <div v-if="list.length > 0" ref="containerRef" class="flex flex-col gap-2 px-4 pb-4">
            <div v-for="(item, index) in list" :key="`${index}_${item.title}`" :title="item.title" class="draggable-item relative flex cursor-pointer items-center rounded px-2 py-2 ring-1 ring-stone-3 ring-inset hover-bg-stone-1 dark-ring-stone-7 dark-hover-bg-dark/50" @click="onGet(item.content)">
              <div class="name flex-1 truncate pe-4">
                {{ item.title }}
              </div>
              <div class="right-1 h-5 w-6 rounded-full text-stone-3 !absolute dark-text-stone-7 hover-text-stone-7 dark-hover-text-stone-3">
                <SvgIcon name="i-ep:delete" :size="14" @click.stop="onRemove(index)" />
              </div>
            </div>
          </div>
          <div v-else flex="center col" py-6 text-stone-5>
            <SvgIcon name="i-tabler:mood-empty" :size="40" />
            <p m-2 text-base>
              空空如也
            </p>
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </template>
  </HDropdown>
</template>

<style lang="scss" scoped>
.draggable-ghost {
  opacity: 0;
}

.name {
  mask-image: linear-gradient(to right, #000 calc(100% - 80px), transparent);
}
</style>
