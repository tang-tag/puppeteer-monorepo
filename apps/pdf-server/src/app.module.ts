import { LoggerModule } from 'nestjs-pino'
import { Module, UseInterceptors } from '@nestjs/common'

import { MongooseModule } from '@nestjs/mongoose'
import config from 'config'

import { AppController } from './app.controller'
import { getPinoOptions } from './utils/log'

import { PdfModule } from './pdf/pdf.module'
import { PuppeteerModule } from './puppeteer/puppeteer.module'
import { CommonInterceptor } from './interceptor/common.interceptor'

@Module({
  imports: [
    // 注册日志模块
    LoggerModule.forRoot(getPinoOptions()),

    // 注册 redis 模块，类 mongoose.connect() 配置对象
    MongooseModule.forRoot(config.get('mongo')),

    // 注册 pdf 模块
    PdfModule,

    // 注册 puppeteer 模块
    PuppeteerModule,
  ],
  controllers: [AppController],
})
// 全局拦截器，所有接口都会走这个拦截器，并且可以在这个拦
@UseInterceptors(CommonInterceptor)
export class AppModule {}
