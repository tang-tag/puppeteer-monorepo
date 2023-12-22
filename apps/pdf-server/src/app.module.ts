import { LoggerModule } from 'nestjs-pino'
import { Module, UseInterceptors } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_INTERCEPTOR } from '@nestjs/core'
import config from 'config'

import { AppController } from './app.controller'

import { PuppeteerModule } from './puppeteer/puppeteer.module'
import { CommonInterceptor } from './interceptor/common.interceptor'
import { getPinoOptions } from '@/internal/utils'

@Module({
  imports: [
    // 注册日志模块
    LoggerModule.forRoot(getPinoOptions()),

    // 注册 redis 模块，类 mongoose.connect() 配置对象
    MongooseModule.forRoot(config.get('mongo')),

    // 注册 puppeteer 模块
    PuppeteerModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: CommonInterceptor },
  ],
})
// 全局拦截器，所有接口都会走这个拦截器，并且可以在这个拦
@UseInterceptors(CommonInterceptor)
export class AppModule {}
