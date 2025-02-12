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
  createdTimeColumn,
  deleteButton,
  indexColumn,
} from '@/plugins/fast-crud/common'
import { ref } from 'vue'
// import type { FormRulesExt } from '@/service/fetch';

// const { hasPermission } = usePermission()

export function createCrudOptions(props: CreateCrudOptionsProps): CreateCrudOptionsRet {
  // const loading = ref(false)
  const selectedIds = ref([] as string[])

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
        striped: true,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          selectedRowKeys: selectedIds,
          onChange: (ids: any) => {
            selectedIds.value = ids
          },
        },
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
          // debug: {
          //   // show: hasPermission(RoleEnum.TENANT_DATASOURCE_CONFIG_DEBUG),
          //   text: '测试链接',
          //   dropdown: true,
          //   click: (data) => {
          //     // if (unref(loading)) {
          //     //   s.warning('正在测试连接，请稍后!')
          //     //   return
          //     // }
          //     // const params = { ...data.row }
          //     // params.poolName = 'test'
          //     // loading.value = true
          //     // o()
          //     // testConnect(params.id).then((a) => {
          //     //   a ? s.success('测试连接成功') : s.error('测试连接失败,请检查配置是否正确!')
          //     // }).finally(() => {
          //     //   loading.value = false
          //     //   n()
          //     // })
          //   },
          // },
        },
      },
      columns: {
        ...indexColumn(props.crudExpose),
        name: {
          title: $t('devOperation.tenant.defDatasourceConfig.name'),
          type: 'text',
          search: {
            show: true,
          },
          column: {
            sorter: 'custom',
            width: 180,
          },
        },
        username: {
          title: $t('devOperation.tenant.defDatasourceConfig.username'),
          type: 'text',
          search: {
            show: true,
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
            ellipsis: {
              tooltip: true,
            },
          },
        },
        driverClassName: {
          title: $t('devOperation.tenant.defDatasourceConfig.driverClassName'),
          type: 'dict-select',
          dict: backendDict(DictEnum.DATASOURCE_CONFIG_DRIVER),
          column: {
            ellipsis: {
              tooltip: true,
            },
          },
        },
        ...createdTimeColumn({}),
      },
    },
  }
}

export function frontRules(_crudExpose: CrudExpose, _mode: ActionEnum): any {
  return {}
}
