import type { Server } from 'node:https'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify'
import type { FastifyHttpsOptions } from 'fastify'
import config from 'config'

import { AppModule } from './app.module'
import { Logger } from './utils/log'

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  logger.info('Config 配置：%s', JSON.stringify(config, null, '  '))

  // 创建主应用
  const appOptions: Partial<FastifyHttpsOptions<Server>> = {
    logger: false, // new Logger('App').logger,
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(appOptions),
  )

  // 监听端口，启动服务
  const startPort = 3000
  // 此处不能使用 localhost，否则 docker 映射会失效
  await app.listen(startPort, '0.0.0.0')

  const url = await app.getUrl()
  logger.info(`🚀 应用已启动: %s`, url)
}
bootstrap()
