import { Controller, Get, Query } from '@nestjs/common'
import { get } from 'mongoose'
import { PuppeteerService } from './puppeteer.service'

@Controller('puppeteer')
export class PuppeteerController {
  constructor(private readonly pupService: PuppeteerService) { }

  @Get('url2pdf')
  async url2pdf(@Query('url') url: string) {
    return this.pupService.createPdfJob(url)
  }
}
