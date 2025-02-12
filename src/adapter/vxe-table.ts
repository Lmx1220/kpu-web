import type { VxeGlobalInterceptorHandles } from 'vxe-table'
import { setupKpuVxeTable, useKpuVxeGrid } from '@/ui/vxe-table'
import { get } from '@/utils'
import { globalShareState } from '@/utils/global-state.ts'
import { Image as AImage, Button } from 'ant-design-vue'

import domZIndex from 'dom-zindex'
import { h } from 'vue'
import { useKpuForm } from './form'

// 获取页面中最大的 z-index
// domZIndex.getMax()

// 设置当前 z-index 起始值
domZIndex.setCurrent(2000)
const uY: Record<string, string> = {
  Checkbox: 'checked',
  Radio: 'checked',
  Switch: 'checked',
}
function normalizeName(filePath: string) {
  const matchResult = filePath.match(/[^/]+(?=\.[^./]+$|$)/)
  return matchResult ? matchResult[0].replace(/\.[^/.]+$/, '') : null
}
function toPascalCase(input: string | null) {
  if (input === null) {
    return null
  }
  return input
    .replaceAll(/[-_]/g, ' ') // 替换所有 "-" 和 "_" 为空格
    .split(' ') // 将字符串分割为单词数组
    .map(word =>
      word && word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(), // 每个单词首字母大写，其余小写
    )
    .join('') // 将单词数组重新拼接成字符串
}

export const componentMap = new Map()
const componentRegistry: Record<string, any> = import.meta.glob('./components/*.vue', { eager: true })
Object.keys(componentRegistry).forEach((filePath) => {
  if (!filePath.includes('-ignore')) {
    const componentDefinition = componentRegistry[filePath]?.default || {}
    const normalizedName = normalizeName(filePath)
    componentMap.set(toPascalCase(normalizedName), componentDefinition)
  }
})
/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode(evnt: any, container: HTMLElement, className: string) {
  let targetElem
  let target = evnt.target
  while (target && target.nodeType && target !== document) {
    if (
      className
      && target.className
      && target.className.split
      && target.className.split(' ').includes(className)
    ) {
      targetElem = target
    }
    else if (target === container) {
      return { flag: className ? !!targetElem : true, container, targetElem }
    }
    target = target.parentNode
  }
  return { flag: false }
}

/**
 * 事件兼容性处理
 */
function handleClearEvent(
  params:
    | VxeGlobalInterceptorHandles.InterceptorClearFilterParams
    | VxeGlobalInterceptorHandles.InterceptorClearEditParams
    | VxeGlobalInterceptorHandles.InterceptorClearAreasParams,
) {
  const { $event } = params
  const bodyElem = document.body
  if (
    // 下拉框
    getEventTargetNode($event, bodyElem, 'ant-select-dropdown').flag
    // 级联
    || getEventTargetNode($event, bodyElem, 'ant-cascader-menus').flag
    //
    || getEventTargetNode($event, bodyElem, 'ant-picker-dropdown').flag
    // 日期
    || getEventTargetNode($event, bodyElem, 'ant-calendar-picker-container').flag
    // 时间选择
    || getEventTargetNode($event, bodyElem, 'ant-time-picker-panel').flag) {
    return false
  }
}
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
        toolbarConfig: {
          refresh: true,
          print: false,
          export: false,
          custom: true,
          zoom: true,
        },
        formConfig: {
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
          message: false,
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
    vxeUI.interceptor.add('event.clearFilter', handleClearEvent)
    vxeUI.interceptor.add('event.clearEdit', handleClearEvent)
    vxeUI.interceptor.add('event.clearAreas', handleClearEvent)

    // 表格配置项可以用 cellRender: { name: 'CellImage' },
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params
        const src = row[column.field]
        return h(AImage, { src })
      },
    })

    // 表格配置项可以用 cellRender: { name: 'CellLink' },
    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts
        return h(
          Button,
          { size: 'small', type: 'link' },

          { default: () => props?.text },
        )
      },
    })
    componentMap.forEach((component, componentName) => {
      vxeUI.renderer.add(componentName, {
        renderDefault(props, context) {
          const { row, column } = context

          return h(
            component,
            { ...props.props, ...{
              value: get(row, column.field),
            } },
          )
        },
      })
    })

    const components = globalShareState.getComponents()
    Object.keys(components).forEach((name) => {
      const component = components[name]
      const valueKey = uY[name] || 'value'

      vxeUI.renderer.add(name, {
        renderTableEdit(props, context) {
          const { row, column, $table } = context

          return h(
            component,
            { ...props.props, ...{
              [valueKey]: row[column.field],
              [`onUpdate:${valueKey}`]: (updatedValue: any) => {
                context.row[context.column.field] = updatedValue
                $table.updateStatus(context)
              },
            } },
          )
        },

        renderTableCell(props, context) {
          const { props: componentProps } = props
          const slot = componentMap.get(props.name)
          const { column, row } = context
          const cellValue = get(row, column.field)

          return slot
            ? h(slot, { ...componentProps, ...{ value: cellValue } })
            : cellValue
        },
      })
    })
    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
  },
  useKpuForm,
})

export { useKpuVxeGrid }

export type * from '@/ui/vxe-table'
