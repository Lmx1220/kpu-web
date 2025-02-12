import type { Rule } from 'ant-design-vue/es/form'
import type { AxiosRequestConfig } from 'axios'
import type { LogType } from 'consola'
import { requestClient } from '@/api'
import dateUtil from '@/utils/dayjs'
// import { ServicePrefixEnum } from '@/enum/common'
import { isBoolean, isObject } from '@/utils/is'
import { createConsola } from 'consola'
import { cloneDeep } from 'lodash-es'
import { greenBright } from 'yoctocolors'

const logOptions = {
  enabled: true,
  supportLevel: 1,
}

// 用于设置控制台颜色样式的函数
function formatPrefix(message: any, level: number = 1) {
  // 如果启用日志并且支持级别大于等于指定级别，则进行着色处理
  return logOptions.enabled && logOptions.supportLevel >= level ? greenBright(message) : String(message)
}
const logger = createConsola()
const moduleName = 'lamp-web-pro-soybean'

//
export function logMessage(level: LogType, message: any, shouldLog: boolean = true) {
  if (shouldLog) {
    logger[level](`${formatPrefix(`[${moduleName}]:`)} `, message)
  }
}

export function logWithArgs(level: LogType, message: any, ...args: any[]) {
  logger[level](message, ...args)
}

export interface FieldValidatorDesc {
  name: string
  field: string
  fieldType: string
  constraints: ConstraintInfo[]
}

export interface ConstraintInfo {
  type: string
  attrs: any
}
export enum RuleType {
  append,
  cover,
  ignore,
}
// interface RuleItemExt extends RuleItem {}
export interface FormSchema {
  [field: string]: Rule[]
  // type?: RuleType;
}
export interface FormRulesExt {
  type: RuleType
  rules: Rule[]
}

