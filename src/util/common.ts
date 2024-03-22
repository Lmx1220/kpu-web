import { isString } from '@/util/is'
import type { DictEnum, EnumEnum } from '@/enums/commonEnum.ts'
import { asyncFindDictList, asyncFindEnumList } from '@/api/modules/common/general.ts'

export function enumAllComponentProps(type: EnumEnum | string,
  extendFirst = true,
  excludes?: string | string[]) {
  return enumComponentProps(
    type,
    extendFirst,
    { label: '所有', text: '所有', value: null },
    excludes,
  )
}

export function enumComponentProps(type: EnumEnum | string,
  extendFirst = true,
  extend?: any,
  excludes?: string | string[]) {
  if (excludes && isString(excludes)) {
    excludes = [excludes]
  }
  return {
    api: asyncFindEnumList,
    params: { type, extendFirst, extend, excludes },
    resultField: 'data',
    showSearch: true,
    filterOption: (input: string, option: any) => {
      return option.label.toUpperCase().includes(input.toUpperCase())
    },
  }
}

export function dictAllComponentProps(type: DictEnum | string,
  extendFirst = true,
  excludes?: string | string[]) {
  return dictComponentProps(
    type,
    extendFirst,
    { label: '所有', text: '所有', value: null },
    excludes,
  )
}
export function dictComponentProps(type: DictEnum | string,
  extendFirst = true,
  extend?: any,
  excludes?: string | string[]) {
  if (excludes && isString(excludes)) {
    excludes = [excludes]
  }
  return {
    api: asyncFindDictList,
    params: { type, extend, extendFirst, excludes },
    resultField: 'data',
    showSearch: true,
    filterOption: (input: string, option: any) => {
      return option.label.toUpperCase().includes(input.toUpperCase())
    },
  }
}
