import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export enum USER_TYPE {
  company = 'company',
  candidate = 'candidate',
}

export enum USER_ROLE {
  owner = 'owner',
  admin = 'admin',
  maintainer = 'maintainer',
}

export enum COMPANY_SIZE {
  'Less than 10' = 'Less than 10',
  '11 - 50' = '11 - 50',
  '51 - 200' = '51 - 200',
  '201 - 1000' = '201 - 1000',
  '1001 - 5000' = '1001 - 5000',
  'More than 5000' = 'More than 5000',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password!: string;

  @IsEnum(USER_TYPE)
  userType!: USER_TYPE;

  // **Custom validation decorator**
  @ValidateIf((o) => o.userType === 'company')
  companyName?: string;

  @ValidateIf((o) => o.userType === 'company')
  @IsIn(Object.values(COMPANY_SIZE), { each: true })
  companySize?: COMPANY_SIZE;

  @ValidateIf((o) => o.userType === 'company')
  @IsArray() // Enforce at least one department
  @IsString({ each: true })
  companyDeparments?: string[];

  @ValidateIf((o) => o.userType === 'company')
  @IsArray() // Enforce at least one role
  @IsIn(Object.values(USER_ROLE), { each: true })
  roles?: USER_ROLE[];

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  isEnabled?: boolean = true;

  @IsOptional()
  refreshToken?: string | null;
}

// {
//   "fullName": "Hardik Thaker",
//   "email": "hardik.thaker1994@gmail.com",
//   "password": "Pass@123",
//   "userType": "company",
//   "companyName": "Any",
//   "companySize": "11 - 50",
//   "companyDeparments": ["IT"],
//   "roles": ["owner","admin"]
// }

// {
//   "fullName": "Hardik Thaker",
//   "email": "hardik.thaker1994@gmail.com",
//   "password": "Pass@123",
//   "userType": "candidate",
// }
