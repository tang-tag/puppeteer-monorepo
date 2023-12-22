import { cpus, type } from 'node:os'

/** job 操作状态 */
export enum JOB_STATUS {
  /** 等待处理 */
  'WAIT' = 0,
  /** 处理中 */
  'PROCESSING' = 1,
  /** 处理完成 */
  'SUCCESS' = 2,
  /** 处理失败 */
  'FAIL' = 3,
}

/** job 操作类型 */
export enum JOB_TYPE {
  /** pdf 类型 */
  'PDF',
  /** 截屏 */
  'SCREENSHOT',
}

/** 默认重试次数 */
export const DEFAULT_RETRY_COUNT = 5

/** puppeteer 并发处理数量 */
export const CONCURRENCY_COUNT = cpus().length

/** 本地 chrome 路径  */
export const LOCAL_CHROME_PATH = type() === 'Windows_NT'
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
