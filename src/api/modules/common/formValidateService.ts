import type { AxiosRequestConfig } from 'axios'
import type { VxeTableDefines, VxeTablePropTypes } from 'vxe-table'
import { ElMessage } from 'element-plus'
import type { ConstraintInfo, FieldValidatorDesc } from './model/formValidateModel'
import defHttp from '@/api'
import dateUtil from '@/util/dayjs'

export enum RuleType {
  append,
  cover,
}

export interface FormSchemaExt {
  // Field name
  field: string
  rules?: any[]
  // 类型 append：追加  cover：覆盖
  type?: RuleType
}

const ruleTypeMap = new Map()
ruleTypeMap.set('String', 'string')
ruleTypeMap.set('Integer', 'string')
ruleTypeMap.set('Boolean', 'boolean')
ruleTypeMap.set('Float', 'string')
ruleTypeMap.set('Array', 'array')
ruleTypeMap.set('Date', 'date')
ruleTypeMap.set('DateTime', 'date')
ruleTypeMap.set('Time', 'date')

/**
 * 时间与当前时间进行比较， 不存在的情况默认都是比较成功 返回true
 * @param dateStr 待比较日期
 * @param _timeType 时间类型
 * @param compareType 比较类型
 */
function compareDate2Now(dateStr: string, _timeType = 'Date', compareType = 'Past') {
  if (dateStr) {
    const now = dateUtil()
    if (compareType === 'Past') {
      return now.isAfter(dateUtil(dateStr))
    }
    else if (compareType === 'PastOrPresent') {
      return now.isSameOrAfter(dateUtil(dateStr))
    }
    else if (compareType === 'Future') {
      return now.isBefore(dateUtil(dateStr))
    }
    else if (compareType === 'FutureOrPresent') {
      return now.isSameOrBefore(dateUtil(dateStr))
    }
  }
  return true
}

function getMessage(attrs: Recordable) {
  if (attrs && attrs.message) {
    // eslint-disable-next-line regexp/no-unused-capturing-group
    const reg = /(\{([a-z0-9]*)\})/gi
    let result: any
    let message = attrs.message
    // eslint-disable-next-line no-cond-assign
    while ((result = reg.exec(attrs.message)) !== null) {
      const place = result[0]
      const field = result[2]
      message = message.replaceAll(place, attrs[field])
    }
    return message
  }
  return '输入不符合规则'
}

/**
 * 解析字段的校验规则
 * @param fieldRules 字段约束
 * @param constraints 约束
 * @param fieldType 字段类型
 */
function decodeRules(fieldRules: any[], constraints: ConstraintInfo[], fieldType: string) {
  constraints
  && constraints.forEach(({ type, attrs }) => {
    switch (type) {
      case 'RegEx':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (!value) {
              return Promise.resolve()
            }
            const regexp = new RegExp(attrs.regexp)
            if (!regexp.test(value)) {
              return Promise.reject(attrs.message)
            }
            else {
              return Promise.resolve()
            }
          },
          message: attrs.message,
        })
        break
      case 'Max':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (Number.parseInt(value) > attrs.value) {
              return Promise.reject(attrs.message)
            }
            else {
              return Promise.resolve()
            }
          },
          message: getMessage(attrs),
        })
        break
      case 'Min':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (Number.parseInt(value) < attrs.value) {
              return Promise.reject(attrs.message)
            }
            else {
              return Promise.resolve()
            }
          },
          message: getMessage(attrs),
        })
        break
      case 'DecimalMax':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (Number.parseFloat(value) > attrs.value) {
              return Promise.reject(attrs.message)
            }
            else {
              return Promise.resolve()
            }
          },
          message: attrs.message,
        })
        break
      case 'DecimalMin':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (Number.parseFloat(value) < attrs.value) {
              return Promise.reject(attrs.message)
            }
            else {
              return Promise.resolve()
            }
          },
          message: attrs.message,
        })
        break
      case 'Null':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (value.length !== 0) {
              return Promise.reject(attrs.message)
            }
            else {
              return Promise.resolve()
            }
          },
          message: attrs.message,
        })
        break
      case 'NotNull':
        // eslint-disable-next-line no-case-declarations
        const type = ruleTypeMap.get(fieldType) || 'string'
        fieldRules.push({
          required: true,
          type,
          whitespace: true,
          message: attrs.message,
        })
        break
      case 'Range':
        fieldRules.push({
          max: attrs.max,
          min: attrs.min,
          message: getMessage(attrs),
        })
        break
      case 'AssertTrue':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (value === 'true' || value === true) {
              return Promise.resolve()
            }
            else {
              return Promise.reject(attrs.message)
            }
          },
          message: attrs.message,
        })
        break
      case 'AssertFalse':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (value === 'false' || value === false) {
              return Promise.resolve()
            }
            else {
              return Promise.reject(attrs.message)
            }
          },
          message: attrs.message,
        })
        break
      case 'Past':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (compareDate2Now(value, fieldType, 'Past')) {
              return Promise.resolve()
            }
            else {
              return Promise.reject(attrs.message)
            }
          },
          message: attrs.message,
        })
        break
      case 'PastOrPresent':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (compareDate2Now(value, fieldType, 'PastOrPresent')) {
              return Promise.resolve()
            }
            else {
              return Promise.reject(attrs.message)
            }
          },
          message: attrs.message,
        })
        break
      case 'Future':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (compareDate2Now(value, fieldType, 'Future')) {
              return Promise.resolve()
            }
            else {
              return Promise.reject(attrs.message)
            }
          },
          message: attrs.message,
        })
        break
      case 'FutureOrPresent':
        fieldRules.push({
          type: 'method',
          validator(_rule: any, value: any) {
            if (compareDate2Now(value, fieldType, 'FutureOrPresent')) {
              return Promise.resolve()
            }
            else {
              return Promise.reject(attrs.message)
            }
          },
          message: attrs.message,
        })
        break
      default:
        break
    }
  })
}

