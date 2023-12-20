import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from './utils/log'

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  const app = await NestFactory.create(AppModule)

  // 监听端口，启动服务
  const startPort = 3000
  // 此处不能使用 localhost，否则 docker 映射会失效
  await app.listen(startPort, '0.0.0.0')

  const url = await app.getUrl()
  logger.info(`🚀 应用已启动: %s`, url)
}
bootstrap()
