import { Injectable } from '@nestjs/common'
import { InjectModel, getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Cluster } from 'puppeteer-cluster'
import puppeteer, { PuppeteerNodeLaunchOptions } from 'puppeteer-core'
import { merge } from 'lodash'
import config from 'config'

import { Job } from '@/schemas'
import { CONCURRENCY_COUNT, JOB_TYPE, LOCAL_CHROME_PATH } from '@/internal/const'
import { now } from '@/internal/utils/date'

/** 创建 puppeteer 集群的参数类型 */
type CratePuppeteerOptions = Parameters<typeof Cluster.launch>[0]

/** puppeteer 消费者服务 */
@Injectable()
export class ConsumerService {
  /** 集群实例 */
  private cluster?: Cluster

  constructor(@InjectModel(Job.name) private JobModel: Model<Job>) {
  }

  /** 任务 puppeteer task 处理 */
  private async registerTasks() {
    // 注册集群任务
    await this.cluster.task(async (jobData) => {
      const data: Job = jobData.data
      const page = jobData.page

      // 跳转对应页
      await page.goto(data.url, { waitUntil: ['domcontentloaded', 'load'] })

      // 输出文件名称
      let fileName = `temp/${now()}`

      // 执行对应操作
      if (data.type === JOB_TYPE.PDF) {
        fileName = [fileName, 'pdf'].join('.')
        await page.pdf({ path: fileName, format: 'A4' })
        return fileName
      }
      else if (data.type === JOB_TYPE.SCREENSHOT) {
        fileName = [fileName, 'png'].join('.')
        await page.screenshot({ path: fileName })
        return fileName
      }
    })
  }

  /** 初始化 prettier 集群 */
  async initCluster() {
    // 初始化集群
    this.cluster = await Cluster.launch(merge({
      // 每个URL一个浏览器(使用隐身页面)。如果一个浏览器实例由于任何原因崩溃，这不会影响其他作业。
      concurrency: Cluster.CONCURRENCY_BROWSER,
      // 最大并发数
      maxConcurrency: CONCURRENCY_COUNT,

      // 使用 puppeteer-core 实例
      puppeteer,

      puppeteerOptions: {
        executablePath: LOCAL_CHROME_PATH,
        args: [
          '-disable-gpu',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '-no-zygote',
          '-no-first-run',
        ],
        headless: 'new',
        defaultViewport: {
          width: 1200,
          height: 768,
        },
      },
    }, config.get('puppeteerOpt')) as CratePuppeteerOptions)

    // 注册集群任务
    await this.registerTasks()

    return this
  }

  /** 开始轮询任务 */
  async startTask() {
  }
}

export const consumerServiceProvider = {
  provide: ConsumerService,
  async useFactory(job) {
    const service = await new ConsumerService(job).initCluster()
    return service
  },
  inject: [getModelToken(Job.name)],
}
