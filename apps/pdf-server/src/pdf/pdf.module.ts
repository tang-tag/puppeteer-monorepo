import { Module } from '@nestjs/common'

import { pdfServiceProvider } from './pdf.service'
import { PdfController } from './pdf.controller'
import { QUEUE_NAME } from './const'

@Module({
  imports: [],
  controllers: [PdfController],
  providers: [pdfServiceProvider],
})
export class PdfModule {}
