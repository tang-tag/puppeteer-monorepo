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
