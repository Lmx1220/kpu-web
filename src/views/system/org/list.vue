<script lang="ts" setup>
import type { DataConfig } from '@/types/global'
import eventBus from '@/util/eventBus'
import DetailForm from '@/views/system/org/components/DetailForm/index.vue'
import OrgBloksTree from '@/views/system/org/components/OrgBloksTree/index.vue'
import OrgManagement from '@/views/system/org/components/OrgManagement/index.vue'
import { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'SystemOrgList',
})
const router = useRouter()
// const route = useRoute()

const data = ref<DataConfig>({
  loading: false,
  treeType: '2',
  formMode: 'dialog',
  tableAutoHeight: true,
  // 详情
  formModeProps: {
    visible: false,
    id: '',

  },
  // 搜索
  search: {
    title: '',
  },
  searchFold: false,

  current: {},
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  dataList: [],
})

const form = ref<InstanceType<typeof DetailForm>>()
const treeRef = ref<InstanceType<typeof OrgBloksTree> | InstanceType<typeof OrgManagement>>()

onMounted(() => {
  if (data.value.formMode === 'router') {
    eventBus.on('get-data-list', () => {
      getDataList()
    })
  }
})

onBeforeUnmount(() => {
  if (data.value.formMode === 'router') {
    eventBus.off('get-data-list')
  }
})

async function getDataList() {
  treeRef.value?.getDataList()
}

function onAdd(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemOrgCreate',
      params: {
        type: ActionEnum.ADD,
      },
    })
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = ActionEnum.ADD
    if (data.value.current?.id) {
      data.value.formModeProps.data = {
        parentId: row.id,
        parentName: row.name,
        id: '',
        name: '',
      }
    }
    else {
      data.value.formModeProps.data = {
        id: '',
        name: '',
        parentId: '',
        parentName: '根节点',
      }
    }
  }
}

function onEdit(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemOrgEdit',
      params: {
        id: row.id,
        type: 'edit',
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = ActionEnum.EDIT
    data.value.formModeProps.data = row
  }
}

function onView(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemOrgDetail',
      params: {
        id: row.id,
        type: ActionEnum.VIEW,
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = ActionEnum.VIEW
    data.value.formModeProps.data = row
  }
}

function changeDisplay(type: string) {
  data.value.treeType = type
}

const title = computed(() => {
  switch (data.value.formModeProps.type) {
    case 'add':
      return '新增组织'
    case 'edit':
      return '编辑组织'
    case 'view':
      return '查看组织'
    default:
      return '查看角色'
  }
})
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader title="组织" />
    <div class="page-main">
      <LayoutContainer hide-left-side-toggle left-side-width="50%">
        <template #leftSide>
          <OrgBloksTree
            v-if="data.treeType === '2'" ref="treeRef" @change="changeDisplay" @create="onAdd" @edit="onEdit"
            @select="onView"
          />
          <OrgManagement
            v-if="data.treeType === '1'" ref="treeRef" @change="changeDisplay" @create="onAdd" @edit="onEdit"
            @select="onView"
          />
        </template>
        <template #default>
          <div v-show="data.formModeProps.type">
            <PageHeader :title="title" />
            <DetailForm
              :id="data.formModeProps.data?.id " ref="form" v-model:type="data.formModeProps.type"
              :current-data="data.formModeProps.data"
            />
            <div v-if="data.formModeProps.type !== ActionEnum.VIEW" class="flex justify-center">
              <ElButton type="primary" @click="form?.reset()">
                重置
              </ElButton>
              <ElButton type="primary" @click="form?.submit(() => { getDataList() })">
                保存
              </ElButton>
            </div>
          </div>
          <div v-show="!data.formModeProps.type" class="container">
            <div class="empty">
              请在左侧点击一个组织
            </div>
          </div>
        </template>
      </LayoutContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }

    .flex-container {
      position: static;
    }
  }
}

.flex-container {
  :deep(.left-side) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :deep(.main) {
    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;

    .empty {
      text-align: center;
      font-size: 32px;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>
