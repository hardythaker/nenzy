import { SchemaFactory } from '@nestjs/mongoose';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsAfterNow } from 'src/common/validators/IsAfterNow.validator';

export class CreateSubscriptionDto {
  @IsMongoId()
  planId!: string;

  @IsMongoId()
  companyId!: string;

  //   @IsDateString({ strict: true, strictSeparator: true })
  //   startDate!: Date;

  @IsDateString({ strict: true, strictSeparator: true })
  @IsAfterNow()
  endDate!: Date;

  @IsOptional()
  @IsMongoId()
  appliedCouponId?: string;

  @IsString()
  @IsNotEmpty()
  paymentId!: string;

  @IsString()
  @IsNotEmpty()
  paymentStatus!: string;
}
