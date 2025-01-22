<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import storage from '@/utils/storage'
import Sortable from 'sortablejs'
import { toast } from 'vue-sonner'

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

const slots = defineSlots<{
  default?: () => VNode
}>()

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
    toast.warning('名称不能为空', {
      position: 'top-center',
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

// let sortable: Sortable
watch(() => containerRef.value, (val) => {
  if (val) {
    // eslint-disable-next-line no-new
    new Sortable(containerRef.value, {
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
  <KPopover class="p-0">
    <slot v-if="slots.default" />
    <KIcon v-else name="i-ep:message-box" :size="16" />

    <template #panel>
      <div class="w-80">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="text-sm font-bold">
            {{ title }}
          </div>
          <KIcon name="i-ep:plus" class="cursor-pointer text-base" @click="dialog.visible = true" />
        </div>
        <KScrollArea :scrollbar="false" mask class="max-h-200px">
          <div v-if="list.length > 0" ref="containerRef" class="flex flex-col gap-2 px-4 pb-4">
            <div v-for="(item, index) in list" :key="`${index}_${item.title}`" :title="item.title" class="group draggable-item relative w-[calc(50%-0.25rem)] flex cursor-pointer items-center gap-1 rounded-lg px-2 py-2 ring-1 ring-border ring-inset hover-bg-accent" @click="onGet(item.content)">
              <div class="flex-1 truncate pe-4 text-sm group-hover:[mask-image:linear-gradient(90deg,#000_calc(100%-80px),transparent)]">
                {{ item.title }}
              </div>
              <div class="absolute right-2 h-5 w-5 rounded-full text-secondary-foreground hidden group-hover:flex-center hover:bg-secondary hover:ring-1">
                <KIcon name="i-ep:delete" :size="14" @click.stop="onRemove(index)" />
              </div>
            </div>
          </div>
          <div v-else class="flex-col-center py-6 text-secondary-foreground">
            <KIcon name="i-tabler:mood-empty" :size="40" />
            <p m-2 text-base>
              空空如也
            </p>
          </div>
        </KScrollArea>
      </div>
    </template>
  </KPopover>
  <KModal v-model="dialog.visible" title="请输入一个方便记忆的名称" content-class="min-h-auto" cancel-button-text="取消" confirm-button-text="确定" @confirm="onAdd" @cancel="dialog.visible = false">
    <KInput v-model="dialog.name" class="w-full!" />
  </KModal>
</template>
