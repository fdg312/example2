import { Test, TestingModule } from '@nestjs/testing';
import { AddController } from './add.controller';
import { AddService } from './add.service';

describe('AddController', () => {
  let controller: AddController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddController],
      providers: [AddService],
    }).compile();

    controller = module.get<AddController>(AddController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
