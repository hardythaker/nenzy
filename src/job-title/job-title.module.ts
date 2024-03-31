import { Module } from '@nestjs/common';
import { JobTitleService } from './job-title.service';
import { JobTitleController } from './job-title.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobTitle, JobTitleSchema } from './entities/job-title.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobTitle.name, schema: JobTitleSchema },
    ]),
  ],
  controllers: [JobTitleController],
  providers: [JobTitleService],
})
export class JobTitleModule {}
