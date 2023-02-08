import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { IdeaTrackerService } from './idea-tracker.service';
import { IdeaTrackerController } from './idea-tracker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackerSchema } from './schemas/tracker.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
     MongooseModule.forFeature([{ name: 'Idea', schema: TrackerSchema }]),HttpModule
  ],
  providers: [IdeaTrackerService],
  controllers: [IdeaTrackerController]
})
export class IdeaTrackerModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer.apply(AuthenticationMiddleware).forRoutes(
        { method: RequestMethod.POST, path: '/tracker/idea' },
        { method: RequestMethod.PUT, path: '/tracker/edit' },
        { method: RequestMethod.DELETE, path: '/tracker/delete' }
      )
    }
}