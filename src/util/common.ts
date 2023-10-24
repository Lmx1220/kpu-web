import { timeDelayReqFindDictMapItemListByKey, timeDelayReqFindEnumListByType } from '@/api/modules/common/dict'
import { isString } from '@/util/is'

export function enumComponentProps(type: string, extendFirst = true, extend?: any, excludes?: string | string[]) {
  if (excludes && isString(excludes)) {
    excludes = [excludes]
  }
  return {
    api: timeDelayReqFindEnumListByType,
    params: {
      type,
      extend,
      extendFirst,
      excludes,
    },
    resultField: 'data',
    showSearch: true,
    filterOption: (query: string, option: any) => option.label.toUpperCase().includes(query.toUpperCase()),
  }
}
export function dictComponentProps(type: string, extendFirst = true, extend?: any, excludes?: string | string[]) {
  if (excludes && isString(excludes)) {
    excludes = [excludes]
  }
  return {
    api: timeDelayReqFindDictMapItemListByKey,
    params: {
      type,
      extend,
      extendFirst,
      excludes,
    },
    resultField: 'data',
    showSearch: true,
    filterOption: (query: string, option: any) => option.label.toUpperCase().includes(query.toUpperCase()),
  }
}
