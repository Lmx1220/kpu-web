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
import { checkedColumn, deleteButton, indexColumn, YES_NO_CONSTANT_DICT } from '@/plugins/fast-crud/common'
import { ref } from 'vue'

export function createCrudOptions(props: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const selectedIds = ref([] as string[])
  const selectedId = ref()
  const { itemTableRef } = props.context
  const onSelectionChange = (changed: any[]) => {
    selectedIds.value = changed.map(item => item.id)
    // console.log('selection', selectedIds.value)
  }
  const onRowChange = (changed: string) => {
    selectedId.value = changed
    itemTableRef.value.setData({
      parentId: changed,
    })
    itemTableRef.value.doRefresh()
  }

  return {
    crudOptions: {
      container: {
        // is: '',
      },
      //   form: {
      //     wrapper: {
      //       is: 'el-drawer',
      //       draggable: false,
      //       size: '50%',
      //     },
      //   },
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
            // selectedId.value = res.records[0].id
            //   setCurrentRow
            props.crudExpose.getTableRef().tableRef.setCurrentRow(res.records[0])
            // itemTableRef.value.setData({
            //   parentId: res.records[0].id,
            // })
            // itemTableRef.value.doRefresh()
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
        'highlight-current-row': true,
        // 监听 el-table的单行选中事件
        onCurrentChange(row: any, _oldRow: any) {
          // console.log('选中行', row)
          // if (row != null && row.id === selectedId.value) {
          //   return
          // }
          if (row != null) {
            onRowChange(row.id)
          }
          // if (asideTableRef.value) {
          //   asideTableRef.value.setSearchFormData({ form: { gradeId: currentRow.id } })
          //   asideTableRef.value.doRefresh()
          // }
        },
        onSelectionChange,
        'striped': true,
        'rowKey': (row: any) => row.id,
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
        ...checkedColumn(),
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
              multiple: true,
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
