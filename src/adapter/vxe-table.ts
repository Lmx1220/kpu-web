import { setupKpuVxeTable, useKpuVxeGrid } from '@/ui/vxe-table'

import { ElButton, ElImage } from 'element-plus'

import { h } from 'vue'

import { useKpuForm } from './form'

setupKpuVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: false,
        columnConfig: {
          resizable: true,
        },
        minHeight: 180,
        formConfig: {
          // 全局禁用vxe-table的表单配置，使用formOptions
          enabled: false,
        },
        rowConfig: {
          keyField: 'id',
          isHover: false,
          isCurrent: true,
        },
        checkboxConfig: {
          reserve: true,
          highlight: true,
          range: true,
          trigger: 'cell',
        },
        sortConfig: {
          remote: true,
          trigger: 'cell',
          showIcon: true,
          orders: ['asc', 'desc', null],
          chronological: false,
          defaultSort: {
            field: 'createdTime',
            order: 'desc',
          },
        },

        pagerConfig: {
          pageSize: 10,
          pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
        },
        proxyConfig: {
          autoLoad: true,
          seq: true,
          sort: true,
          filter: true,
          form: true,
          response: {
            result: 'records',
            total: 'total',
            message: 'msg',
          },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: true,
        showOverflow: true,
        size: 'small',
      },
    })

    // 表格配置项可以用 cellRender: { name: 'CellImage' },
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params
        const src = row[column.field]
        return h(ElImage, { src, previewSrcList: [src] })
      },
    })

    // 表格配置项可以用 cellRender: { name: 'CellLink' },
    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts
        return h(
          ElButton,
          { size: 'small', link: true },
          { default: () => props?.text },
        )
      },
    })

    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
  },
  useKpuForm,
})

export { useKpuVxeGrid }

export type * from '@/ui/vxe-table'
