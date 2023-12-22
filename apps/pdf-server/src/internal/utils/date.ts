import 'dayjs/locale/zh-cn'

import dayjs from 'dayjs'

dayjs.locale('zh-cn')

/** 日期时间格式 */
export const FORMAT_DATE_TIME = 'YYYY-MM-DD HH:mm:ss:SSS'

/** 当前时间 */
export function now() {
  return dayjs().format(FORMAT_DATE_TIME)
}

export { dayjs }
export type { Dayjs } from 'dayjs'
