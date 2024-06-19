<script setup lang="ts">
import Sortable from 'sortablejs'
import { cloneDeep, uniqueId } from 'lodash-es'
import ResourceApiSelect from '@/views/system/resource/components/DetailForm/ResourceApiSelect.vue'
import { useDialog } from '@/components/Dialog/hooks/useDialog.ts'
import type { DefResourceApiVO } from '@/api/modules/system/model/defResourceModel.ts'
import { ActionEnum } from '@/enums/commonEnum.ts'
import ResourceApiEdit from '@/views/system/resource/components/DetailForm/ResourceApiEdit.vue'

const props = withDefaults(defineProps<{
  type: ActionEnum
}>(), {
  type: ActionEnum.ADD,
})

const emits = defineEmits<{
  change: [any[]]
}>()
const resourceApiList = defineModel<any[]>({
  default: () => [],
})

const { t } = useI18n()

const authsTableRef = ref()
const authsTableKey = ref(0)

const innerVal = ref<Recordable[]>([])

onMounted(() => {
  TableSortable()
})
function TableSortable() {
  const tbody = authsTableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
  Sortable.create(tbody, {
    handle: '.sortable',
    animation: 300,
    ghostClass: 'ghost',
    onEnd: ({
      newIndex,
      oldIndex,
    }) => {
      if (newIndex === undefined || oldIndex === undefined) {
        return
      }
      const row = resourceApiList.value.splice(oldIndex, 1)[0]
      resourceApiList.value.splice(newIndex, 0, row)
      resourceApiList.value.map((item, index) => ({
        ...item,
        sortValue: item.sortValue = index + 1,
      }))
      authsTableKey.value += 1
      nextTick(() => {
        TableSortable()
      })
    },
  })
}
function handleAddAuths() {
  resourceApiList.value.push({
    id: undefined,
    sortValue: resourceApiList.value.length + 1,
    name: '',
    code: '',
  })
}

watch(
  () => resourceApiList.value,
  (value: DefResourceApiVO[] = []) => {
    innerVal.value = cloneDeep(value)
    innerVal.value.forEach(v => (v.tempId = uniqueId()))
  },
  { deep: true },
)

const [registerModal, { openDialog }] = useDialog()
const [registerEditModal, { openDialog: openEditModal }] = useDialog()

function handleSuccess(selectedData: DefResourceApiVO[]) {
  innerVal.value = selectedData

  emits('change', selectedData)
  resourceApiList.value = selectedData
}

function handleAdd() {
  openEditModal(true, {
    record: { tempId: uniqueId() },
  })
}
function handleSelect() {
  openDialog(true, {
    selectedData: [...unref(innerVal)],
  })
}

function handleDelete(record: Recordable, e: Event) {
  e?.stopPropagation()

  const index = unref(innerVal).findIndex(
    selected =>
      selected.springApplicationName === record.springApplicationName
      && selected.uri === record.uri
      && selected.requestMethod === record.requestMethod,
  )

  if (index > -1) {
    innerVal.value.splice(index, 1)
    // const data = getDataSource();
    // data.splice(index, 1);
  }

  emits('change', innerVal.value)
  resourceApiList.value = innerVal.value
}
function handleEditSuccess(addData: DefResourceApiVO) {
  if (!addData.isInput) {
    return
  }
  // const index = unref(innerVal).findIndex(
  //   (selected) =>
  //     selected.springApplicationName === addData.springApplicationName &&
  //     selected.uri === addData.uri &&
  //     selected.requestMethod === addData.requestMethod,
  // );
  const index = unref(innerVal).findIndex(selected => selected.tempId === addData.tempId)

  console.log('index=', index)
  if (index > -1) {
    unref(innerVal).forEach((selected) => {
      if (selected.tempId === addData.tempId) {
        selected.isInput = addData.isInput
        selected.tempId = addData.tempId
        selected.springApplicationName = addData.springApplicationName
        selected.controller = addData.controller
        selected.uri = addData.uri
        selected.requestMethod = addData.requestMethod
        selected.name = addData.name
      }
    })
  }
  else {
    innerVal.value.push(addData)
    // const data = getDataSource();
    // console.log(data);
    // data.push(addData);
  }

  console.log(innerVal.value)
  emits('change', innerVal.value)
  resourceApiList.value = innerVal.value
}
</script>

<template>
  <div class="resource-api w-full border-1 border-stone-2 border-solid p-4">
    <PageHeader class="w-full" title="资源关联的接口">
      <template v-if="props.type !== ActionEnum.VIEW" #default>
        <ElButton size="default" round @click="handleAdd">
          新增
        </ElButton>
        <ElButton size="default" round @click="handleSelect">
          选择
        </ElButton>
      </template>
    </PageHeader>
    <ElTable ref="authsTableRef" :key="authsTableKey" :data="resourceApiList" stripe highlight-current-row border>
      <ElTableColumn align="center" fixed :label="t('system.resource.sortValue')" prop="sortValue" width="60">
        <template v-if="props.type !== ActionEnum.VIEW" #header>
          <ElButton type="primary" size="small" plain circle @click="() => handleAddAuths()">
            <SvgIcon name="i-ep:plus" />
          </ElButton>
        </template>
        <template #default="{ $index, row }">
          <span class="index">{{ $index + 1 }}</span>
          <ElButton v-if="props.type !== ActionEnum.VIEW" class="delete" type="danger" size="small" plain circle @click="(e:Event) => handleDelete(row, e)">
            <SvgIcon name="i-ep:delete" />
          </ElButton>
        </template>
      </ElTableColumn>
      <ElTableColumn align="center" fixed :label="t('system.resource.sortValue')" prop="sortValue" width="80">
        <ElTag type="info" class="sortable">
          <SvgIcon name="i-ep:d-caret" />
        </ElTag>
      </ElTableColumn>
      <ElTableColumn prop="name" :label="t('system.resourceApi.name')" />
      <ElTableColumn prop="uri" :label="t('system.resourceApi.uri')" />
    </ElTable>
    <ResourceApiSelect @register="registerModal" @success="handleSuccess" />
    <ResourceApiEdit @register="registerEditModal" @success="handleEditSuccess" />
  </div>
</template>

<style scoped lang="scss">
.el-table {
  height: 100%;
  margin-top: 15px;

  :deep(.el-table__row) {
    .index {
      display: inline-block;
    }

    .delete,
    &:hover .index {
      display: none;
    }

    &:hover {
      .delete {
        display: inline-block;
      }
    }

    .el-tag.sortable,
    .el-tag.sortable .el-icon {
      cursor: s-resize;
    }
  }
}
</style>
