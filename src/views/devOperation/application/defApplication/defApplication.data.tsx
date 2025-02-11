import type { DefApplicationResultVO } from '@/api/devOperation/application/model/defApplicationModel.ts'
import type { KpuFormProps } from '@/ui/form-ui'
import type { VxeTableGridOptions } from '@/ui/vxe-table'
import YesOrNoEnum from '@/enums/common/yesOrNoEnum.ts'
import { DictEnum, FileBizTypeEnum } from '@/enums/commonEnum.ts'
import { $t } from '@/locales'
import { ElTag } from 'element-plus'

// 列表页字段
export const formItems: KpuFormProps = {
  fieldMappingTime: [
    ['createdTime', ['extra.createdTime_st', 'extra.createdTime_ed'], ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59']],
  ],
  schema: [
    {
      component: 'Input',
      fieldName: 'appKey',
      label: $t('devOperation.application.defApplication.appKey'),
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('devOperation.application.defApplication.name'),
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'type',
      label: $t('devOperation.application.defApplication.type'),
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
    },
    {
      component: 'DatePicker',
      // defaultValue: [
      //   dayjs().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'),
      //   dayjs().format('YYYY-MM-DD 23:59:59'),
      // ],
      fieldName: 'createdTime',
      label: $t('common.createdTime'),
      componentProps: {
        type: 'daterange',
        // valueFormat: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '请选择',
        allowClear: true,
      },
    },
    // {
    //   component: 'Input',
    //   fieldName: 'createdTime',
    //   label: $t('common.createdTime'),
    //   componentProps: {
    //     placeholder: '请输入',
    //     allowClear: true,
    //   },
    // },
  ],
}
// function formatterYesNo({ cellValue }) {
//   return cellValue ? t('lamp.common.yes') : t('lamp.common.no')
// }

export const columns: VxeTableGridOptions<DefApplicationResultVO> = {
  toolbarConfig: {
    slots: {
      buttons: 'toolbar-buttons',
    },
  },
  columns: [
    {
      type: 'checkbox',
      width: 50,
    },
    {
      title: $t('common.seq'),
      type: 'seq',
      width: 50,
    },
    {
      field: 'appKey',
      title: $t('devOperation.application.defApplication.appKey'),
    },
    {
      field: 'name',
      title: $t('devOperation.application.defApplication.name'),
    },
    {
      field: 'version',
      width: 100,
      title: $t('devOperation.application.defApplication.version'),
    },
    {
      field: 'type',
      width: 120,
      title: $t('devOperation.application.defApplication.type'),
      slots: {
        default: ({ row }) => {
          return (
            <ElTag type={row.type === '10' ? 'success' : 'primary'}>{row.echoMap?.type}</ElTag>
          )
        },
      },

    },
    {
      field: 'isGeneral',
      width: 120,
      title: $t('devOperation.application.defApplication.isGeneral'),
      slots: {
        default: ({ row }) => {
          return (
            <ElTag type={row?.isGeneral ? 'success' : 'danger'}>{row?.isGeneral ? $t('common.yes') : $t('common.no')}</ElTag>)
        },
      },
    },
    {
      field: 'sortValue',
      width: 50,
      title: $t('devOperation.application.defApplication.sortValue'),
    },
    {
      field: 'createdTime',
      formatter: 'formatDateTime',
      sortable: true,
      width: 180,
      title: $t('common.createdTime'),
    },
    {
      field: 'action',
      fixed: 'right',
      title: '操作',
      slots: {
        default: 'ACTION',
      },
      width: 150,
    },
  ],
}

export const formEdit: KpuFormProps = {
  wrapperClass: 'grid-cols-12',
  commonConfig: {
    formItemClass: 'col-span-12',
  },
  schema: [
    {
      fieldName: 'id',
      label: 'ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'appendixIcon',
      label: $t('devOperation.application.defApplication.logo'),
      component: 'Avatar',
      componentProps: {
        placeholder: '请选择logo',
        showBtn: false,
        data: {
          bizType: FileBizTypeEnum.DEF_APPLICATION_LOGO,
        },
      },
      formItemClass: 'col-span-12',
    },
    {
      fieldName: 'name',
      label: $t('devOperation.application.defApplication.name'),
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 12,
    },
    {
      fieldName: 'version',
      label: $t('devOperation.application.defApplication.version'),
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 12,
    },
    {
      fieldName: 'redirect',
      label: $t('devOperation.application.defApplication.redirect'),
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 12,
    },
    {
      fieldName: 'type',
      label: $t('devOperation.application.defApplication.type'),
      component: 'ApiDict',
      componentProps: {
        placeholder: '请选择',
        type: DictEnum.APPLICATION_TYPE,
        renderType: 'RadioGroup',
        isBtn: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 12,
    },
    {
      fieldName: 'introduce',
      label: $t('devOperation.application.defApplication.introduce'),
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 12,
    },
    {
      fieldName: 'url',
      label: $t('devOperation.application.defApplication.url'),
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 12,
    },
    {
      fieldName: 'remark',
      label: $t('devOperation.application.defApplication.remark'),
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        type: 'textarea',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'isVisible',
      label: $t('devOperation.application.defApplication.isVisible'),
      component: 'RadioGroup',
      componentProps: { ...YesOrNoEnum.enum() },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'isGeneral',
      label: $t('devOperation.application.defApplication.isGeneral'),
      component: 'RadioGroup',
      componentProps: { ...YesOrNoEnum.enum() },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'sortValue',
      label: $t('devOperation.application.defApplication.sortValue'),
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 12,
    },
  ],
}
