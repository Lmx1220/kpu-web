import type { CodeQueryVO } from '@/api/modules/common/model/optionsModel.ts'
import { $t } from '@/locales'
import { isString } from '@/utils/is'
import { dict } from '@fast-crud/fast-crud'
import { message, Modal } from 'ant-design-vue'
import { h } from 'vue'

export function indexColumn(crudExpose?: any) {
  return {
    _index: {
      title: $t('common.seq'),
      type: 'number',
      column: {
        align: 'center',
        width: '50px',
        columnSetDisabled: true,
        formatter: (row: any) => {
          if (crudExpose) {
            const index = row.index ?? 1
            const pagination = crudExpose.crudBinding.value.pagination
            return ((pagination?.page ?? 1) - 1) * (pagination?.pageSize ?? 1) + index + 1
          }
          return (row.index ?? 1) + 1
        },
      },
      form: {
        show: false,
      },
    },
  }
}
export function createdTimeColumn({ searchShow = true, addShow = false, editShow = false }) {
  return {
    createdTime: {
      title: $t('common.createdTime'),
      type: 'daterange',
      viewForm: {
        render: ({ value }: any) => h('span', null, [value]),
      },
      search: {
        show: searchShow,
        col: { span: 5 },
        component: {
          format: 'YYYY-MM-DD',
          valueFormat: 'YYYY-MM-DD',
        },
        valueResolve({ form, key }: any) {
          if (form[key]) {
            const extra = {
              [`${String(key)}_st`]: form[key]?.[0],
              [`${String(key)}_ed`]: form[key]?.[1],
            }
            Reflect.deleteProperty(form, key)
            form.extra = extra
          }
        },
      },
      addForm: {
        show: addShow,
      },
      editForm: {
        show: editShow,
      },
      column: {
        sorter: 'custom',
        width: 180,
        cellRender: ({ value }: any) => h('span', null, [value, '1111']),
      },
    },
  }
}

export function deleteButton(data: any) {
  const { crudExpose, selectedIds, removeFn } = data
  return {
    batchDelete: {
      // TODO 权限
      // show: role ? y8t(role) : true,
      text: $t('common.title.delete'),
      click() {
        if (selectedIds.value?.length > 0) {
          Modal.confirm(
            {
              title: '确认',
              iconType: 'warning',
              content: `确定要批量删除这${selectedIds.value.length}条记录吗`,
              onOk: async () => {
                if (await removeFn(selectedIds.value)) {
                  message.info('删除成功')
                  selectedIds.value = []
                  await crudExpose?.doRefresh()
                }
              },
            },
          )
        }
        else {
          message.warning('请先勾选您要删除的数据')
        }
      },
    },
  }
}

export const YES_NO_CONSTANT_DICT = dict({
  data: [
    {
      value: true,
      label: '是',
      color: 'success',
    },
    {
      value: false,
      label: '否',
      color: 'error',
    },
  ],
})

export function backendDict(data: string | CodeQueryVO) {
  let params: CodeQueryVO
  if (isString(data)) {
    params = {
      type: data,
      extendFirst: true,
    }
  }
  else {
    params = data
  }
  return dict({
    cloneable: false,
    url: params.type,
    custom: params,
    immediate: false,
  })
}
