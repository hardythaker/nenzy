import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { JOB_APPLICATION_STATUS } from '../entities/job-application.entity';
import { IsNotAfterNow } from 'src/common/validators/IsNotAfterNow.validator';

export class CreateJobApplicationDto {
  @IsMongoId()
  user!: string;

  @IsMongoId()
  job!: string;

  @IsEnum(JOB_APPLICATION_STATUS)
  status!: JOB_APPLICATION_STATUS;

  @IsArray()
  chatHistory!: string[];

  @IsNotAfterNow()
  appliedDate!: string;

  @IsBoolean()
  isQualified!: boolean;

  @IsNumber()
  score!: number;

  @IsString()
  @IsNotEmpty()
  feedback!: string;
}
