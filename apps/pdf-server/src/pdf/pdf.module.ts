import { Module } from '@nestjs/common'

import { BullModule } from '@nestjs/bull'

import { pdfServiceProvider } from './pdf.service'
import { PdfController } from './pdf.controller'
import { QUEUE_NAME } from './const'

@Module({
  imports: [
    BullModule.registerQueue({ name: QUEUE_NAME }),
  ],
  controllers: [PdfController],
  providers: [pdfServiceProvider],
})
export class PdfModule {}
