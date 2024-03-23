import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { IsBoolean } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsBoolean()
  isPublic?: boolean;
}
