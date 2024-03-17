import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export enum COMPANY_SIZE {
  'Less than 10' = 'Less than 10',
  '11 - 50' = '11 - 50',
  '51 - 200' = '51 - 200',
  '201 - 1000' = '201 - 1000',
  '1001 - 5000' = '1001 - 5000',
  'More than 5000' = 'More than 5000',
}

export class CreateCompanyDto {
  id!: string;

  @IsMongoId()
  userId!: Types.ObjectId;

  @IsNotEmpty()
  name!: string;

  @IsEnum(COMPANY_SIZE)
  @ApiProperty({
    enum: COMPANY_SIZE,
  })
  size!: COMPANY_SIZE;

  @IsMongoId()
  departmentIds!: Types.ObjectId[];

  @IsMongoId()
  planId!: Types.ObjectId;

  @IsMongoId()
  memberId!: Types.ObjectId;
}

export enum USER_ROLE {
  owner = 'owner',
  admin = 'admin',
  maintainer = 'maintainer',
}

// @IsIn(Object.values(COMPANY_SIZE), { each: true })
