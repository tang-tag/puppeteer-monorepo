import { cpus } from 'node:os'
import { Injectable } from '@nestjs/common'
import { Cluster } from 'puppeteer-cluster'
import puppeteer from 'puppeteer-core'
import type { Page } from 'puppeteer-core'
import { merge } from 'lodash'

/** 创建 puppeteer 集群的参数类型 */
type CratePuppeteerOptions = Parameters<typeof Cluster.launch>[0]

export interface TaskData {
  /** task 类型 */
  type: 'pdf' | 'screenshot'
  /** 目标 url */
  url: string
}

@Injectable()
export class PdfService {
  /** 集群实例 */
  private cluster?: Cluster

  /** 任务 puppeteer task 处理 */
  private async registerTasks() {
    // 注册集群任务
    await this.cluster.task(async (jobData) => {
      const data: TaskData = jobData.data
      const page = jobData.page

      // 跳转对应页
      await page.goto(data.url, { waitUntil: ['domcontentloaded', 'load'] })

      // 执行对应操作
      if (data.type === 'pdf') {
        const fileName = `${Date.now()}-demo.pdf`
        await page.pdf({ path: fileName, format: 'A4' })
        return fileName
      }
      else if (data.type === 'screenshot') {
        const fileName = `${Date.now()}-demo.png`
        await page.screenshot({ path: fileName })
        return fileName
      }
    })
  }

  /** 执行 puppeteer 命令 */
  async execute(opt?: TaskData) {
    return this.cluster?.execute(opt)
  }

  /** 初始化 puppeteer 集群 */
  async initCluster(options?: CratePuppeteerOptions) {
    console.warn('[----> init-cluster')

    // 初始化集群
    this.cluster = await Cluster.launch(merge({
      // 每个URL一个浏览器(使用隐身页面)。如果一个浏览器实例由于任何原因崩溃，这不会影响其他作业。
      concurrency: Cluster.CONCURRENCY_BROWSER,
      // 最大并发数
      maxConcurrency: cpus().length,
      timeout: 3e5,
      // puppeteer-core 实例
      puppeteer,

      puppeteerOptions: {

        // executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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
    }, options))

    // 注册集群任务
    await this.registerTasks()

    return this
  }
}

/** 自定义一个提供者，因为是异常步，所以不能直接使用，需要在此处进行包装 */
export const pdfServiceProvider = {
  provide: PdfService,
  useFactory: async () => {
    const connection = await new PdfService().initCluster()
    return connection
  },
}