export interface FormSchemaExt {
  // 类型 append：追加  cover：覆盖
  [field: string]: FormRulesExt | Rule[]
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
 *
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
    let result
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
interface FieldTypeList {
  match: (type: string) => boolean
  callback: (params: {
    fieldRules: Rule[]
    attrs: any
    fieldType: string
    trigger?: 'blur' | 'change' | ('blur' | 'change')[]
  }) => void
}
const fieldTypeList: FieldTypeList[] = [
  {
    match: type => type === 'RegEx',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          if (!value) {
            return Promise.resolve()
          }
          const regexp = new RegExp(attrs.regexp)
          return regexp.test(value) ? Promise.resolve() : Promise.reject(getMessage(attrs))
        },
      })
    },
  },
  {
    match: type => type === 'Max',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return Number.parseInt(value, 10) > attrs.value ? Promise.reject(getMessage(attrs)) : Promise.resolve()
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'Min',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return Number.parseInt(value, 10) < attrs.value ? Promise.reject(getMessage(attrs)) : Promise.resolve()
        },
      })
    },
  },
  {
    match: type => type === 'DecimalMax',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return Number.parseFloat(value) > attrs.value ? Promise.reject(getMessage(attrs)) : Promise.resolve()
        },
      })
    },
  },
  {
    match: type => type === 'DecimalMin',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return Number.parseFloat(value) < attrs.value ? Promise.reject(getMessage(attrs)) : Promise.resolve()
        },
      })
    },
  },
  {
    match: type => type === 'Null',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return value && value.length !== 0 ? Promise.reject(getMessage(attrs)) : Promise.resolve()
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'NotNull',
    callback: ({ fieldRules, attrs, fieldType, trigger }) => {
      const type = ruleTypeMap.get(fieldType) || 'string'
      fieldRules.push({
        required: true,
        type,
        trigger,
        whitespace: true,
        transform(val: any) {
          if (isBoolean(val)) {
            return val
          }

          const trimmedVal = val != null ? val.toString().trim() : ''
          return trimmedVal !== '' ? String(trimmedVal) : val
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'Range',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        max: attrs.max,
        min: attrs.min,
        trigger,
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'AssertTrue',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return value === 'true' || value === true ? Promise.resolve() : Promise.reject(getMessage(attrs))
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'AssertFalse',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return value === 'false' || value === false ? Promise.resolve() : Promise.reject(getMessage(attrs))
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'Negative',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          if (value) {
            if (Number(value) < 0) {
              return Promise.resolve()
            }
            return Promise.reject(getMessage(attrs))
          }
          return Promise.resolve()
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'NegativeOrZero',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          if (value) {
            if (Number(value) <= 0) {
              return Promise.resolve()
            }
            return Promise.reject(getMessage(attrs))
          }
          return Promise.resolve()
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'Positive',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          if (value) {
            if (Number(value) > 0) {
              return Promise.resolve()
            }
            return Promise.reject(getMessage(attrs))
          }
          return Promise.resolve()
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'PositiveOrZero',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          if (value) {
            if (Number(value) >= 0) {
              return Promise.resolve()
            }
            return Promise.reject(getMessage(attrs))
          }
          return Promise.resolve()
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'Past',
    callback: ({ fieldRules, attrs, fieldType, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return compareDate2Now(value, fieldType, 'Past') ? Promise.resolve() : Promise.reject(getMessage(attrs))
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'PastOrPresent',
    callback: ({ fieldRules, attrs, fieldType, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return compareDate2Now(value, fieldType, 'PastOrPresent')
            ? Promise.resolve()
            : Promise.reject(getMessage(attrs))
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'Digits',
    callback: ({ fieldRules, attrs, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          const val = Number(value)
          if (/.*\..*/.test(val.toString())) {
            const l = val.toString().split('.')[0]
            const s = val.toString().split('.')[1]
            return l.length > attrs.integer || s.length > attrs.fraction
              ? Promise.reject(getMessage(attrs))
              : Promise.resolve()
          }
          return val.toString().length > attrs.integer ? Promise.reject(getMessage(attrs)) : Promise.resolve()
        },
      })
    },
  },
  {
    match: type => type === 'Future',
    callback: ({ fieldRules, attrs, fieldType, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return compareDate2Now(value, fieldType, 'Future') ? Promise.resolve() : Promise.reject(getMessage(attrs))
        },
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'FutureOrPresent',
    callback: ({ fieldRules, attrs, fieldType, trigger }) => {
      fieldRules.push({
        type: 'method',
        trigger,
        validator(_rule, value) {
          return compareDate2Now(value, fieldType, 'FutureOrPresent')
            ? Promise.resolve()
            : Promise.reject(getMessage(attrs))
        },
        message: getMessage(attrs),
      })
    },
  },
]
/**
 * 解析字段的校验规则
 *
 * @param fieldRules 字段约束
 * @param constraints 约束
 * @param fieldType 字段类型
 * @param trigger 触发类型
 */

function decodeRules(
  fieldRules: Rule[],
  constraints: ConstraintInfo[],
  fieldType: string,
  trigger?: 'blur' | 'change' | ('blur' | 'change')[],
) {
  constraints
  && constraints.forEach(({ type, attrs }) => {
    fieldTypeList.some(({ match, callback }) => {
      if (match(type)) {
        // 如果成立，则调用对应的 'callback' 函数
        callback({
          fieldRules,
          attrs,
          fieldType,
          trigger,
        })
        return true // 返回 true 表示找到了匹配项，终止循环
      }
      return false // 继续检查下一个元素
    })
  })
}

/**
 * 解析所有字段名
 *
 * @param data 后端返回的值
 */
const numberType = ['BigDecimal', 'BigInteger', 'Integer', 'Long', 'Float', 'Double', 'Short']
function transformationRules(data: FieldValidatorDesc[], trigger?: 'blur' | 'change' | ('blur' | 'change')[]): FormSchema {
  const validateRules: FormSchema = {}
  data.forEach(({ name, field, fieldType, constraints }) => {
    const rules: Rule[] = []

    if (numberType.includes(fieldType)) {
      rules.push({
        type: 'number',
        trigger,
        transform(val: any) {
          return val != null && val?.toString().trim().length > 0 ? Number(val) : val
        },
        message: `${name}必须是数字`,
      })
    }
    else if (fieldType === 'Boolean') {
      rules.push({
        type: 'boolean',
        trigger,
        transform(val: any) {
          return val != null && val?.toString().trim().length > 0 ? Boolean(val) : val
        },
        message: `${name}必须是布尔类型`,
      })
    }
    else if (fieldType === 'Date') {
      // rules.push({
      //   type: 'date',
      //   message: `${field}必须是日期类型`,
      // });
    }
    decodeRules(rules, constraints, fieldType, trigger)
    validateRules[field] = rules
  })
  return validateRules
}

function enhanceCustomRules(
  formSchemaRules = {} as FormSchema,
  customFormSchemaRules = {} as FormSchemaExt,
): FormSchema {
  if (!formSchemaRules && !customFormSchemaRules) {
    return {}
  }
  const newFormSchemaRules = cloneDeep(formSchemaRules)
  Object.entries(customFormSchemaRules).forEach(([field, rules]) => {
    if (formSchemaRules[field]) {
      if (isObject(rules)) {
        const rule: FormRulesExt = rules as FormRulesExt
        if (rule.type === RuleType.cover) {
          newFormSchemaRules[field] = rule.rules
        }
        else if (rule.type === RuleType.append) {
          const rule1 = rule.rules
          const oldRules = formSchemaRules[field] || []
          newFormSchemaRules[field] = [...oldRules, ...rule1]
        }
        else {
          newFormSchemaRules[field] = formSchemaRules[field]
        }
      }
      else {
        const rule = rules
        const oldRules = formSchemaRules[field] || []
        newFormSchemaRules[field] = [...oldRules, ...rule]
      }
    }
    else if (isObject(rules)) {
      newFormSchemaRules[field] = (rules as FormRulesExt).rules
    }
    else {
      newFormSchemaRules[field] = rules
    }
  })

  return newFormSchemaRules
}

const ruleMap = new Map()
const ruleObjMap = new Map()

function modeForm(mode: string, rules: FormSchema) {
  return {
    [`${mode}Form`]: {
      rules,
    },
  }
}
/**
 * 从后端获取某个接口基于 Hibernate Validator 注解生成的参数校验规则
 *
 * @param Api url和method
 * @param customRules 自定义规则
 */
export async function getValidateRules(Api: AxiosRequestConfig, customRules?: FormSchemaExt): Promise<FormSchema> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, _reject) => {
    const formValidateApi = { url: '', method: Api.method }
    // for (const sp in ServicePrefixEnum) {
    //   // eslint-disable-next-line ts/ban-ts-comment
    //   // @ts-expect-error
    //   if (Api.url.startsWith(ServicePrefixEnum[sp])) {
    //     // eslint-disable-next-line ts/ban-ts-comment
    //     // @ts-expect-error
    //     formValidateApi.url = Api.url.replace(ServicePrefixEnum[sp], `${ServicePrefixEnum[sp]}/form/validator`)
    //   }
    // }
    try {
      if (!formValidateApi.url) {
        // window.$message?.error('ServicePrefixEnum枚举类未正确配置！')
        resolve({})
        return
      }

      const key = formValidateApi.url + formValidateApi.method
      if (ruleMap.has(key)) {
        resolve(ruleMap.get(key))
        return
      }

      const res = await requestClient.request2<FieldValidatorDesc[]>({ ...formValidateApi })
      if (res) {
        const formSchemaRules = transformationRules(res)
        const newRules = enhanceCustomRules(formSchemaRules, customRules)

        ruleMap.set(key, newRules)
        resolve(newRules)
        return
      }
    }
    catch {
      // console.error(error);
      // window.$message?.error('获取表单校验异常');
    }
    resolve({})
  })
}

// Api: AxiosRequestConfig,
//   customRules?: Partial<FormSchemaExt>[]
export async function getValidateRulesByKpu(params: any): Promise<FormSchema | { [p: string]: { rules: FormSchema } }> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, _reject) => {
    const { Api, mode, customRules, trigger } = params
    const formValidateApi = { url: '', method: Api.method }
    // for (const sp in ServicePrefixEnum) {
    //   if (Api.url.startsWith(ServicePrefixEnum[sp])) {
    //     formValidateApi.url = Api.url.replace(ServicePrefixEnum[sp], `${ServicePrefixEnum[sp]}/form/validator`);
    //   }
    // }
    formValidateApi.url = `/form/validator${Api.url}`
    try {
      if (!formValidateApi.url) {
        // window.$message?.error('ServicePrefixEnum枚举类未正确配置！')
        resolve({})
        return
      }

      const key = formValidateApi.url + formValidateApi.method
      if (ruleObjMap.has(key)) {
        resolve(ruleObjMap.get(key))
        return
      }

      const res = await requestClient.request2<FieldValidatorDesc[]>({ ...formValidateApi })
      if (res) {
        const formSchemaRules = transformationRules(res, trigger)
        const newRules = enhanceCustomRules(formSchemaRules, customRules)

        if (mode) {
          const p = modeForm(mode, newRules)
          ruleObjMap.set(key, p)
          resolve(p)
          return
        }

        ruleObjMap.set(key, newRules)
        resolve(newRules)
        return
      }
    }
    catch (error) {
      logger.error(error)
      // window.$message?.error('获取表单校验异常')
    }
    resolve({})
  })
}
// const d = {
//   '@ant-design/icons-vue': '7.0.1',
//   '@better-scroll/core': '2.5.1',
//   '@codemirror/lang-html': '6.4.9',
//   '@codemirror/lang-java': '6.0.1',
//   '@codemirror/lang-javascript': '6.2.2',
//   '@codemirror/lang-json': '6.0.1',
//   '@codemirror/lang-markdown': '6.2.5',
//   '@codemirror/lang-sql': '6.6.4',
//   '@codemirror/lang-xml': '6.1.0',
//   '@codemirror/theme-one-dark': '6.1.2',
//   '@fast-crud/fast-crud': '1.21.0',
//   '@fast-crud/fast-extends': '1.21.0',
//   '@fast-crud/ui-interface': '1.21.0',
//   '@fast-crud/ui-naive': '1.21.0',
//   '@iconify/vue': '4.1.2',
//   '@purge-icons/generated': '^0.10.0',
//   '@sa/axios': 'workspace:*',
//   '@sa/color': 'workspace:*',
//   '@sa/hooks': 'workspace:*',
//   '@sa/materials': 'workspace:*',
//   '@sa/utils': 'workspace:*',
//   '@vueuse/core': '10.10.0',
//   clipboard: '2.0.11',
//   'cross-env': '7.0.3',
//   dayjs: '1.11.11',
//   echarts: '5.5.0',
//   'highlight.js': '11.9.0',
//   'js-base64': '3.7.7',
//   'lodash-es': '4.17.21',
//   'naive-ui': '2.38.2',
//   nprogress: '0.2.0',
//   pinia: '2.1.7',
//   'resize-observer-polyfill': '1.5.1',
//   'tailwind-merge': '^2.3.0',
//   vue: '3.4.27',
//   'vue-codemirror': '6.1.1',
//   'vue-draggable-plus': '0.5.0',
//   'vue-i18n': '9.13.1',
//   'vue-json-pretty': '2.4.0',
//   'vue-router': '4.3.2',
//   'vue3-blocks-tree': '0.6.1',
//   'vxe-pc-ui': '4.0.0',
//   'vxe-table': '4.7.7'
// };
