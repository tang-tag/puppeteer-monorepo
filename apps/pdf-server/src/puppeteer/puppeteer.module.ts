import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PuppeteerController } from './puppeteer.controller'
import { PuppeteerService } from './puppeteer.service'
import { consumerServiceProvider } from './consumer.service'
import { Job, JobSchema } from '@/schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
    ]),
  ],
  controllers: [PuppeteerController],
  providers: [PuppeteerService, consumerServiceProvider],
})
export class PuppeteerModule {}
