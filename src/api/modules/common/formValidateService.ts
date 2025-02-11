import type { AxiosRequestConfig } from 'axios'
import type { ZodTypeAny } from 'zod'
import type { ConstraintInfo, FieldValidatorDesc } from './model/formValidateModel'
import { requestClient } from '@/api'
import { isNull, isUndefined } from '@/utils'
import dateUtil from '@/utils/dayjs'
import { split } from 'lodash-es'
import { toast } from 'vue-sonner'
import z from 'zod'

export enum RuleType {
  and,
  or,
  cover,
}

export interface FormSchemaExt {
  // Field name
  fieldName: string
  // field: string
  rules: ZodTypeAny
  // 类型 append：追加  cover：覆盖
  type?: RuleType
  ruleType?: RuleType
}

const numberType = ['BigDecimal', 'BigInteger', 'Integer', 'Long', 'Float', 'Double', 'Short']
const ruleTypeMap = new Map()
ruleTypeMap.set('String', 'string')
ruleTypeMap.set('Integer', 'string')
ruleTypeMap.set('Boolean', 'boolean')
ruleTypeMap.set('Float', 'string')
ruleTypeMap.set('Array', 'array')
ruleTypeMap.set('Date', 'date')
ruleTypeMap.set('DateTime', 'date')
ruleTypeMap.set('Time', 'date')

function findNotNullConstraint(constraints: ConstraintInfo[]) {
  for (const constraint of constraints) {
    if (constraint.type === 'NotNull') {
      return constraint
    }
  }
  return null
}

