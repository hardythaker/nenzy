import { Module } from '@nestjs/common';
import { JobTitleService } from './job-title.service';
import { JobTitleController } from './job-title.controller';

@Module({
  controllers: [JobTitleController],
  providers: [JobTitleService],
})
export class JobTitleModule {}
