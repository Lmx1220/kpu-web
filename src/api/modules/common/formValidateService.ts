import type { AxiosRequestConfig } from 'axios'
import dayjs from '@/util/dayjs'
import defHttp from '@/api'

export enum FormSchemaTypeEnums {
  // 替换
  REPLACE = 1,
  // 追加
  APPEND = 2,
}
export interface FormSchemaExt {
  // 字段名
  field: string
  // 校验规则
  rules?: any[]
  // 类型 1:替换 2:追加
  type?: FormSchemaTypeEnums
}
const cacheMap = new Map()
const cacheObjMap = new Map()
const typeMap: Map<string, string> = new Map()
typeMap.set('String', 'string')
typeMap.set('Integer', 'string')
typeMap.set('Boolean', 'boolean')
typeMap.set('Float', 'string')
typeMap.set('Array', 'array')
typeMap.set('Date', 'date')
typeMap.set('DateTime', 'date')
typeMap.set('Time', 'date')

function checkPastDate(reference: string, date: string) {
  if (reference) {
    const currentDate = dayjs()
    if (date === 'Past') {
      return currentDate.isAfter(dayjs(reference))
    }
    if (date === 'PastOrPresent') {
      return currentDate.isSameOrAfter(dayjs(reference))
    }
    if (date === 'Future') {
      return currentDate.isBefore(dayjs(reference))
    }
    if (date === 'FutureOrPresent') {
      return currentDate.isSameOrBefore(dayjs(reference))
    }
  }
  return true
}
function generateValidationRules(fields: any[]) {
  const validationRules: any[] = []

  fields.forEach(({ field, fieldType, constraints }) => {
    const rules = []

    if (fieldType === 'Float') {
      rules.push({
        type: 'number',
        message: `${field}必须是数字`,
      })
    }
    else if (fieldType === 'Array') {
      rules.push({
        type: 'array',
        message: `${field}必须是数组`,
      })
    }
    else if (fieldType === 'Boolean') {
      rules.push({
        type: 'boolean',
        message: `${field}必须是布尔类型`,
      })
    }

    addCustomRules(rules, constraints, fieldType)

    validationRules.push({
      field,
      rules,
    })
  })

  return validationRules
}

function replaceMessagePlaceholders(rule: any) {
  if (rule && rule.message) {
    const placeholderRegex = /({([a-zA-Z0-9]*)})/g
    let updatedMessage = rule.message
    while (true) {
      const match = placeholderRegex.exec(updatedMessage)
      if (match === null) {
        break
      }
      const placeholder = match[0]
      const placeholderName = match[2]
      updatedMessage = updatedMessage.replaceAll(placeholder, rule[placeholderName])
    }
    return updatedMessage
  }
  return '输入不符合规则'
}
function addCustomRules(rules: any, customRules: any[], type: string) {
  let fieldType
  customRules.forEach(({ type: ruleType, attrs }) => {
    switch (ruleType) {
      case 'RegEx':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return (!value || new RegExp(attrs.regexp).test(value)) ? Promise.resolve() : Promise.reject(attrs.message)
          },
          message: attrs.message,
        })
        break
      case 'Max':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return parseInt(value) > attrs.value ? Promise.reject(attrs.message) : Promise.resolve()
          },
          message: replaceMessagePlaceholders(attrs),
        })
        break
      case 'Min':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return parseInt(value) < attrs.value ? Promise.reject(attrs.message) : Promise.resolve()
          },
          message: replaceMessagePlaceholders(attrs),
        })
        break
      case 'DecimalMax':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return parseFloat(value) > attrs.value ? Promise.reject(attrs.message) : Promise.resolve()
          },
          message: attrs.message,
        })
        break
      case 'DecimalMin':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return parseFloat(value) < attrs.value ? Promise.reject(attrs.message) : Promise.resolve()
          },
          message: attrs.message,
        })
        break
      case 'Null':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return value.length !== 0 ? Promise.reject(attrs.message) : Promise.resolve()
          },
          message: attrs.message,
        })
        break
      case 'NotNull':
        fieldType = typeMap.get(type) || 'string'
        rules.push({
          required: true,
          type: fieldType,
          whitespace: true,
          message: attrs.message,
          trigger: ['change', 'blur'],
        })
        break
      case 'Range':
        rules.push({
          max: attrs.max,
          min: attrs.min,
          message: replaceMessagePlaceholders(attrs),
        })
        break
      case 'AssertTrue':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return (value === 'true' || value === true) ? Promise.resolve() : Promise.reject(attrs.message)
          },
          message: attrs.message,
        })
        break
      case 'AssertFalse':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return (value === 'false' || value === false) ? Promise.resolve() : Promise.reject(attrs.message)
          },
          message: attrs.message,
        })
        break
      case 'Past':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return checkPastDate(value, attrs) ? Promise.resolve() : Promise.reject(attrs.message)
          },
          message: attrs.message,
        })
        break
      case 'PastOrPresent':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return checkPastDate(value, attrs) ? Promise.resolve() : Promise.reject(attrs.message)
          },
          message: attrs.message,
        })
        break
      case 'Future':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return !checkPastDate(value, attrs) ? Promise.resolve() : Promise.reject(attrs.message)
          },
          message: attrs.message,
        })
        break
      case 'FutureOrPresent':
        rules.push({
          type: 'method',
          validator(model: any, value: any, callback: any) {
            return !checkPastDate(value, attrs) ? Promise.resolve() : Promise.reject(attrs.message)
          },
          message: attrs.message,
        })
        break
    }
  })
}
function mergeRules(rules: any[] = [], formSchemaExt: Partial<FormSchemaExt>[] = []) {
  const ruleMap = new Map<string, any[]>()

  if (!rules && !formSchemaExt) {
    return ruleMap
  }

  for (const { field: fieldName = '', rules: fieldRules = [] } of rules) {
    ruleMap.set(fieldName, fieldRules)
  }
  formSchemaExt.forEach(({ field = '', rules = [], type = FormSchemaTypeEnums.REPLACE }) => {
    if (ruleMap.has(field)) {
      if (type === 1) {
        ruleMap.set(field, rules)
      }
      else {
        const mergedRules = [...(ruleMap.get(field) || []), ...rules]
        ruleMap.set(field, mergedRules)
      }
    }
    else {
      ruleMap.set(field, rules)
    }
  })

  return ruleMap
}

