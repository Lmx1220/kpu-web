import type { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { intersectionWith, isEqual, mergeWith, unionWith } from 'lodash-es'
import path from 'path-browserify'
import { isArray, isObject } from '@/util/is'

// 深拷贝
export function deepClone<T>(target: T): T {
  // 定义一个变量
  let result: any
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
  // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    }
    else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    }
    else if (target.constructor === RegExp) {
      result = target
    }
    else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (const i in target) {
        result[i] = deepClone(target[i])
      }
    }
  // 如果不是对象的话，就是基本数据类型，那么直接赋值
  }
  else {
    result = target
  }
  // 返回最终结果
  return result as T
}

export function isExternalLink(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function resolveRoutePath(basePath: string, routePath?: string) {
  return basePath ? path.resolve(basePath, routePath ?? '') : routePath ?? ''
}

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。
 *        - "concat": Concatenate the arrays. 连接数组。
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace',
): T & U {
  if (!target) {
    return source as T & U
  }
  if (!source) {
    return target as T & U
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual)
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual)
        case 'concat':
          return sourceValue.concat(targetValue)
        case 'replace':
          return targetValue
        default:
          throw new Error(`Unknown merge array strategy: ${mergeArrays as string}`)
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays)
    }
    return undefined
  })
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += `${key}=${encodeURIComponent(obj[key])}&`
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

interface NodeConfig {
  id: string
  children: string
  parentId: string
  name: string
}

const nodeConfig: NodeConfig = {
  id: 'id',
  children: 'children',
  parentId: 'parentId',
  name: 'name',
}

const createNode = (partialNode: Partial<NodeConfig>): NodeConfig => Object.assign({}, nodeConfig, partialNode)

export function findOrgNode(pId: string, nodes: Array<Record<string, any>>, options: Partial<NodeConfig> = {}): Record<string, any> | null {
  const defaultOptions: NodeConfig = createNode(options)
  const {
    id,
    name,
    children,
  } = defaultOptions

  if (pId === '0') {
    return {
      [id]: '0',
      [name]: '根节点',
    }
  }

  if (!pId) {
    return {
      [id]: pId,
      [name]: '根节点',
    }
  }

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index]

    if (node[id] === pId) {
      return node
    }

    if (node[children]) {
      const foundNode = findOrgNode(pId, node[children])
      if (foundNode) {
        return foundNode
      }
    }
  }

  return null
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const {
    target = '__blank',
    noopener = true,
    noreferrer = true,
  } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

export function downloadFile(response: AxiosResponse<Blob>) {
  const res = response.data
  const type = res.type
  if (type.includes('application/json')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e?.target?.readyState === 2) {
        const data = JSON.parse(<string>e?.target?.result)
        ElMessage.warning(data.msg)
      }
    }
    reader.readAsText(res)
  }
  else {
    const disposition = response.headers['content-disposition']
    let fileName = '下载文件.zip'
    if (disposition) {
      const respcds = disposition.split(';')
      for (let i = 0; i < respcds.length; i++) {
        const header = respcds[i]
        if (header !== null && header !== '') {
          const headerValue = header.split('=')
          if (headerValue !== null && headerValue.length > 0) {
            if (headerValue[0].trim().toLowerCase() === 'filename') {
              fileName = decodeURI(headerValue[1])
              break
            }
          }
        }
      }
    }
    // 处理引号
    if ((fileName.startsWith('\'') || fileName.startsWith('"')) && (fileName.endsWith('\'') || fileName.endsWith('"'))) {
      fileName = fileName.substring(1, fileName.length - 1)
    }

    const blob = new Blob([res])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}
