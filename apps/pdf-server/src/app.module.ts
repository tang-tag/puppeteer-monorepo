import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { pdfServiceProvider } from './pdf/pdf.service'
import { PdfController } from './pdf/pdf.controller'
import { getPinoOptions } from './utils/log'

@Module({
  imports: [LoggerModule.forRoot(getPinoOptions())],
  controllers: [AppController, PdfController],
  providers: [AppService, pdfServiceProvider],
})
export class AppModule {}
