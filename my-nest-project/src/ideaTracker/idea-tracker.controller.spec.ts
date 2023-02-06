import { Test, TestingModule } from '@nestjs/testing';
import { IdeaTrackerController } from './idea-tracker.controller';

describe('IdeaTrackerController', () => {
  let controller: IdeaTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdeaTrackerController],
    }).compile();

    controller = module.get<IdeaTrackerController>(IdeaTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
