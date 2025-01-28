import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import 'dayjs/locale/zh-cn'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.locale('zh-cn')

export function formatDate(time: number | string, format = 'YYYY-MM-DD') {
  try {
    const date = dayjs(time)
    if (!date.isValid()) {
      throw new Error('Invalid date')
    }
    return date.format(format)
  }
  catch (error) {
    console.error(`Error formatting date: ${error}`)
    return time
  }
}

export function formatDateTime(time: number | string) {
  return formatDate(time, 'YYYY-MM-DD HH:mm:ss')
}

// export function isDate(value: any): value is Date {
//   return value instanceof Date
// }

export function isDayjsObject(value: any): value is dayjs.Dayjs {
  return dayjs.isDayjs(value)
}

export default dayjs
