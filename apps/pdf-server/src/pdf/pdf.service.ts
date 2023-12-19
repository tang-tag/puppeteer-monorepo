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
  type: 'pdf'
  url: string
}

@Injectable()
export class PdfService {
  /** 集群实例 */
  private cluster?: Cluster

  /** 注册 pdf 任务处理 */
  private async pdfTask(page: Page, url: string) {
    const fileName = `${Date.now()}-demo.png`

    console.warn('[----> start-print: ', url)

    await page.goto(url, { waitUntil: ['domcontentloaded', 'load', 'networkidle0'] })
    await page.screenshot({ path: fileName })
    // await page.screenshot({ path: fileName, format: 'A4' })

    console.warn('[----> end-print: ', url, fileName)

    return fileName
  }

  /** 执行 puppeteer 命令 */
  private async execute(opt?: TaskData) {
    return this.cluster?.execute(opt)
  }

  /** 初始化 puppeteer 集群 */
  async initCluster(options?: CratePuppeteerOptions) {
    console.warn('[----> init-cluster')

    this.cluster = await Cluster.launch(merge({
      // 每个URL一个浏览器(使用隐身页面)。如果一个浏览器实例由于任何原因崩溃，这不会影响其他作业。
      concurrency: Cluster.CONCURRENCY_BROWSER,
      // 最大并发数
      maxConcurrency: cpus().length,
      timeout: 3e5,
      // puppeteer-core 实例
      puppeteer,
      puppeteerOptions: {
        executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
        args: [
          '-disable-gpu',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '-no-zygote',
          '-no-first-run',
          // "-single-process",
        ],
        headless: 'new',
        defaultViewport: {
          width: 1200,
          height: 768,
        },
      },
    }, options))

    await this.cluster.task(async ({ page, data }) => {
      const _control = data as TaskData

      if (_control.type === 'pdf')
        return this.pdfTask(page as unknown as Page, _control.url)
    })

    return this
  }

  /** 打印 pdf */
  async printPdf(url: string) {
    return this.execute({ type: 'pdf', url })
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