/**
 * 解析所有字段名
 *
 * @param data 后端返回的值
 */
function transformationRules(data: FieldValidatorDesc[]): Partial<any>[] {
  const validateRules: any[] = []
  data.forEach(({ field, fieldType, constraints }) => {
    const rules: any[] = []
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
    else if (fieldType === 'Date') {
      // rules.push({
      //   type: 'date',
      //   message: `${field}必须是日期类型`,
      // });
    }
    decodeRules(rules, constraints, fieldType)

    validateRules.push({ field, rules } as any)
  })
  return validateRules
}

function enhanceCustomRules(
  formSchemaRules = [] as Partial<any>[],
  customFormSchemaRules = [] as Partial<FormSchemaExt>[],
): Map<string, any[]> {
  if (!formSchemaRules && !customFormSchemaRules) {
    return {} as Map<string, any[]>
  }
  const map = new Map<string, any[]>()
  formSchemaRules.forEach(({ field = '', rules = [] }) => {
    map.set(field, rules)
  })

  customFormSchemaRules.forEach(({ field = '', rules = [], type = RuleType.cover }) => {
    if (map.has(field)) {
      if (type === RuleType.cover) {
        map.set(field, rules)
      }
      else {
        const oldRules = map.get(field) || []
        const newRules = [...oldRules[Symbol.iterator](), ...rules[Symbol.iterator]()]
        map.set(field, newRules)
      }
    }
    else {
      map.set(field, rules)
    }
  })

  return map
  // const newRules: any[] = [];
  // for (const [field, rules] of map) {
  //   newRules.push({ field, rules } as any);
  // }
  // return newRules;
}

const ruleMap = new Map()
const ruleObjMap = new Map()

/**
 * 从后端获取某个接口基于 Hibernate Validator 注解生成的参数校验规则
 * @param Api url和method
 * @param customRules 自定义规则
 */
export async function getValidateRules(Api: AxiosRequestConfig, customRules?: Partial<FormSchemaExt>[]): Promise<unknown> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, _reject) => {
    const formValidateApi = { url: '', method: Api.method }
    // for (const sp in ServicePrefixEnum) {
    //   if (Api.url?.startsWith(ServicePrefixEnum[sp])) {
    //     formValidateApi.url = Api.url.replace(
    //       ServicePrefixEnum[sp],
    //       `${ServicePrefixEnum[sp]}/form/validator`,
    //     )
    //   }
    // }
    formValidateApi.url = `/form/validator${formValidateApi.url}`
    try {
      if (!formValidateApi.url) {
        ElMessage.error('ServicePrefixEnum枚举类未正确配置！')
        return resolve([])
      }

      const key = formValidateApi.url + formValidateApi.method
      if (ruleMap.has(key)) {
        return resolve(ruleMap.get(key))
      }

      const res = await defHttp.request<FieldValidatorDesc[]>({ ...formValidateApi })
      if (res) {
        const formSchemaRules = transformationRules(res)
        const map = enhanceCustomRules(formSchemaRules, customRules)

        const newRules: any[] = []
        for (const [field, rules] of map) {
          newRules.push({ field, rules } as any)
        }

        ruleMap.set(key, newRules)
        return resolve(newRules)
      }
    }
    catch (error) {}
    return resolve([])
  })
}

export async function getValidateRuleObj(Api: AxiosRequestConfig, customRules?: Partial<FormSchemaExt>[]): Promise<VxeTablePropTypes.EditRules> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, _reject) => {
    const formValidateApi = { url: '', method: Api.method }
    // for (const sp in ServicePrefixEnum) {
    //   if (Api.url?.startsWith(ServicePrefixEnum[sp])) {
    //     formValidateApi.url = Api.url.replace(
    //       ServicePrefixEnum[sp],
    //       `${ServicePrefixEnum[sp]}/form/validator`,
    //     )
    //   }
    // }

    formValidateApi.url = `/form/validator${Api.url}`
    try {
      if (!formValidateApi.url) {
        ElMessage.error('ServicePrefixEnum枚举类未正确配置！')
        return resolve({})
      }

      const key = formValidateApi.url + formValidateApi.method
      if (ruleObjMap.has(key)) {
        return resolve(ruleObjMap.get(key))
      }

      const res = await defHttp.request<FieldValidatorDesc[]>({ ...formValidateApi })
      if (res) {
        const formSchemaRules = transformationRules(res)
        const map = enhanceCustomRules(formSchemaRules, customRules)

        const newRules: VxeTablePropTypes.EditRules = {}
        for (const [field, rules] of map) {
          newRules[field] = rules as VxeTableDefines.ValidatorRule[]
        }

        ruleObjMap.set(key, newRules)
        return resolve(newRules)
      }
    }
    catch (error) {}
    return resolve({})
  })
}
