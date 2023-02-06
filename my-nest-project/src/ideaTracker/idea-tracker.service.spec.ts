import { Test, TestingModule } from '@nestjs/testing';
import { IdeaTrackerService } from './idea-tracker.service';

describe('IdeaTrackerService', () => {
  let service: IdeaTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeaTrackerService],
    }).compile();

    service = module.get<IdeaTrackerService>(IdeaTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
