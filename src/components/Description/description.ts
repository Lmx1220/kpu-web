import type { KpuFormProps } from '@/ui/form-ui'
import type { DescriptionProps } from './typing.ts'
import { isFunction } from '@/utils'

// checkIfDetailValid 函数：用于检查 schema 中的 ifDetail 是否有效
function checkIfDetailValid(params: {
  schema: any
  values: any
  model: any
  field: string
}) {
  const schema = params.schema

  // 如果 ifDetail 是函数，执行它，否则检查是否不等于 false
  return isFunction(schema.ifDetail) ? schema.ifDetail(params) : schema.ifDetail !== false
}

// qje 函数：根据 schema 和传入的值 value 生成字段信息
export function viewForm(params: KpuFormProps, value: any) {
  const result: DescriptionProps[] = []
  const schema = params.schema

  // 如果 schema 不是数组，直接返回空数组
  if (!Array.isArray(schema)) {
    return result
  }

  // 遍历 schema 中的元素
  for (let i = 0; i < schema.length; i++) {
    const currentItem = schema[i]

    // 如果当前项是 Divider，开始处理分组
    if (currentItem?.component === 'Divider') {
      result.push({
        field: currentItem.fieldName,
        label: currentItem.label,
        children: [],
      })

      // 查找下一个 Divider 之前的元素
      for (let j = i + 1; j < schema.length; j++) {
        const nextItem = schema[j]

        // 如果遇到下一个 Divider，停止当前循环
        if (nextItem?.component === 'Divider') {
          i = j - 1 // 更新 i 的值，以跳出循环
          break
        }
        else {
          // 否则，检查 checkIfDetailValid 条件，符合条件时将项添加到当前分组
          if (checkIfDetailValid({ schema: nextItem, values: value, model: value, field: currentItem.fieldName })) {
            const lastItem = result[result.length - 1]
            const children = lastItem?.children || []

            children.push({
              field: nextItem?.fieldName,
              label: nextItem?.label,
              span: nextItem?.detailSpan || 12,
              component: nextItem?.component,
              componentProps: typeof nextItem?.componentProps === 'function'
                // eslint-disable-next-line ts/ban-ts-comment
                // @ts-expect-error
                ? nextItem?.componentProps(value, {})
                : nextItem?.componentProps,
            })
          }
        }
      }
    }
  }

  // 如果有分组信息，返回分组；否则，返回一个默认的基本信息组
  if (result.length > 0) {
    return result
  }
  else {
    return [{
      field: 'baseinfo',
      label: '基本信息',
      children: schema.filter(item =>
        checkIfDetailValid({ schema: item, values: value, model: value, field: item.fieldName }),
      ).map(item => ({
        field: item.fieldName,
        label: item.label,
        span: item.detailSpan || 12,
        component: item.component,
        componentProps: typeof item?.componentProps === 'function'
          // eslint-disable-next-line ts/ban-ts-comment
          // @ts-expect-error
          ? item?.componentProps(value, {})
          : item?.componentProps,
      })),
    }]
  }
}
