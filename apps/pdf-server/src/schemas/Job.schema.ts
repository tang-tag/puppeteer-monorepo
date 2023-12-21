import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { JOB_STATUS, JOB_TYPE } from '../const'

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
  @Prop({ default: 5, min: 0, max: 5, type: Number })
  canRetryCount: number

  /** 错误时的错误信息 */
  @Prop()
  errorMsg?: string

  /** 创建任务时间 */
  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const JobSchema = SchemaFactory.createForClass(Job)
