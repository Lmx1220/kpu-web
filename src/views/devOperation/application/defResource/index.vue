<script setup lang="ts">
import Move from './components/move.vue'
import DetailForm from './components/DetailForm/index.vue'
import LeftTree from './leftTree.vue'
import type { DefResourceResultVO } from '@/api/modules/devOperation/application/model/defResourceModel.ts'
import type { DataConfig } from '@/types/global'
import eventBus from '@/util/eventBus.ts'
import { useKeepAlive } from '@/hooks/useA.ts'
import { forEach } from '@/util/helper/treeHelper'
import { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'SystemResourceList',
})

// const { t } = useI18n()

const data: Ref<DataConfig<any, DefResourceResultVO>> = ref(
  {
    dataList: [],
    loading: false,
    tableAutoHeight: true,
    /**
     * 详情展示模式
     * router 路由跳转
     * dialog 对话框
     * drawer 抽屉
     */
    formMode: 'router',
    // 详情
    formModeProps: {
      visible: false,
      id: '',
    },
    // 搜索
    search: {
      parentId: '',
      classify: '',
      key: '',
      name: '',
      remark: '',
    },
    searchFold: true,
    // 批量操作
    batch: {
      enable: true,
      selectionDataList: [],
    },
  },
)

onMounted(() => {
  // getDataList()
  if (data.value.formMode === 'router') {
    eventBus.on('get-data-list', () => {
      // getDataList()
    })
  }
})

onBeforeUnmount(() => {
  if (data.value.formMode === 'router') {
    eventBus.off('get-data-list')
  }
})

if (data.value.formMode === 'router') {
  useKeepAlive(() => eventBus.off('get-data-list'))
}
const leftTreeRef = ref<InstanceType<typeof LeftTree>>()
function getDataList() {
  data.value.loading = true
  leftTreeRef.value?.getTreeList().then((res) => {
    forEach(res as any, (item) => {
      if (!item.children) {
        item.children = []
      }
    })
    data.value.dataList = res as any
    data.value.loading = false
  }).catch(() => {
    data.value.loading = false
  })
}

function onView(parent: any, row: Recordable) {
  data.value.formModeProps.id = row?.id
  data.value.formModeProps.visible = true
  data.value.formModeProps.type = ActionEnum.VIEW
  row.resourceApiList = row.resourceApiList || []
  data.value.formModeProps.data = row
  data.value.formModeProps.parent = parent
}
function onAdd(parent: any, row: Recordable) {
  data.value.formModeProps.id = undefined
  data.value.formModeProps.visible = true
  data.value.formModeProps.type = ActionEnum.ADD
  row.resourceApiList = row.resourceApiList || []
  data.value.formModeProps.data = row
  data.value.formModeProps.parent = parent
}

function onEdit(parent: any, row: Recordable) {
  data.value.formModeProps.id = row?.id
  data.value.formModeProps.visible = true
  data.value.formModeProps.type = ActionEnum.EDIT
  row.resourceApiList = row.resourceApiList || []
  data.value.formModeProps.data = row
  data.value.formModeProps.parent = parent
}

// function onDel(row: Recordable) {
//   if (row.id) {
//     crudResource.remove([row.id]).then(() => {
//       getDataList()
//       ElMessage.success({
//         message: t('common.tips.deleteSuccess'),
//         center: true,
//       })
//     })
//   }
// }

// function onMoveUp(row: Recordable) {
//   moveUp(row.id).then(() => {
//     getDataList()
//     ElMessage.success({
//       message: t('sys.api.operationSuccess'),
//       center: true,
//     })
//   })
// }

// function onMoveDown(row: Recordable) {
//   moveDown(row.id).then(() => {
//     getDataList()
//     ElMessage.success({
//       message: t('sys.api.operationSuccess'),
//       center: true,
//     })
//   })
// }

const moveDialog = ref<{ id?: string, visible: boolean, data: object }>({
  id: undefined,
  visible: false,
  data: {},
})

// function onMove(row: Recordable) {
//   moveDialog.value.id = row.id
//   moveDialog.value.visible = true
//   moveDialog.value.data = row
// }
const form = ref<InstanceType<typeof DetailForm>>()
const title = computed(() => {
  const name = data.value.formModeProps.data?.title
  switch (data.value.formModeProps.type) {
    case 'add':
      return `新增【${data.value.formModeProps.data?.applicationName}】中【${data.value.formModeProps.parent?.title}】的子资源`
    case 'edit':
      return `编辑【${data.value.formModeProps.data?.applicationName}】中的【${name}】`
    case 'view':
      return `查看【${data.value.formModeProps.data?.applicationName}】中的【${name}】`
    default:
      return `查看【${data.value.formModeProps.data?.applicationName}】中的【${name}】`
  }
})
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader title="字典管理" />
    <div class="page-main">
      <LayoutContainer left-side-width="25%">
        <template #leftSide>
          <LeftTree ref="leftTreeRef" @select="onView" @add="onAdd" @edit="onEdit" />
        </template>
        <template #default>
          <div v-show="data.formModeProps.type" class="form">
            <PageHeader :title="title" class="top-side">
              <template v-if="data.formModeProps.type !== ActionEnum.VIEW" #default>
                <ElButton type="primary" @click="form?.reset()">
                  重置
                </ElButton>
                <ElButton type="primary" @click="form?.submit(() => { getDataList() })">
                  保存
                </ElButton>
              </template>
            </PageHeader>
            <DetailForm
              :id="data.formModeProps.data?.id " ref="form" v-model:type="data.formModeProps.type"
              :current-data="data.formModeProps.data"
              :parent="data.formModeProps.parent"
              class="content-side"
            />
            <div v-if="data.formModeProps.type !== ActionEnum.VIEW" class="bottom-side">
              <ElButton type="primary" @click="form?.reset()">
                重置
              </ElButton>
              <ElButton type="primary" @click="form?.submit(() => { getDataList() })">
                保存
              </ElButton>
            </div>
          </div>
          <div v-show="!data.formModeProps.type" class="empty">
            请在左侧点击一个资源
          </div>
        </template>
      </LayoutContainer>
    </div>

    <Move :id="moveDialog.id" v-model="moveDialog.visible" :data="moveDialog.data" @success="getDataList" />
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: auto;

    .flex-container {
      position: static;
    }
  }

  .page-header {
    margin-bottom: 0;
  }
}

.flex-container {
  :deep(.main .main-container) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .empty {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: var(--el-text-color-placeholder);
  }
}

.form {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  overflow: auto;

  .top-side {
    padding-bottom: 0;
  }

  .content-side {
    display: flex;
    flex: 1;
    height: 0;
  }

  .bottom-side {
    display: flex;
    justify-content: center;
    padding: var(--container-padding);
    background-color: var(--g-container-bg);
    border-top: 1px dashed var(--el-disabled-border-color);
    transition: background-color 0.3s;
  }
}
</style>