function compareDate2Now(dateStr: string, _timeType = 'Date', compareType = 'Past') {
  if (!dateStr) {
    return true // 如果没有传入日期，默认返回 true
  }

  let now = dateUtil()
  if (_timeType === 'Date') {
    now = now.startOf('day')
  }

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

function getMessage(attrs: Recordable) {
  if (!attrs || !attrs.message) {
    return
  }

  const reg = /(\{([a-z0-9]*)\})/gi
  let formattedMessage = attrs.message
  let match = reg.exec(attrs.message)

  while (match !== null) {
    const placeholder = match[0]
    const key = match[1]
    const replacement = attrs[key] ?? ''
    formattedMessage = formattedMessage.replaceAll(placeholder, replacement)

    match = reg.exec(attrs.message) // 在循环底部重新匹配
  }

  return formattedMessage
}

const fieldTypeList: {
  match: (type: string) => boolean
  callback: (params: { rules: any, attrs: any, fieldType: string, type: string }) => ZodTypeAny
}[] = [
  {
    match: type => type === 'Null',
    callback: ({ rules, attrs }) => {
      return rules.refine((val: any) => isNull(val) || isUndefined(val) || val.length === 0, {
        message: getMessage(attrs),
      })
    },
  },
  {
    match: type => type === 'Range',
    callback: ({ rules, attrs }) => {
      if (attrs.min) {
        rules = rules.min(attrs.min, { message: getMessage(attrs) })
      }
      if (!isUndefined(attrs.max) && !isNull(attrs.max)) {
        rules = rules.max(attrs.max, { message: getMessage(attrs) })
      }
      return rules
    },
  },
  {
    match: type => type === 'RegEx',
    callback: ({ rules, attrs }) =>
      attrs.regexp ? rules.regex(new RegExp(attrs.regexp), { message: getMessage(attrs) }) : rules,
  },
  {
    match: type => ['DecimalMax', 'Max'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.max(attrs.value, { message: getMessage(attrs) }),
  },
  {
    match: type => ['DecimalMin', 'Min'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.min(attrs.value, { message: getMessage(attrs) }),
  },
  {
    match: type => ['AssertTrue'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.refine((val: any) => val === 'true' || val === true, { message: getMessage(attrs) }),
  },
  {
    match: type => ['AssertFalse'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.refine((val: any) => val === 'false' || val === false, { message: getMessage(attrs) }),
  },
  {
    match: type => ['Digits'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.refine(
        (val: any) => {
          const num = Number(val)
          if (/.*\..*/.test(num.toString())) {
            const [integerPart, fractionPart] = split(num.toString(), '.')
            const validInteger = integerPart && integerPart.length <= attrs.integer
            const validFraction = fractionPart && fractionPart.length <= attrs.fraction
            return validInteger && validFraction
          }
          return num.toString().length <= attrs.integer
        },
        { message: getMessage(attrs) },
      ).nullish(),
  },
  {
    match: type => ['Negative'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.negative({ message: getMessage(attrs) }).nullish(),
  },
  {
    match: type => ['NegativeOrZero'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.nonpositive({ message: getMessage(attrs) }).nullish(),
  },
  {
    match: type => ['Positive'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.positive({ message: getMessage(attrs) }).nullish(),
  },
  {
    match: type => ['PositiveOrZero'].includes(type),
    callback: ({ rules, attrs }) =>
      rules.nonnegative({ message: getMessage(attrs) }).nullish(),
  },
  {
    match: type => ['Future', 'FutureOrPresent', 'Past', 'PastOrPresent'].includes(type),
    callback: ({ rules, attrs, fieldType, type }) =>
      rules.refine((val: any) => compareDate2Now(val, fieldType, type), { message: getMessage(attrs) }).nullish(),
  },

]

/**
 * 解析所有字段名
 *
 * @param data 后端返回的值
 */
function transformationRules(data: FieldValidatorDesc[]): FormSchemaExt[] {
  const validateRules: any[] = []
  data.forEach(({ field, fieldType, constraints }) => {
    if (!constraints) {
      return
    }
    let rules: ZodTypeAny
    const constraint = findNotNullConstraint(constraints)
    if (numberType.includes(fieldType)) {
      rules = constraint == null
        ? z.number({
            required_error: '此项必填',
            invalid_type_error: '数据类型错误',
          })
        : z.number({
            required_error: getMessage(constraint?.attrs),
            invalid_type_error: '数据类型错误',
          })
    }
    else if (fieldType === 'Boolean') {
      rules = constraint == null
        ? z.boolean({
            required_error: '此项必填',
            invalid_type_error: '数据类型错误',
          })
        : z.boolean({
            required_error: getMessage(constraint?.attrs),
            invalid_type_error: '数据类型错误',
          })
    }
    else {
      rules = constraint == null
        ? z.string({
            required_error: '此项必填',
          })
        : z.string({
            required_error: getMessage(constraint?.attrs),
          }).nonempty(getMessage(constraint?.attrs))
    }

    constraints.forEach(({ type, attrs }) => {
      fieldTypeList.some(({ match, callback }) => {
        if (match(type)) {
          rules = callback({
            rules,
            attrs,
            fieldType,
            type,
          })
          return true
        }
        return false
      })
    })
    if (constraint === null) {
      rules = rules.nullish()
    }
    validateRules.push({
      fieldName: field,
      rules,
    })
  })
  return validateRules
}

function enhanceCustomRules(
  formSchemaRules = [] as FormSchemaExt[],
  customFormSchemaRules = [] as FormSchemaExt[],
): FormSchemaExt[] {
  if (!customFormSchemaRules) {
    return formSchemaRules
  }
  const map = new Map<string, any>()
  customFormSchemaRules.forEach((rules) => {
    map.set(rules.fieldName, rules)
  })

  formSchemaRules.forEach((data) => {
    const newR = map.get(data.fieldName)
    if (newR) {
      switch (newR.ruleType) {
        case RuleType.and: {
          data.rules = data.rules ? z.intersection(data.rules, newR.rules) : (newR as ZodTypeAny)
          break
        }
        case RuleType.or: {
          data.rules = data.rules ? z.union([data.rules, newR.rules]) : (newR as ZodTypeAny)
          break
        }
        default: {
          data.rules = newR.rules
          break
        }
      }
    }
  })
  return formSchemaRules
}

// const ruleMap = new Map()
const ruleObjMap = new Map()

/**
 * 从后端获取某个接口基于 Hibernate Validator 注解生成的参数校验规则
 */
export async function getValidateRuleObj(params: {
  Api: AxiosRequestConfig
  customRules?: FormSchemaExt[]
}): Promise<any> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, _reject) => {
    const { Api, customRules } = params
    const formValidateApi = { url: '', method: Api.method == null ? undefined : Api.method.toLowerCase() }
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
        toast.error('ServicePrefixEnum枚举类未正确配置！', {
          position: 'top-center',
        })
        return resolve({})
      }

      const key = formValidateApi.url + formValidateApi.method
      if (ruleObjMap.has(key)) {
        return resolve(ruleObjMap.get(key))
      }

      const res = await requestClient.request2<FieldValidatorDesc[]>(formValidateApi)
      if (res) {
        const formSchemaRules = transformationRules(res)
        const newRules = enhanceCustomRules(formSchemaRules, customRules)

        ruleObjMap.set(key, newRules)
        return resolve(newRules)
      }
    }
    catch {
    }
    return resolve({})
  })
}
