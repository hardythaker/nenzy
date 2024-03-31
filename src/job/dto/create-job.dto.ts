import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { JobLevel } from '../entities/job.entity';

export class CreateJobDto {
  @IsMongoId()
  companyId!: string;

  @IsMongoId()
  userId!: string;

  @IsMongoId()
  titleId!: string;

  @IsEnum(JobLevel)
  level!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  customQuestions?: string[];

  @IsMongoId()
  departmentId!: string;

  @IsOptional()
  @IsInt()
  @Min(1) //Optional validation for positive limit
  limit?: number;

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
