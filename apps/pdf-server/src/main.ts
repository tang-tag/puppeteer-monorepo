import process from 'node:process'

import { loadConfigFile } from '@/utils/config'

async function bootstrap() {
  // 加载配置文件
  if (process.env.APP_CONFIG_CENTER_URL)
    await loadConfigFile(process.env.APP_CONFIG_CENTER_URL)

  // 打开程序
  await import('./bootstrap')
}
bootstrap()