export function getValidateRules(axiosRequestConfig: AxiosRequestConfig, formSchemaExt: Partial<FormSchemaExt>[]) {
  return new Promise<any[]>((resolve, reject) => {
    (async () => {
      const requestOptions = {
        url: `/form/validator${axiosRequestConfig.url}`,
        method: axiosRequestConfig.method,
      }
      try {
        const cacheKey = `${requestOptions.url}${requestOptions.method}`
        if (cacheMap.has(cacheKey)) {
          return resolve(cacheMap.get(cacheKey))
        }
        requestOptions.url = `/form/validator${requestOptions.url}`
        const res = await defHttp.request({ ...requestOptions })
        if (res) {
          const rules = generateValidationRules(res)
          const mergedRules: Map<string, any[]> = mergeRules(rules, formSchemaExt)
          const validationRules: any[] = []
          for (const [field, rules] of mergedRules) {
            validationRules.push({
              field,
              rules,
            })
          }
          cacheMap.set(cacheKey, validationRules)
          return resolve(validationRules)
        }
      }
      catch (error) {
      // 在这里处理错误，例如打印错误信息或执行其他逻辑
        console.error('Error:', error)
        return resolve([])
      }
    })()
  })
}

export function getValidateRuleObj(axiosRequestConfig: AxiosRequestConfig, formSchemaExt: Partial<FormSchemaExt>[]) {
  return new Promise<Record<string, any>>((resolve, reject) => {
    (async () => {
      const requestOptions = {
        url: `/form/validator${axiosRequestConfig.url}`,
        method: axiosRequestConfig.method,
      }

      try {
        const cacheKey = `${requestOptions.url}${requestOptions.method}`
        if (cacheObjMap.has(cacheKey)) {
          return resolve(cacheObjMap.get(cacheKey))
        }

        const res = await defHttp.request<any[]>({ ...requestOptions })
        if (res) {
          const rules: any[] = generateValidationRules(res)
          const mergedRules: Map<string, any[]> = mergeRules(rules, formSchemaExt)
          const resultMap: Record<string, any> = {}
          for (const [field, rules] of mergedRules) {
            resultMap[field] = rules
          }
          cacheObjMap.set(cacheKey, resultMap)
          return resolve(resultMap)
        }
      }
      catch (error) {
      // 在这里处理错误，例如打印错误信息或执行其他逻辑
        console.error('Error:', error)
      }

      return resolve([])
    })()
  })
}
