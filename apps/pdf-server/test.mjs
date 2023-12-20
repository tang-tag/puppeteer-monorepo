import { Cluster } from 'puppeteer-cluster'
import puppeteer from 'puppeteer-core'

async function init() {
  const cluster = await Cluster.launch({
    // 每个URL一个浏览器(使用隐身页面)。如果一个浏览器实例由于任何原因崩溃，这不会影响其他作业。
    concurrency: Cluster.CONCURRENCY_BROWSER,
    // 最大并发数
    maxConcurrency: 2, // cpus().length,
    // puppeteer-core 实例
    puppeteer,

    puppeteerOptions: {

      // executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
      executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
      args: [
        '-disable-gpu',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '-no-zygote',
        '-no-first-run',
        // '-single-process',
      ],
      headless: 'new',
      defaultViewport: {
        width: 1200,
        height: 768,
      },
    },
  })

  await cluster.task(async ({ page, data: url }) => {
    const fileName = `${Date.now()}-demo.png`

    console.warn('[----> start-print: ', url)

    await page.goto(url, { waitUntil: ['domcontentloaded', 'load'] })
    await page.screenshot({ path: fileName })
    // await page.screenshot({ path: fileName, format: 'A4' })

    console.warn('[----> end-print: ', url, fileName)

    return fileName
  })

  await cluster.execute('http://ws.test.sxw.cn')
}

async function init2() {
  const browser = await puppeteer.launch({
    // executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
    executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
    args: [
      '-disable-gpu',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '-no-zygote',
      '-no-first-run',
      // '-single-process',
    ],
    headless: 'new',
    defaultViewport: {
      width: 1200,
      height: 768,
    },
  })
  const page = await browser.newPage()
  await page.goto('http://ws.test.sxw.cn/school/login', { timeout: 3e5, waitUntil: ['domcontentloaded', 'load', 'networkidle0'] })
  await page.screenshot({ path: 'example.png' })

  await browser.close()
}

init()
// init2()
