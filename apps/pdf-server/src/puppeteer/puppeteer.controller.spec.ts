import { Test, TestingModule } from '@nestjs/testing';
import { PuppeteerController } from './puppeteer.controller';

describe('PuppeteerController', () => {
  let controller: PuppeteerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppeteerController],
    }).compile();

    controller = module.get<PuppeteerController>(PuppeteerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
