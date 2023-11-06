import type { VxeGridPropTypes } from 'vxe-table'
import type { FormSchemaExt } from '@/api/modules/common/formValidateService'

const { t } = useI18n()

export function formItems(): Partial<any>[] {
  return [
    {
      field: 'key',
      title: t('key'),
      span: 6,
      folding: false,
      itemRender: { name: 'ElInput', props: { placeholder: '请输入' } },
    },
    {
      field: 'name',
      title: t('name'),
      span: 6,
      folding: false,
      itemRender: { name: '$radio', options: [{ label: '是', value: 'Y' }, { label: '否', value: 'N' }] },
    },
    {
      span: 24,
      align: 'center',
      collapseNode: true,
      itemRender: {
        name: '$buttons',
        children: [
          {
            props: {
              type: 'submit',
              content: t('common.queryText'),
              status: 'primary',
            },
          },
          { props: { type: 'reset', content: t('common.resetText') } },
        ],
      },
    },
  ]
}

export function columns(): VxeGridPropTypes.Columns {
  return [
    { type: 'checkbox', width: 50, fixed: 'left' },
    { type: 'seq', width: 40, fixed: 'left' },
    {
      field: 'key',
      title: t('file.file.file.bizType'),
      editRender: { name: '$input', attrs: { placeholder: '请输入' } },
    },
    {
      field: 'name',
      title: t('file.file.file.fileType'),
      editRender: { name: '$input', attrs: { placeholder: '请输入' } },
    },
    {
      field: 'state',
      title: t('file.file.file.storageType'),
      editRender: { name: 'ElRadio', options: [{ label: '是', value: 'Y' }, { label: '否', value: 'N' }] },
    },

    {
      field: 'createdTime',
      title: t('kpu.common.createdTime'),
      sortable: true,
      width: 180,
    },
    {
      title: t('common.column.action'),
      width: 160,
      fixed: 'right',
      slots: { default: 'operate' },
    },
  ]
}

export function customFormSchemaRules(): FormSchemaExt[] {
  return []
}
