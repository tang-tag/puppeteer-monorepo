import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { pdfServiceProvider } from './pdf/pdf.service'
import { PdfController } from './pdf/pdf.controller'

@Module({
  imports: [],
  controllers: [AppController, PdfController],
  providers: [AppService, pdfServiceProvider],
})
export class AppModule {}
