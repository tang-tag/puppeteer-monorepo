import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { DEFAULT_RETRY_COUNT, JOB_STATUS, JOB_TYPE } from '@/internal/const'
import { now } from '@/internal/utils/date'

export type JobDocument = HydratedDocument<Job>

@Schema()
export class Job {
  /** 任务状态 */
  @Prop({ required: true, enum: JOB_STATUS, default: JOB_STATUS.WAIT })
  status: JOB_STATUS

  /** 任务操作类型 */
  @Prop({ required: true, enum: JOB_TYPE, default: JOB_TYPE.PDF })
  type: JOB_TYPE

  /** 任务目标 url */
  @Prop({ required: true })
  url: string

  /** 已生成文件 url */
  @Prop()
  successUrl?: string

  /** 可重试次数 */
  @Prop({ default: DEFAULT_RETRY_COUNT, min: 0, max: DEFAULT_RETRY_COUNT, type: Number })
  canRetryCount: number

  /** 错误时的错误信息 */
  @Prop()
  errorMsg?: string

  /** 创建任务时间 */
  @Prop({ type: String, default: now })
  createdAt: string

  /** 生成完成时间 */
  @Prop({ type: String })
  generated?: string
}

export const JobSchema = SchemaFactory.createForClass(Job)
