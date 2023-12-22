import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Job } from '@/schemas'
import { JOB_TYPE } from '@/internal/const'
import { ResException } from '@/exceptions'

@Injectable()
export class PuppeteerService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) { }

  /** 创建一个 pdf 打印任务 */
  async createPdfJob(url: string) {
    try {
      const job = await this.jobModel.create({
        url,
        type: JOB_TYPE.PDF,
      })

      return job._id
    }
    catch (error) {
      return new ResException(error.message || '创建打印任务失败！', HttpStatus.BAD_REQUEST)
    }
  }
}
