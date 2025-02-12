import type { ActionEnum } from '@/enums/commonEnum.ts'
import type { CreateCrudOptionsProps, CreateCrudOptionsRet, CrudExpose } from '@fast-crud/fast-crud'
import {
  addRequest,
  delRequest,
  editRequest,
  infoRequest,
  pageRequest,
  removeFn,
} from '@/api/devOperation/tenant/datasourceConfig'
import { DictEnum } from '@/enums/commonEnum.ts'
import { $t } from '@/locales'
// import { usePermission } from '@/hooks/web/usePermission'
import {
  backendDict,
  checkedColumn,
  createdTimeColumn,
  deleteButton,
  indexColumn,
} from '@/plugins/fast-crud/common'
import { ref } from 'vue'
// import type { FormRulesExt } from '@/service/fetch';

// const { hasPermission } = usePermission()

export function createCrudOptions(props: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const selectedIds = ref([] as string[])

  const onSelectionChange = (changed: string[]) => {
    selectedIds.value = changed
  }

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest,
        infoRequest,
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
        'striped': true,
        'rowKey': (row: any) => row.id,
        'checkedRowKeys': selectedIds,
        'onUpdate:checkedRowKeys': onSelectionChange,
      },
      rowHandle: {
        width: '200px',
        buttons: {
          edit: {
            // show: hasPermission(RoleEnum.TENANT_USER_EDIT)
          },
          remove: {
            // show: hasPermission(RoleEnum.TENANT_USER_DELETE),
          },
          copy: {
            // show: hasPermission(RoleEnum.TENANT_USER_ADD),
          },
          debug: {
            // show: hasPermission(RoleEnum.TENANT_DATASOURCE_CONFIG_DEBUG),
            text: '测试链接',
            dropdown: true,
            click: () => {
              // props?.context.openModal(!0, {
              //   record: data.row,
              // })
            },
          },
        },
      },
      columns: {
        ...checkedColumn(),
        ...indexColumn(props.crudExpose),
        name: {
          title: $t('devOperation.tenant.defDatasourceConfig.name'),
          type: 'text',
          search: {
            show: true,
          },
          column: {
            sortable: 'custom',
            width: 180,
          },
        },
        username: {
          title: $t('devOperation.tenant.defDatasourceConfig.username'),
          type: 'text',
          search: {
            show: true,
          },
          column: {
            sortable: 'custom',
          },
        },
        password: {
          title: $t('devOperation.tenant.defDatasourceConfig.password'),
          type: ['password'],
          column: {
            show: false,
          },
          viewForm: {
            show: false,
          },
        },
        url: {
          title: $t('devOperation.tenant.defDatasourceConfig.url'),
          type: 'text',
          search: {
            show: true,
          },
          column: {
            'show-overflow-tooltip': true,
            'ellipsis': {
              tooltip: true,
            },
          },
        },
        driverClassName: {
          title: $t('devOperation.tenant.defDatasourceConfig.driverClassName'),
          type: 'dict-select',
          dict: backendDict(DictEnum.DATASOURCE_CONFIG_DRIVER),
          column: {
            'show-overflow-tooltip': true,
            'ellipsis': {
              tooltip: true,
            },
          },
        },
        ...createdTimeColumn({}),
      },
      addForm: {

      },
      editForm: {

      },
    },
  }
}

export function frontRules(_crudExpose: CrudExpose, _mode: ActionEnum): any {
  return {}
}
