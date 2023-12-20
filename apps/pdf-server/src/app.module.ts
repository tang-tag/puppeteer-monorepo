import { LoggerModule } from 'nestjs-pino'
import { Module } from '@nestjs/common'

import { BullModule } from '@nestjs/bull'
import config from 'config'

import { AppController } from './app.controller'
import { getPinoOptions } from './utils/log'

import { PdfModule } from './pdf/pdf.module'

@Module({
  imports: [
    // 注册日志模块
    LoggerModule.forRoot(getPinoOptions()),

    // 注册 redis 模块
    BullModule.forRoot({
      redis: config.get('redis'),
    }),

    // 注册 pdf 模块
    PdfModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
