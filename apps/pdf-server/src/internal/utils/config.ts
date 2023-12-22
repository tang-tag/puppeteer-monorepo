import process from 'node:process'
import axios from 'axios'

import { Logger } from './log'

export async function loadConfigFile(url: string) {
  const logger = new Logger('LOAD_CONFIG')

  logger.info('{ConfigUrl}: %s', url)

  try {
    const { data } = await axios.get(url)

    // 写入环境变量，覆盖默认 config
    process.env.NODE_CONFIG = JSON.stringify(data)
    logger.info('ConfigContent: %o', data)
  }
  catch (err: unknown) {
    logger.error('FileLoadError: %s', (err as Error).message)

    return {}
  }
}
