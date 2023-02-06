import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeaTrackerModule } from './ideaTracker/idea-tracker.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost/soa', { useNewUrlParser: true }),
      IdeaTrackerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
