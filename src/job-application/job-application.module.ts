import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JobApplication,
  JobApplicationSchema,
} from './entities/job-application.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobApplication.name,
        schema: JobApplicationSchema,
      },
    ]),
  ],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
