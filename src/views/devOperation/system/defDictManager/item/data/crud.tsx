import type { CreateCrudOptionsProps, CreateCrudOptionsRet } from '@fast-crud/fast-crud'

import {
  addRequest,
  check,
  delRequest,
  editRequest,
  get,
  pageRequest,
  removeFn,
} from '@/api/devOperation/system/defDictItem'
import { RuleType } from '@/api/modules/common/formValidateServiceKpu.ts'
import { $t } from '@/locales'
import { transformQuery } from '@/plugins/fast-crud'
import { deleteButton, indexColumn, YES_NO_CONSTANT_DICT } from '@/plugins/fast-crud/common'
import KIconPicker from '@/ui/components/KpuIconPicker/index.vue'
import { ref } from 'vue'

export function createCrudOptions(props: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const selectedIds = ref([] as string[])
  const selectedId = ref()

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest,
        infoRequest: async (query) => {
          const { row } = query
          const value = props.context.parentIdRef.value
          const data = await get(value)
          if (row === undefined) {
            return {
              parentId: data.id,
              parentKey: data.key,
              parentName: data.name,
            }
          }
          row.parentId = data.id
          row.parentKey = data.key
          row.parentName = data.name
          return row
        },
        transformQuery: (data) => {
          const query = transformQuery(data)
          query.model.parentId = props.context.parentIdRef.value
          query.sort = 'sortValue'
          query.order = 'ascend'

          return query
        },
      },
      actionbar: {
        buttons: {
          add: {
            show: true,
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
              selectedId.value = record.id
            },
            class: clazz,
          }
        },
      },
      rowHandle: {
        watch: 150,
        buttons: {
          edit: {
            show: true,
            // show: hasPermission(RoleEnum.TENANT_USER_EDIT)
          },
          view: {
            show: true,
          },
          remove: {
            show: true,
          },
          copy: {
            show: false,
          },
        },
      },
      columns: {
        ...indexColumn(props.crudExpose),
        parentId: {
          title: $t('devOperation.system.defDictItem.parentId'),
          type: ['text'],
          form: {
            show: false,
          },
          column: {
            show: false,
          },
        },
        parentKey: {
          title: $t('devOperation.system.defDictItem.parentKey'),
          type: ['text'],
          form: {
            component: {
              disabled: true,
            },
          },
          column: {
            show: false,
          },
        },
        parentName: {
          title: $t('devOperation.system.defDictItem.parentName'),
          type: ['text'],
          form: {
            component: {
              disabled: true,
            },
          },
          column: {
            show: false,
          },
        },
        key: {
          title: $t('devOperation.system.defDictItem.key'),
          type: ['text'],
          search: {
            show: true,
          },
        },
        name: {
          title: $t('devOperation.system.defDictItem.name'),
          type: ['text'],
          search: {
            show: true,
          },
        },
        state: {
          title: $t('devOperation.system.defDictItem.state'),
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
        },
        remark: {
          title: $t('devOperation.system.defDictItem.remark'),
          type: ['textarea'],
          column: {
            show: false,
          },
        },
        sortValue: {
          title: $t('devOperation.system.defDictItem.sortValue'),
          type: ['number'],
          column: {
            show: false,
          },
        },
        icon: {
          title: $t('devOperation.system.defDictItem.icon'),
          // type: ['text'],
          form: {
            render: s => (
              <KIconPicker v-model={s.form.icon} />
            ),

            // E(
            //   _,
            //   {
            //     copy: true,
            //     value: s.form.icon,
            //     'onUpdate:value': t => (s.form.icon = t)
            //   },
            //   null
            // )
          },
          column: {
            show: false,
          },
        },
        cssStyle: {
          title: $t('devOperation.system.defDictItem.cssStyle'),
          type: ['text'],
          column: {
            show: false,
          },
        },
        cssClass: {
          title: $t('devOperation.system.defDictItem.cssClass'),
          type: ['text'],
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
    rules: (crudExpose: any) => ({
      key: {
        type: RuleType.append,
        rules: [
          {
            trigger: 'blur',
            type: 'string',
            message: `${$t('devOperation.system.defDictItem.parentKey')}标识重复`,
            validator: async (_rule: any, value: any) => {
              const { getFormData } = crudExpose
              if (value && (await check(value, getFormData().parentId))) {
                throw new Error(`${$t('devOperation.system.defDictItem.parentKey')}重复`)
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
            message: `${$t('devOperation.system.defDictItem.parentKey')}重复`,
            validator: async (_rule: any, value: any) => {
              if (value) {
                const { getFormData } = crudExpose
                if (await check(value, getFormData().parentId, getFormData().id)) {
                  throw new Error(`${$t('devOperation.system.defDictItem.parentKey')}重复`)
                }
              }
            },
          },
        ],
      },
    }),
  },
}
