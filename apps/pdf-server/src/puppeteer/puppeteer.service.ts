import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Job } from '@/schemas'
import { JOB_STATUS, JOB_TYPE } from '@/const'

@Injectable()
export class PuppeteerService {
  constructor(@InjectModel(Job.name) private JobModel: Model<Job>) { }

  /** 创建一个 pdf 打印任务 */
  async createPdfJob(url: string) {
    const createdJob = new this.JobModel({
      _id: '6584154ea3212b5a433d38ff',
      url,
      type: JOB_TYPE.PDF,
    })

    console.warn('[-----> 123')
    // await createdJob.save()

    return createdJob._id
  }
}
