import { Controller, Get, Query } from '@nestjs/common'
import { PdfService } from './pdf.service'

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {
  }

  @Get()
  async print(@Query('url') url: string) {
    console.warn('[----> print-url: ', url)

    return this.pdfService.execute({ type: 'pdf', url })
  }
}
