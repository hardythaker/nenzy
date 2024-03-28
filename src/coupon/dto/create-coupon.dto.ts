import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinDate,
  min,
} from 'class-validator';
import { IsAfterNow } from 'src/common/validators/IsAfterNow.validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount!: number;

  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  @IsAfterNow()
  startDate?: string;

  @IsOptional()
  @IsDateString({ strict: true, strictSeparator: true })
  @IsAfterNow()
  expiryDate?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  usageLimit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  usageCount?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
