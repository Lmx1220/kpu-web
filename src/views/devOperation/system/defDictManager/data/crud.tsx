import type { CreateCrudOptionsProps, CreateCrudOptionsRet } from '@fast-crud/fast-crud'

import {
  addRequest,
  check,
  delRequest,
  editRequest,
  infoRequest,
  pageRequest,
  removeFn,
} from '@/api/devOperation/system/defDict'
import { RuleType } from '@/api/modules/common/formValidateServiceKpu.ts'
import { $t } from '@/locales'
import { transformQuery, transformRes } from '@/plugins/fast-crud'
import { deleteButton, indexColumn, YES_NO_CONSTANT_DICT } from '@/plugins/fast-crud/common'
import { ref } from 'vue'

export function createCrudOptions(props: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const selectedIds = ref([] as string[])
  const selectedId = ref()
  const { itemTableRef } = props.context

  const onRowChange = (changed: string) => {
    selectedId.value = changed
    itemTableRef.value.setData({
      parentId: changed,
    })
    itemTableRef.value.doRefresh()
  }

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest,
        infoRequest,
        transformQuery: (query) => {
          const params = transformQuery(query)
          params.sort = 'createdTime'
          params.order = 'desc'
          return params
        },
        transformRes: (data) => {
          const { res } = data
          if (res.records && res.records.length > 0) {
            selectedId.value = res.records[0].id
            //   setCurrentRow
            // props.crudExpose.getTableRef().tableRef.setCurrentRow(res.records[0])
            itemTableRef.value.setData({
              parentId: res.records[0].id,
            })
            itemTableRef.value.doRefresh()
          }

          return transformRes(data)
        },
      },
      actionbar: {
        buttons: {
          add: {
            // show: hasPermission(RoleEnum.TENANT_USER_ADD)
          },
          ...deleteButton({
            crudExpose: props.crudExpose,
            selectedIds,
            removeFn,
          }),
        },
      },
      table: {
        striped: true,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys: selectedIds,
          onChange: (ids: any) => {
            selectedIds.value = ids
          },
        },
        customRow(record: any, _index: number) {
          const clazz = record.id === selectedId.value ? 'fs-current-row' : ''
          return {
            onClick() {
              onRowChange(record.id)
            },
            class: clazz,
          }
        },
      },
      rowHandle: {
        width: 80,
        buttons: {
          edit: {
            // show: hasPermission(RoleEnum.TENANT_USER_EDIT)
          },
          view: {
            show: false,
          },
          remove: {
            show: false,
          },
          copy: {
            show: false,
          },
        },
      },
      columns: {
        ...indexColumn(props.crudExpose),
        key: {
          title: $t('devOperation.system.defDict.key'),
          type: 'text',
          search: {
            show: true,
          },
          column: {
            show: false,
          },
        },
        name: {
          title: $t('devOperation.system.defDict.name'),
          type: ['text'],
          search: {
            show: true,
          },
        },
        state: {
          title: $t('devOperation.system.defDict.state'),
          type: ['dict-radio'],
          dict: YES_NO_CONSTANT_DICT,
          search: {
            show: true,
            component: {
              mode: 'multiple',
            },
          },
          addForm: {
            value: true,
          },
          column: {
            width: 60,
          },
        },
        // sortValue: {
        //   title: $t('devOperation.system.defDict.sortValue'),
        //   type: ['number'],
        //   column: {
        //     show: false,
        //   },
        // },
        remark: {
          title: $t('devOperation.system.defDict.remark'),
          type: ['textarea'],
          column: {
            show: false,
          },
        },
      },
    },
  }
}

export const frontRules = {
  addForm: {
    rules: () => ({
      key: {
        type: RuleType.append,
        rules: [
          {
            trigger: 'blur',
            type: 'string',
            message: '标识重复',
            validator: async (_rule: any, value: any) => {
              if (value && (await check(value))) {
                throw new Error('标识重复')
              }
            },
          },
        ],
      },
    }),
  },
  editForm: {
    rules: (crudExpose: any) => ({
      key: {
        type: RuleType.append,
        rules: [
          {
            trigger: 'blur',
            type: 'string',
            message: '标识重复',
            validator: async (_rule: any, value: any) => {
              if (value) {
                const { getFormData } = crudExpose
                if (await check(value, getFormData().id)) {
                  throw new Error('标识重复')
                }
              }
            },
          },
        ],
      },
    }),
  },
}
