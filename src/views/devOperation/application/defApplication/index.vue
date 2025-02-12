<script setup lang="ts">
import type { KpuFormProps } from '@/adapter/form'
import type { VxeTableGridOptions } from '@/adapter/vxe-table'
import type { DefApplicationResultVO } from '@/api/devOperation/application/model/defApplicationModel.ts'
import { useKpuVxeGrid } from '@/adapter/vxe-table'
import api from '@/api/devOperation/application/defApplication'
import { ActionEnum } from '@/enums/commonEnum.ts'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
// import useSettingsStore from '@/store/modules/settings'
import { toast } from 'vue-sonner'
import { columns, formItems } from './defApplication.data.tsx'
import Detail from './detail.vue'
import Form from './form.vue'

const formOptions: KpuFormProps = { ...formItems, ...{
  // 默认展开
  collapsed: true,
} }
// const settingsStore = useSettingsStore()
const gridOptions: VxeTableGridOptions<DefApplicationResultVO> = { ...columns, ...{
  height: 'auto',
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: ({ page, sorts, filters }, formValues) => {
        const requestPayload: any = {
          model: { ...formValues },
          extra: { ...formValues.extra },
        }
        Reflect.deleteProperty(requestPayload.model, 'extra')

        const sortOption = sorts[0]
        if (sortOption) {
          requestPayload.sort = sortOption.field
          requestPayload.order = sortOption.order
        }

        requestPayload.size = page.pageSize
        requestPayload.current = page.currentPage

        filters.forEach(({ field, values }) => {
          requestPayload[field] = values.join(',')
        })

        return api.page(requestPayload).then((response) => {
          response.total = Number(response.total)
          return response
        })
      },
    },
  },
} }
const f = ref(false)
const gridEvents = {
  checkboxChange() {
    // eslint-disable-next-line ts/no-use-before-define
    const checkboxRecords = gridApi.grid.getCheckboxRecords()
    f.value = checkboxRecords.length > 0
  },
  checkboxAll() {
    // eslint-disable-next-line ts/no-use-before-define
    const checkboxRecords = gridApi.grid.getCheckboxRecords()
    f.value = checkboxRecords.length > 0
  },
  // zoom(type: any) {
  //   console.warn('zoom:', arguments, type)
  //   if (type.type === 'max' && !settingsStore.mainPageMaximizeStatus) {
  //     settingsStore.setMainPageMaximize()
  //   }
  //   else if (type.type === 'revert' && settingsStore.mainPageMaximizeStatus) {
  //     settingsStore.setMainPageMaximize()
  //   }
  //   throw new Error('zoom')
  //   return false
  // },
}
const [Grid, gridApi] = useKpuVxeGrid({
  gridEvents,
  formOptions,
  gridOptions,
})
const [FormModal, formApi] = useKpuModal({ connectedComponent: Form })
const [DetailModal, detailApi] = useKpuModal({ connectedComponent: Detail })
// const editFormRef = ref()
// const detailFormRef = ref()
// 弹出复制页面
function handleCopy(record: Recordable, e: Event) {
  e?.stopPropagation()
  console.warn('handleCopy', record)
  formApi.setData({
    type: ActionEnum.COPY,
    gridApi,
    record,
  })
  formApi.open()
}
function handleView(row: Recordable) {
  console.warn('handleView', row)
  detailApi.setData({
    record: row,
  })
  detailApi.open()
}
function handleEdit(row: Recordable) {
  console.warn('handleEdit', row)
  formApi.setData({
    type: ActionEnum.EDIT,
    gridApi,
    record: row,
  })

  formApi.open()
}
function handleDelete(row?: Recordable) {
  let ids = []
  if (row) {
    ids.push(row.id)
  }
  else {
    const records = gridApi.grid.getCheckboxRecords()
    ids = records.map(item => item.id)
  }
  api.remove(ids).then(() => {
    toast.success('删除成功')
    gridApi.reload()
  })
  console.warn('handleDelete', row)
}
// 弹出新增页面
function handleAdd() {
  console.warn('handleAdd')
  formApi.setData({
    type: ActionEnum.ADD,
    gridApi,
  })
  formApi.open()
}
</script>

<template>
  <div class="absolute-container">
    <Grid>
      <template #toolbar-buttons>
        <TableAction
          :actions=" [{
            label: '新增',
            type: 'primary',
            icon: 'i-ant-design:plus-outlined',
            onClick: handleAdd.bind(null),
          }]"
          :drop-down-actions="[{
            label: '删除',
            icon: 'i-ant-design:delete-outlined',
            ifShow: f,
            popConfirm: {
              title: '确定删除吗？',
              confirm: handleDelete.bind(null),
            },
          }]"
        >
          <template #more>
            <AButton class="ml-2">
              批量操作
              <kpu-icon name="i-ant-design:down-outlined" />
            </AButton>
          </template>
        </TableAction>
      </template>
      <template #ACTION="{ row }">
        <TableAction
          :actions="[{
            label: '查看',
            type: 'link',
            size: 'small',
            onClick: handleView.bind(null, row),
          }, {
            label: '编辑',
            type: 'link',
            size: 'small',
            onClick: handleEdit.bind(null, row),
          }]"
          :drop-down-actions=" [{
            label: '复制',
            onClick: handleCopy.bind(null, row),
          }, {
            label: '删除',
            popConfirm: {
              title: '确定删除吗？',
              confirm: handleDelete.bind(null, row),
            },
          }]"
        />
      </template>
    </Grid>
    <!--    </KPageMain> -->
    <DetailModal />
    <FormModal />
  </div>
</template>

<style scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow-y: auto;
}
</style>
